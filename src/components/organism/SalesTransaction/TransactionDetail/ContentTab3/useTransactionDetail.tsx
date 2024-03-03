import {Menu, Popover, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTag from 'components/atoms/AppTag';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {onSearchInventoryTraders} from 'redux/actions/SalesTransactions';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useTransactionDetail = (
  transactionRecord: any,
  keyValue: string,
  setIsLoading: any,
  isLoading: boolean,
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
    status: string;
    fromDate: string;
    toDate: string;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    searchText: '',
    status: '',
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    if (keyValue === '3') {
      const fetchInventoryTraders = async () => {
        const salesProgramDetailCode = transactionRecord?.code;
        if (!salesProgramDetailCode) return;
        setIsLoading(true);
        const isSearchAll = ObjectHelper.isEmpty(searchParams, [
          'page',
          'pageSize',
        ]);
        setIsSearchAll(isSearchAll);
        const res: any = await dispatch(
          onSearchInventoryTraders(searchParams, salesProgramDetailCode),
        );
        const total = res?.total;
        setTotal(total);
        const dataSource: Array<any> = [];
        const elements: Array<any> = res?.elements ?? [];
        elements.forEach((item: any, index: number) => {
          dataSource.push({
            ...item,
            index: index,
            participant: item?.participant,
            files: item?.files,
            status: item?.status,
            key: item?.code ? item?.code : index,
          });
        });
        setDataSource(dataSource);
        setIsLoading(false);
      };
      fetchInventoryTraders();
    }
  }, [transactionRecord, searchParams, keyValue]);

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
      title: 'Tên',
      width: 120,
      dataIndex: 'participantName',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.participant?.name}>
            <div className='ellipsis-text'>{record?.participant?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'participantPhone',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.participant?.phone}>
            <div className='ellipsis-text'>{record?.participant?.phone}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Thời gian tham gia',
      dataIndex: 'joinTime',
      key: '5',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.participant?.joinTime}>
            <div className='ellipsis-text'>{record?.participant?.joinTime}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Files',
      dataIndex: 'files',
      key: '6',
      width: 120,
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '7',
      width: 100,
      render: (text, record) => {
        return (
          <AppTag
            title={record?.status?.name}
            color={`#${record?.status?.color}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => {
        let content = (
          <div style={{display: 'flex'}}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              <Menu.Item key={1}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.72916 12.747C2.02088 11.8269 1.66675 11.3668 1.66675 10.0007C1.66675 8.6345 2.02088 8.17442 2.72916 7.25426C4.14339 5.41695 6.51518 3.33398 10.0001 3.33398C13.485 3.33398 15.8568 5.41695 17.271 7.25426C17.9793 8.17442 18.3334 8.6345 18.3334 10.0007C18.3334 11.3668 17.9793 11.8269 17.271 12.747C15.8568 14.5844 13.485 16.6673 10.0001 16.6673C6.51518 16.6673 4.14339 14.5844 2.72916 12.747Z'
                    stroke='#181414'
                  />
                  <path
                    d='M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10Z'
                    stroke='#181414'
                  />
                </svg>
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item key={2}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.5 12.5C2.5 14.857 2.5 16.0355 3.23223 16.7678C3.96447 17.5 5.14298 17.5 7.5 17.5H12.5C14.857 17.5 16.0355 17.5 16.7678 16.7678C17.5 16.0355 17.5 14.857 17.5 12.5'
                    stroke='#181414'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M9.99984 13.3333V2.5M9.99984 2.5L13.3332 6.14583M9.99984 2.5L6.6665 6.14583'
                    stroke='#181414'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
                <IntlMessages id='common.viewFile' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='topLeft'>
            <AiOutlineEllipsis
              style={{cursor: 'pointer', fontSize: '22px', display: 'flex'}}
            />
          </Popover>
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

export default useTransactionDetail;
