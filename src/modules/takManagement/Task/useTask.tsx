import IntlMessages from '@crema/utility/IntlMessages';
import { Form, Menu, Popover, Tooltip } from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppProgressPercent from 'components/atoms/AppProgressPercent';
import AppTag from 'components/atoms/AppTag';
import AssignStaffInCharge from 'components/organism/Work/AssignEmployee';
import { useEffect, useState } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { onAssginEmployee, onDeleteTask, onGetTasks } from 'redux/actions/Task';
import { pageSize } from 'shared/constants/AppConst';
import { ActionType, WorkAction } from 'shared/constants/AppVariables';
import { addLeadingZeros } from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useTask = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  // App Modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [modalInfo, setModalInfo] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    onClosable: () => {
      setIsOpenModal(false);
      form.resetFields();
    },
    disabled: true,
  });

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [projectCode, setProjectCode] = useState<string | null>(null);
  const [isDashboard, setIsDashboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    assignees: string;
    priorities: string;
    jobTypes: string;
    fromDate: string;
    toDate: string;
    projectCode: string | null;
  }>({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    assignees: '',
    priorities: '',
    jobTypes: '',
    fromDate: '',
    toDate: '',
    projectCode: '',
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
      width: 60,
    },
    {
      index: '1',
      title: <IntlMessages id='common.code' />,
      width: 80,
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
      width: 140,
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
      title: <IntlMessages id='common.project' />,
      width: 140,
      dataIndex: 'project',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.project?.name}>
            <div className='ellipsis-text'>{record?.project?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '4',
      width: 120,
      render: (text, record) => {
        return (
          <AppTag
            title={`${record?.workflowStatus?.name ?? 'Trống'}`}
            color={`#${record?.workflowStatus?.color ?? '#000000'}`}
          />
        );
      },
    },
    {
      index: '5',
      title: <IntlMessages id='common.progress' />,
      dataIndex: 'progress',
      ellipsis: {
        showTitle: false,
      },
      width: 80,
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={`${record?.progress ?? 0}%`}>
            <div className='ellipsis-text'>
              {
                <AppProgressPercent
                  percent={record?.progress ?? 0}
                  color='#87d068'
                />
              }
            </div>
          </Tooltip>
        );
      },
    },
    {
      index: '6',
      title: <IntlMessages id='common.assignees' />,
      dataIndex: 'assignees',
      ellipsis: {
        showTitle: false,
      },
      width: 120,
      render: (_: any, record: any) => {
        const assignees = record?.assignees
          ?.map((item: any) => item.name)
          .join(', ');
        return (
          <Tooltip title={assignees}>
            <div className='ellipsis-text'>{assignees}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '7',
      title: <IntlMessages id='common.priority' />,
      dataIndex: 'priority',
      ellipsis: {
        showTitle: false,
      },
      width: 100,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.priority?.name}>
            <div className='ellipsis-text'>{record?.priority?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '8',
      title: <IntlMessages id='common.jobType' />,
      dataIndex: 'jobType',
      ellipsis: {
        showTitle: false,
      },
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.jobType?.name ?? ''}>
            <div className='ellipsis-text'>{record?.jobType?.name ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '9',
      title: <IntlMessages id='common.time' />,
      dataIndex: 'time',
      ellipsis: {
        showTitle: false,
      },
      width: 120,
      render: (_: any, record: any) => {
        const startDate = record?.startDate;
        const endDate = record?.endDate;
        const time =
          startDate && endDate
            ? `Từ ${record?.startDate} đến ${record?.endDate}`
            : '';
        return (
          <Tooltip title={time}>
            <div className='ellipsis-text'>
              {/* {`${record?.startDate ?? ''}`} <br></br>
              {` ${record?.endDate ?? ''}`} */}
              {time}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => {
        let content = (
          <div style={{ display: 'flex' }}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              <Menu.Item key={WorkAction.VIEW_DETAIL}>
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item key={WorkAction.EDIT}>
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={WorkAction.ASSIGN}>
                <AppControlAction variant='edit' />
                <IntlMessages id='common.assignPersonToBeAction' />
              </Menu.Item>
              <Menu.Item key={WorkAction.ADD_SUBTASKS}>
                <AppControlAction variant='import' />
                <IntlMessages id='common.addSubTasks' />
              </Menu.Item>
              <Menu.Item key={WorkAction.DELETE}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='bottom'>
            <AiOutlineEllipsis
              style={{ cursor: 'pointer', fontSize: '22px', display: 'flex' }}
            />
          </Popover>
        );
      },
    },
  ];
  const [columns, setColumns] = useState<any>(initialColumns);

  useEffect(() => {
    const fetchPickLists = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetTasks(searchParams));
      const dataSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements?.forEach((item: any, index: number) => {
        dataSource?.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setTotal(res?.total ?? 0);
      setDataSource(dataSource);
      setCurrent(res?.currentPage ?? 1);
      setColumns(initialColumns);
      setLoading(false);
    };
    fetchPickLists();
  }, [searchParams]);

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case WorkAction.VIEW_DETAIL: {
        const info: any = {
          draftString: '',
          type: ActionType.VIEW,
          action: () => {
            setIsOpen(false);
            handleChangeSearchParams({ ...searchParams });
          },
          record: record,
        };
        setInfo(info);
        setIsOpen(true);
        break;
      }
      case WorkAction.EDIT: {
        // const modalInfo = {
        //   title: 'Chỉnh sửa thông tin nhân sự',
        //   description: <UpdateTask form={form} />,
        //   submitText: messages['common.agree'],
        //   closeText: messages['common.cancel'],
        //   handleClose: () => {
        //     form.resetFields();
        //     setIsOpenModal(false);
        //   },
        //   onCloseble: () => {
        //     form.resetFields();
        //     setIsOpenModal(false);
        //   },
        //   handleSubmit: async () => {
        //     setIsOpenModal(false);
        //     handleChangeSearchParams({...searchParams});
        //   },
        //   width: '1200px',
        // };
        // setModalInfo(modalInfo);
        // setIsOpenModal(true);
        const info: any = {
          draftString: '',
          type: ActionType.EDIT,
          action: () => {
            setIsOpen(false);
            handleChangeSearchParams({ ...searchParams });
          },
          record: record,
        };
        setInfo(info);
        setIsOpen(true);
        break;
      }
      case WorkAction.ADD_SUBTASKS: {
        // Add sub task
        console.log(record);
        const info: any = {
          draftString: '',
          type: ActionType.ADD,
          action: () => {
            setIsOpen(false);
            handleChangeSearchParams({ ...searchParams });
          },
          record: null,
          lanesInfo: {
            projectCode: record?.project?.code,
            workflowStatus: record?.workflowStatus?.code,
            parentTask: record?.code,
          },
        };
        setInfo(info);
        setIsOpen(true);
        break;
      }
      case WorkAction.ASSIGN: {
        // Assign person to be in charge
        const modalInfo = {
          title: 'Thông báo',
          description: (
            <AssignStaffInCharge
              form={form}
              record={record}
              setModalInfo={setModalInfo}
            />
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          onClosable: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            const { employees } = form.getFieldsValue();
            const assignees = employees?.map((code: any) => {
              return {
                code: code,
              };
            });
            const reqParams = {
              code: record.code,
              assignees: assignees,
            };
            await dispatch(onAssginEmployee(reqParams));
            form.resetFields();
            setIsOpenModal(false);
            handleChangeSearchParams({ ...searchParams });
          },
        };
        setModalInfo(modalInfo);
        setIsOpenModal(true);
        break;
      }
      case WorkAction.DELETE: {
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
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            await dispatch(onDeleteTask(record?.code));
            setIsOpenModal(false);
            handleChangeSearchParams({ ...searchParams });
          },
          disabled: false,
        };
        setModalInfo(modalInfo);
        setIsOpenModal(true);
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
        handleChangeSearchParams({ ...searchParams });
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

  const handleChangeView = () => {
    setIsDashboard((pre) => !pre);
  };

  const [projectSearchParams, setProjectSearchParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const handleChangeProject = (e: any) => {
    const projectCode = e;
    setProjectCode(projectCode);
    if (projectCode) {
      setSearchParams({
        ...searchParams,
        projectCode: projectCode,
      });
    } else {
      setIsDashboard(false);
      setSearchParams({
        ...searchParams,
        projectCode: null,
      });
    }
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

    isOpenModal,
    setIsOpenModal,
    modalInfo,

    isDashboard,
    handleChangeView,

    projectCode,
    projectSearchParams,
    setProjectSearchParams,
    handleChangeProject,
  };
};

export default useTask;
