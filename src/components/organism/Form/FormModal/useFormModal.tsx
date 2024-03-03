import {Form, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onCreateForm, onGetFormDetail, onUpdateForm} from 'redux/actions/Form';
import {onGetAllPropertyList} from 'redux/actions/Property';
import {ActionType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useFormModal = (
  info: any,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [modalData, setModalData] = useState<{
    title: string;
    submitText: string;
    closeText: string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });
  const [disabled, setDisabled] = useState(false);

  const [isOpenChoosePropertyModal, setIsOpenChoosePropertyModal] =
    useState(false);

  const handleChoosePropertyModal = () => {
    setIsOpenChoosePropertyModal(true);
  };

  const [systemPropertiesSearchParams, setSystemPropertiesSearchParams] =
    useState({
      searchText: '',
      dataTypeCode: null,
      isSystem: true,
      isInvisible: true,
    });
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [systemPropertySelectRows, setSystemPropertySelectRows] = useState<
    Array<any>
  >([]);

  const [propertySelectedRows, setPropertySelectedRows] = useState<Array<any>>(
    [],
  );

  const handleSetModalData = () => {
    const {type, record} = info;

    const modalData = {
      [ActionType.ADD]: {
        title: messages['common.addForm'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable title={'common.editForm'} recordTitle={record?.code} />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailForm'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
      },
    };
    setModalData(modalData[type]);
    if (type == ActionType.ADD) {
      setDisabled(true);
    }
  };

  useEffect(() => {
    handleSetModalData();
  }, [info]);
  useEffect(() => {
    const fetchSystemProperties = async () => {
      if (!isOpen) {
        return;
      }
      setLoading(true);
      const {record, type} = info;
      let dataSource: Array<any> = [];
      if (type === ActionType.ADD) {
        const res: any = await dispatch(
          onGetAllPropertyList(systemPropertiesSearchParams),
        );
        dataSource.push(...res);
      }
      const formCode = record?.code;
      const res: any = await dispatch(onGetFormDetail(formCode, true));
      if (res) {
        const {configProperties = [], name, description} = res;
        dataSource?.push(...configProperties);
        form.setFieldsValue({
          name,
          description,
        });
      }
      dataSource = dataSource.map((item: any, index: number) => ({
        ...item,
        id: item?.code,
        key: item?.code ? item?.code : index,
        code: item?.code,
        index: index,
      }));
      const systemProperty = dataSource.filter(
        (item: any) => item?.isInvisible,
      );
      const selectedProperty = dataSource.filter(
        (item: any) => !item?.isInvisible,
      );
      setDataSource(dataSource);
      setPropertySelectedRows(selectedProperty);
      setSystemPropertySelectRows(systemProperty);
      setLoading(false);
    };
    fetchSystemProperties();
  }, [isOpen, systemPropertiesSearchParams]);

  const handleSelectChange = async (
    selectedRowKeys: React.Key[],
    selectedRows: Array<any>,
  ) => {
    setPropertySelectedRows(selectedRows);
  };
  const handleSubmitChoosePropertyModal = async (): Promise<void> => {
    const dataSource: Array<any> = [];
    const data = [...systemPropertySelectRows, ...propertySelectedRows];
    data.map((item: any, index: number) => {
      dataSource.push({
        ...item,
        id: item?.code,
        index: index,
        key: item?.code ? item?.code : index,
      });
    });
    setDataSource(dataSource);
    setIsOpenChoosePropertyModal(false);
  };

  const handleCloseChoosePropertyModal = async (): Promise<void> => {
    // handleRemoveState();
    setIsOpenChoosePropertyModal(false);
  };

  const handleSubmit = async (): Promise<void> => {
    const {action, type, record} = info;
    const code = record?.code;
    const {name, description} = form.getFieldsValue();
    const configProperties: any = [];
    propertySelectedRows
      ?.filter((item: any) => item?.isInvisible === false)
      ?.map((item: any) => {
        configProperties.push({
          code: item.code,
        });
      });
    const payload = {
      code,
      name,
      description,
      configProperties,
    };
    switch (type) {
      case ActionType.ADD: {
        const res: any = await dispatch(onCreateForm(payload));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.EDIT: {
        const res: any = await dispatch(onUpdateForm(payload));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.VIEW: {
        action();
        handleRemoveState();
        break;
      }
    }
  };
  const handleClose = (): void => {
    setIsOpen(false);
    handleRemoveState();
  };
  const handleRemoveState = (): void => {
    form.resetFields();
    setDataSource([]);
    setPropertySelectedRows([]);
  };

  const handleCheckFormData = () => {
    const optionalFields = ['description'];
    const isValid = checkValidateForm(form, optionalFields);
    if (!isValid) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text, record) => {
        return <div>{record.index + 1}</div>;
      },
      width: 50,
    },
    {
      index: '1',
      title: <IntlMessages id='common.propertyCode' />,
      width: 120,
      dataIndex: 'code',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.code}>
            <div className='ellipsis-text'>{record?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '2',
      title: <IntlMessages id='common.propertyName' />,
      width: 120,
      dataIndex: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.name}>
            <div className='ellipsis-text'>{record?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '3',
      title: <IntlMessages id='common.propertyType' />,
      dataIndex: 'type',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.configDataType?.name ?? 'Không có thông tin'}>
            <div className='ellipsis-text'>
              {record?.configDataType?.name ?? 'Không có thông tin'}
            </div>
          </Tooltip>
        );
      },
    },
  ];
  return {
    form,
    modalData,
    disabled,
    isOpenChoosePropertyModal,
    setIsOpenChoosePropertyModal,
    handleChoosePropertyModal,

    loading,
    columns,
    dataSource,
    handleSelectChange,
    propertySelectedRows,
    handleSubmitChoosePropertyModal,
    handleCloseChoosePropertyModal,

    handleSubmit,
    handleClose,
    handleRemoveState,
    handleCheckFormData,
  };
};

export default useFormModal;
