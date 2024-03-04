import IntlMessages from '@crema/utility/IntlMessages';
import {Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onDeleteWorkflow, onSearchWorkflow} from 'redux/actions/Workflow';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useProperty = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appModalData, setAppModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
  });
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
  });
  const [info, setInfo] = useState<{
    draftString: string;
    type: string;
    action: () => void;
    record: any;
  }>({
    draftString: '',
    type: '',
    action: () => {},
    record: null,
  });
  const [workFlowModalOpen, setWorkFlowModalOpen] = useState(false);

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
      render: (text, record) => {
        let index =
          (searchParams?.page - 1) * pageSize.DEFAULT + record.index + 1;
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
      index: '1',
      title: 'Mã',
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
      title: 'Tên',
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
      title: 'Mô tả',
      dataIndex: 'description',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.description}>
            <div className='ellipsis-text'>{record?.description}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '4',
      title: messages['common.status'] as string,
      dataIndex: 'configDataType',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <AppTag
            title={record?.usedStatus?.name ?? 'Trống'}
            color={`#${record?.usedStatus?.color ?? 'bdbdbd'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: '5',
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
              <Menu.Item key={2} disabled={record?.usedStatus?.code === '2'}>
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

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View detail work flow
        const info = {
          draftString: DraftStrings.property,
          type: ActionType.VIEW,
          action: () => {
            setWorkFlowModalOpen(false);
          },
          record: record,
        };
        setInfo(info);
        setWorkFlowModalOpen(true);
        break;
      }
      case '2': {
        // Edit work flow
        const info = {
          draftString: DraftStrings.property,
          type: ActionType.EDIT,
          action: () => {
            setWorkFlowModalOpen(false);
            handleChangeSearchParams({
              ...searchParams,
            });
          },
          record: record,
        };
        setInfo(info);
        setWorkFlowModalOpen(true);
        break;
      }
      case '3': {
        // Delete work flow
        const appModalData = {
          title: 'Thông báo',
          description: (
            <p>
              Bạn có chắc chắn muốn xóa QT công việc{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setAppModalOpen(false);
          },
          handleSubmit: async () => {
            const workflowCode = record?.code;
            await dispatch(onDeleteWorkflow(workflowCode));
            setAppModalOpen(false);
            handleChangeSearchParams({...searchParams});
          },
        };
        setAppModalData(appModalData);
        setAppModalOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const handleOpenPropertyModal = () => {
    const info = {
      draftString: DraftStrings.property,
      type: ActionType.ADD,
      action: () => {
        setWorkFlowModalOpen(false);
        handleChangeSearchParams({...searchParams});
      },
      record: null,
    };
    setInfo(info);
    setWorkFlowModalOpen(true);
  };

  useEffect(() => {
    const fetchWorkflows = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onSearchWorkflow(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        dateSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setColumns(initialColumns);
      setDataSource(dateSource);
      setCurrent(res?.currentPage ?? 1);
      setTotal(res?.total ?? 0);
      setLoading(false);
    };
    fetchWorkflows();
  }, [searchParams]);

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };
  return {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    workFlowModalOpen,
    setWorkFlowModalOpen,
    info,
    handleOpenPropertyModal,
    handleChangeSearchParams,

    appModalOpen,
    setAppModalOpen,
    appModalData,
  };
};

export default useProperty;
