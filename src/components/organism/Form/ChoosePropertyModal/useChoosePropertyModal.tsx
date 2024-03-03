import {Form, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onGetAllPropertyList, onGetPropertyList} from 'redux/actions/Property';
import {pageSize} from 'shared/constants/AppConst';

const useChoosePropertyModal = (
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [appModalData, setAppModalData] = useState<{
    title: string;
    submitText: string;
    closeText: string;
  }>({
    title: messages['common.addPropertyForForm'] as string,
    submitText: messages['common.add'] as string,
    closeText: messages['common.cancel'] as string,
  });
  const [loading, setLoading] = useState(false);
  const [propertySearchParams, setPropertySearchParams] = useState({
    searchText: '',
    isInvisible: false,
  });

  useEffect(() => {
    const fetchProperties = async () => {
      if (!isOpen) {
        return;
      }
      setLoading(true);
      const elements: any = await dispatch(
        onGetAllPropertyList(propertySearchParams),
      );
      // const elements: Array<any> = res?.elements || [];
      const dataSource: Array<any> = [];
      elements.map((item: any, index: number) => {
        dataSource.push({
          ...item,
          id: item?.code,
          key: item?.code ? item?.code : index,
          code: item?.code,
          index: index,
        });
      });
      setTotal(elements.length || 0);
      setDataSource(dataSource);
      setLoading(false);
    };
    fetchProperties();
  }, [isOpen, propertySearchParams]);

  const handleChangeSearchParams = (params: any) => {
    setPropertySearchParams({
      ...propertySearchParams,
      ...params,
    });
  };
  const handleRemoveState = (): void => {
    form.resetFields();
    setDataSource([]);
    setTotal(0);
  };

  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const columns = [
    {
      index: '1',
      title: messages['common.code'] as string,
      width: 120,
      dataIndex: 'code',
    },
    {
      index: '2',
      title: messages['common.name'] as string,
      width: 120,
      dataIndex: 'name',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      index: '3',
      title: messages['common.dataType'] as string,
      width: 120,
      dataIndex: 'dataType',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.configDataType?.name ?? ''}>
            <div className='ellipsis-text'>
              {record?.configDataType?.name ?? ''}
            </div>
          </Tooltip>
        );
      },
    },
  ];

  return {
    form,
    appModalData,
    handleRemoveState,
    handleChangeSearchParams,

    loading,
    total,
    columns,
    dataSource,
  };
};

export default useChoosePropertyModal;
