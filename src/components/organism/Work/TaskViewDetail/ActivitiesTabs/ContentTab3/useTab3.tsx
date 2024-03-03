import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import {onGetTaskLogs} from 'redux/actions/Task';

const useTab3 = (
  activeValue: string,
  setIsLoading: any,
  isLoading: boolean,
  record: any,
) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const [modalData, setModalData] = useState<{
    title: JSX.Element | string;
    description: JSX.Element | string;
    submitText?: React.ReactNode | string;
    closeText?: string;
    handleClose?: () => void;
    handleSubmit: () => void;
    width?: number;
  }>({
    title: '',
    description: <></>,
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    width: 768,
  });
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    taskCode: string;
    types: any;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    searchText: '',
    taskCode: '',
    types: '',
  });

  useEffect(() => {
    if (activeValue === '3') {
      const fetchTaskLogs = async () => {
        const code = record?.code;
        if (!code) return;
        setIsLoading(true);
        const isSearchAll = ObjectHelper.isEmpty(searchParams, [
          'page',
          'pageSize',
        ]);
        setIsSearchAll(isSearchAll);
        const newSearchParams = {
          ...searchParams,
          taskCode: code,
        };
        const res: any = await dispatch(onGetTaskLogs(newSearchParams));
        const total = res?.total;
        setTotal(total);
        const dataSource: Array<any> = [];
        const elements: Array<any> = res?.elements ?? [];
        elements.forEach((item: any, index: number) => {
          dataSource.push({
            ...item,
            index: index,
            key: item?.code ? item?.code : index,
          });
        });
        setDataSource(dataSource);
        setIsLoading(false);
      };
      fetchTaskLogs();
    }
  }, [record, searchParams, activeValue]);

  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        // Views sale program
        console.log('Views sale program');
        break;
      }
      case '2': {
        console.log('add file');
        break;
      }
    }
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      width: 40,
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
      width: 80,
      dataIndex: 'createdDate',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdDate}>
            <div className='ellipsis-text'>{record?.createdDate}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'name',
      key: '2',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdBy?.name ?? record?.createdBy?.phone}>
            <div className='ellipsis-text'>
              {record?.createdBy?.name ?? record?.createdBy?.phone}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: '3',
      width: 70,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.type?.name}>
            <div className='ellipsis-text'>{record?.type?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.description}>
            <div className='ellipsis-text'>{record?.description}</div>
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
    isLoading,
    dataSource,
    currentPage,
    setCurrentPage,

    isOpen,
    setIsOpen,
    modalData,

    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
    handleChangeSearchParams,
  };
};

export default useTab3;
