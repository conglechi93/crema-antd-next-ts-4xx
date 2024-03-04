import IntlMessages from '@crema/utility/IntlMessages';
import {Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onDeleteProject,
  onSearchProject,
} from 'redux/actions/ProjectManagement';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useProject = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  // App Modal
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appModalData, setAppModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
  });
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    usedStatus: '',
    workFlow: [],
  });

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text, record) => {
        let index = (current - 1) * pageSize.DEFAULT + record.index + 1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
      width: 50,
    },
    {
      index: '1',
      title: <IntlMessages id='common.code' />,
      width: 60,
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
      title: <IntlMessages id='common.name' />,
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
      title: <IntlMessages id='common.workFlow' />,
      width: 120,
      dataIndex: 'workflow',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.workflow?.name}>
            <div className='ellipsis-text'>{record?.workflow?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '4',
      title: <IntlMessages id='common.numberOfPersonnel' />,
      width: 90,
      dataIndex: 'size',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.size}>
            <div className='ellipsis-text'>{record?.size}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '5',
      title: <IntlMessages id='common.time' />,
      width: 120,
      dataIndex: 'time',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const startDate = record?.startDate;
        const endDate = record?.endDate;
        const time =
          startDate && endDate
            ? `Từ ${record?.startDate} đến ${record?.endDate}`
            : '';
        return (
          <Tooltip title={time}>
            <div className='ellipsis-text'>{time}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '6',
      width: 100,
      render: (text, record) => {
        return (
          <AppTag
            title={`${record?.status?.name ?? 'Trống'}`}
            color={`#${record?.status?.color ?? '#000000'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: '7',
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
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={3} disabled={record?.usedStatus?.code === '2'}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='bottom'>
            <AiOutlineEllipsis
              style={{cursor: 'pointer', fontSize: '22px', display: 'flex'}}
            />
          </Popover>
        );
      },
    },
  ];
  const [columns, setColumns] = useState<any>(initialColumns);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onSearchProject(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements?.forEach((item: any, index: number) => {
        dateSource?.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setTotal(res?.total ?? 0);
      setDataSource(dateSource);
      setCurrent(res?.currentPage ?? 1);
      setColumns(initialColumns);
      setLoading(false);
    };
    fetchProject();
  }, [searchParams]);

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        const info: any = {
          draftString: '',
          type: ActionType.VIEW,
          action: () => {
            setIsOpen(false);
            handleChangeSearchParams({...searchParams});
          },
          record: record,
        };
        setInfo(info);
        setIsOpen(true);
        break;
      }
      case '2': {
        const info: any = {
          draftString: '',
          type: ActionType.EDIT,
          action: () => {
            setIsOpen(false);
            handleChangeSearchParams({...searchParams});
          },
          record: record,
        };
        setInfo(info);
        setIsOpen(true);
        break;
      }
      case '3': {
        // Delete project
        const appModalData = {
          title: 'Xóa dự án',
          description: (
            <p>
              Bạn có chắc chắn muốn xóa dự án{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setAppModalOpen(false);
          },
          handleSubmit: async () => {
            const projectCode = record?.code;
            await dispatch(onDeleteProject(projectCode));
            setAppModalOpen(false);
            handleChangeSearchParams({...searchParams});
          },
        };
        setAppModalData(appModalData);
        setAppModalOpen(true);
        break;
      }
    }
  };
  // PickList Modal
  const [info, setInfo] = useState<{
    draftString: '';
    type: '';
    action: () => void;
    record: any;
  }>({
    draftString: '',
    type: '',
    action: () => {},
    record: {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenFormModal = () => {
    const info: any = {
      draftString: '',
      type: ActionType.ADD,
      action: () => {
        setIsOpen(false);
        handleChangeSearchParams({...searchParams});
      },
      record: null,
    };

    setInfo(info);
    setIsOpen(true);
  };

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };
  return {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    info,
    isOpen,
    setIsOpen,
    handleOpenFormModal,
    handleChangeSearchParams,

    appModalOpen,
    setAppModalOpen,
    appModalData,
  };
};

export default useProject;
