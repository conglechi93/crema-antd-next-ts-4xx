import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import {onGetCustomerLogs} from 'redux/actions/Customer';

const useCustomDetailTab3 = (record: any, activeValue: string) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    employeeCode: string;
    types: string[];
    fromDate: string;
    toDate: string;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    employeeCode: '',
    types: [],
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    if (activeValue === '3') {
      const fetchEmployeeLogs = async () => {
        setLoading(true);
        const isSearchAll = ObjectHelper.isEmpty(searchParams, [
          'page',
          'pageSize',
          'types',
        ]);
        setIsSearchAll(isSearchAll);
        const customerCode = record?.code;
        const newSearchParams = {
          ...searchParams,
          customerCode: customerCode,
        };
        const res: any = await dispatch(onGetCustomerLogs(newSearchParams));

        const dataSource: Array<any> = [];
        const elements: Array<any> = res?.elements || [];
        elements.map((item: any, index: number) => {
          dataSource.push({
            ...item,
            index: index,
            id: item.code,
            key: item?.code ? item?.code : index,
            code: item?.code ? item?.code : index,
          });
        });
        setTotal(res?.total ?? 0);
        setCurrentPage(res?.currentPage ?? 1);
        setDataSource(dataSource);
        setLoading(false);
      };
      fetchEmployeeLogs();
    }
  }, [searchParams, activeValue]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      width: 50,
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.SALES_TRANSACTIONS +
          record.index +
          1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
    },
    {
      title: 'Thời gian',
      width: 120,
      dataIndex: 'joinTime',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdDate}>
            <div className='ellipsis-text'>{record?.createdDate ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.type?.name ?? ''}>
            <div className='ellipsis-text'>{record?.type?.name ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'assignees',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdBy?.name ?? ''}>
            <div className='ellipsis-text'>{record?.createdBy?.name ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.description ?? ''}>
            <div className='ellipsis-text'>{record?.description ?? ''}</div>
          </Tooltip>
        );
      },
    },
  ];

  // Handle Sales Program Modal
  const [isOpenConfirmTransaction, setIsOpenConfirmTransaction] =
    useState(false);

  const handleChangeSearchParams = (values: any) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
  };

  return {
    isSearchAll,
    total,
    columns,
    loading,
    dataSource,
    currentPage,
    setCurrentPage,

    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
    handleChangeSearchParams,
  };
};

export default useCustomDetailTab3;
