import {Form, Popconfirm} from 'antd';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onCreatePickList,
  onGetPickListByCode,
  onUpdatePickList,
} from 'redux/actions/PickList';
import {ActionType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';

const usePickListModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {type, record, action} = info;
  const {messages} = useIntl();
  const inintOptions = [
    {
      id: 0,
      value: '',
    },
    {
      id: 1,
      value: '',
    },
  ];

  const [disabled, setDisabled] = useState<boolean>(false);
  const [appModalConfig, setAppModalConfig] = useState<{
    title: React.ReactNode | string;
    submitText: React.ReactNode | string;
    closeText: React.ReactNode | string;
  }>({
    title: <></>,
    submitText: <></>,
    closeText: <></>,
  });
  const [dataSource, setDataSource] = useState<Array<any>>(inintOptions);

  useEffect(() => {
    const handleSetAppModalConfig = (type: string) => {
      if (!type) return;
      switch (type) {
        case ActionType.VIEW: {
          setAppModalConfig({
            title: (
              <AppTitleLable
                title={'common.listInformation'}
                recordTitle={record?.code}
              />
            ),
            submitText: messages['common.close'] as string,
            closeText: '',
          });
          break;
        }
        case ActionType.ADD: {
          setDataSource([]);
          setAppModalConfig({
            title: messages['common.addPickList'] as string,
            submitText: messages['common.save'] as string,
            closeText: messages['common.cancel'] as string,
          });
          break;
        }
        case ActionType.EDIT: {
          setAppModalConfig({
            title: (
              <AppTitleLable
                title={'common.editPickList'}
                recordTitle={record?.code}
              />
            ),
            submitText: messages['common.save'] as string,
            closeText: messages['common.cancel'] as string,
          });
          break;
        }
      }
    };
    handleSetAppModalConfig(type);
  }, [info]);

  useEffect(() => {
    const fetchPickListDetail = async () => {
      const pickLickCode = record?.code;
      if (!pickLickCode) {
        return;
      }
      const res: any = await dispatch(onGetPickListByCode(pickLickCode));
      if (res) {
        const configPickListOptions: Array<any> =
          res?.configPickListOptions ?? [];
        const {name, description} = res;
        await form.setFieldsValue({
          name,
          description,
        });
        const options: Array<any> = configPickListOptions.map(
          (option: any, index: number) => {
            return {
              ...option,
              id: index + 1,
              index: index + 1,
              value: option.name,
              key: index + 1,
            };
          },
        );
        setDataSource(options);
      }
    };
    fetchPickListDetail();
    if (type == ActionType.ADD) {
      setDisabled(true);
    }
  }, [info]);

  const handleSubmit = async (): Promise<void> => {
    switch (type) {
      case ActionType.ADD: {
        setDataSource(['']);
        const {name, description} = form.getFieldsValue();
        const configPickListOptions: Array<any> = [];
        dataSource?.map((option: any) => {
          configPickListOptions.push({
            name: option?.value,
          });
        });
        const payload = {
          name,
          description,
          configPickListOptions,
        };
        await dispatch(onCreatePickList(payload));
        action();
        handleRemoveState();
        break;
      }
      case ActionType.EDIT: {
        const {code} = record;
        const {name, description} = form.getFieldsValue();
        const configPickListOptions: Array<any> = [];
        dataSource?.map((option: any) => {
          configPickListOptions.push({
            name: option.value,
          });
        });
        const payload = {
          code,
          name,
          description,
          configPickListOptions,
        };
        await dispatch(onUpdatePickList(payload));
        action();
        handleRemoveState();
        break;
      }
      case ActionType.VIEW: {
        handleRemoveState();
        break;
      }
    }
  };
  const handleClose = (): void => {
    handleRemoveState();
  };
  const handleRemoveState = (): void => {
    form.resetFields();
    setDataSource([]);
    setIsOpen(false);
  };

  const handleCheckFormData = () => {
    const optionalFields = ['description'];
    dataSource?.forEach((option: any) => {
      if (!option.value) {
        setDisabled(true);
        return;
      }
    });
    const isValid: boolean = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);
  };

  return {
    form,
    appModalConfig,
    handleSubmit,
    handleClose,
    handleRemoveState,

    disabled,
    setDisabled,
    handleCheckFormData,

    dataSource,
    setDataSource,
  };
};

export default usePickListModal;
