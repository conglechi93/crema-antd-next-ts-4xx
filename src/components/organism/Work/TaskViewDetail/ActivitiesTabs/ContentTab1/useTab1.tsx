import {Menu, Popover, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTag from 'components/atoms/AppTag';
import {dateTimeFormat, pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import AppControlAction from 'components/atoms/AppControlAction';
import {onDeleteTask, onGetTasks} from 'redux/actions/Task';
import {useIntl} from 'react-intl';

const useTab1 = (
  record: any,
  activeValue: string,
  setIsLoading: any,
  isLoading: boolean,
  fetchTaskDetails: (code: string) => Promise<void>,
) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    onClosable: () => {
      setIsOpen(false);
    },
    disabled: true,
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
    time: any;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    searchText: '',
    status: '',
    time: '',
  });

  useEffect(() => {
    if (activeValue === '1') {
      const fetchChildTasks = async () => {
        console.log('fetchTaskDetails searchParams', searchParams);
        const taskCode = record?.code;
        if (!taskCode) return;
        setIsLoading(true);
        const isSearchAll = ObjectHelper.isEmpty(searchParams, [
          'page',
          'pageSize',
        ]);
        setIsSearchAll(isSearchAll);
        const {time} = searchParams;
        const newSearchParams = {
          ...searchParams,
          taskCode: taskCode,
          isSubTaskMode: true,
          fromDate: time ? time[0].format(dateTimeFormat[0]) : undefined,
          toDate: time ? time[1].format(dateTimeFormat[0]) : undefined,
          status: searchParams?.status,
        };
        const res: any = await dispatch(onGetTasks(newSearchParams));
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
      fetchChildTasks();
    }
  }, [record, searchParams, activeValue]);

  const handleAction = async (key: string, record: any) => {
    switch (key) {
      case '1': {
        // Bread cum
        const code = record?.code;
        fetchTaskDetails(code);
        break;
      }
      case '2': {
        // Delete task
        const modalInfo = {
          title: 'Xóa công việc',
          description: (
            <p>
              Bạn có chắc chắn muốn xóa công việc{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            await dispatch(onDeleteTask(record?.code));
            setIsOpen(false);
            handleChangeSearchParams({...searchParams});
          },
          disabled: false,
        };
        setModalInfo(modalInfo);
        setIsOpen(true);
        break;
      }
    }
  };
  const columns = [
    // {
    //   title: 'STT',
    //   dataIndex: 'index',
    //   textAlign: 'center',
    //   width: 50,
    //   render: (text, record) => {
    //     let index =
    //       (searchParams.page - 1) * pageSize.SALES_TRANSACTIONS +
    //       record.index +
    //       1;
    //     return (
    //       <div>
    //         {addLeadingZeros(
    //           index,
    //           index.toString().length + (2 - index.toString().length),
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      title: 'Mã',
      width: 50,
      dataIndex: 'code',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.code}>
            <div className='ellipsis-text'>{record?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.name}>
            <div className='ellipsis-text'>{record?.name}</div>
          </Tooltip>
        );
      },
    },
    // {
    //   title: 'Thời gian',
    //   dataIndex: 'time',
    //   key: '5',
    //   width: 120,
    //   render: (_: any, record: any) => {
    //     return (
    //       <Tooltip title={record?.time}>
    //         <div className='ellipsis-text'>{record?.time}</div>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: 'Người thực hiện',
      dataIndex: 'personCharge',
      key: '6',
      width: 120,
      render: (_: any, record: any) => {
        const assignees = record?.assignees?.map((item: any) => item?.name);
        console.log('assignees', assignees);
        return (
          <Tooltip title={assignees}>
            <div className='ellipsis-text'>{assignees}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: '7',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={`${record?.progress ?? 0}%`}>
            <div className='ellipsis-text'>{`${record?.progress ?? 0}%`}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '8',
      width: 100,
      render: (text, record) => {
        console.log('record', record);
        return (
          <AppTag
            title={record?.workflowStatus?.name}
            color={`#${record?.workflowStatus?.color ?? '#000000'}`}
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
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item key={2}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
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
    dataSource,
    currentPage,
    setCurrentPage,
    handleChangeSearchParams,
    isOpen,
    setIsOpen,
    modalInfo,
  };
};

export default useTab1;
