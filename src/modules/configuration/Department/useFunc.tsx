import {useEffect, useState} from 'react';
import {Menu, Popover, Tooltip} from 'antd';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import {useDispatch} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';
import {addLeadingZeros} from 'utils/FormUtils';
import IntlMessages from '@crema/utility/IntlMessages';
import AppControlAction from 'components/atoms/AppControlAction';
import {
  onDeleteDepartment,
  onGetDepartmentDetail,
  onGetDepartments,
} from 'redux/actions/Departments';
import {useIntl} from 'react-intl';
import ObjectHelper from 'utils/ObjectHelper';

const useFunc = () => {
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [currentRecord, setCurrenRecord] = useState<any>(null);
  const [isRefreshChild, setIsRefreshChild] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize.DEFAULT,
    searchText: '',
  });

  const {messages} = useIntl();

  const [modalData, setModalData] = useState<any>({
    title: '',
    description: <></>,
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 512,
  });

  const [modalInfomation, setModalInfomation] = useState<{
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
  // Department Modal
  const [isOpenDepartmentModal, setIsOpenDepartmentModal] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  const dispatch = useDispatch();
  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.DEFAULT + record.index + 1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
      width: 70,
    },
    {
      title: <IntlMessages id='common.code' />,
      width: 80,
      dataIndex: 'code',
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
      title: <IntlMessages id='common.name' />,
      width: 200,
      dataIndex: 'name',
      key: '2',
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
      title: <IntlMessages id='common.description' />,
      dataIndex: 'description',
      key: '3',
      width: 200,
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
      title: <IntlMessages id='common.managementPersonnel' />,
      dataIndex: 'managementPersonnel',
      key: '4',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const {managerWorkSpace} = record;
        const title = managerWorkSpace?.employee?.name ?? '';
        return (
          <Tooltip title={title}>
            <div className='ellipsis-text'>{title}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.numberOfPersonnel' />,
      dataIndex: 'numberOfPersonnel',
      key: '5',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={`${record?.size ?? 0}`}>
            <div className='ellipsis-text'>{`${record?.size ?? 0}`}</div>
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
              <Menu.Item key={3} disabled={record.isSystem}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
              </Menu.Item>
              <Menu.Item key={4}>
                <AppControlAction variant='add' />
                <IntlMessages id='common.addPersonnel' />
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
  const [columns, setColumns] = useState<any>(initialColumns);

  useEffect(() => {
    setLoading(true);
    const fetchDepartments = async () => {
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetDepartments(searchParams));
      let elements = res?.elements ?? [];
      let dataSource: any = [];
      elements?.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });

      setColumns(initialColumns);
      setCurrentPage(res?.currentPage ?? 1);
      setDataSource(dataSource);
      setTotal(res?.total ?? 0);
      setLoading(false);
    };
    fetchDepartments();
  }, [searchParams, isRefresh]);

  const addDepartment = async () => {
    const info = {
      draftString: DraftStrings.department,
      type: ActionType.ADD,
      action: () => {
        setIsOpenDepartmentModal(false);
        setIsRefresh((pre) => !pre);
      },
      record: null,
    };
    setModalInfomation(info);
    setIsOpenDepartmentModal(true);
  };

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View department detail
        const info = {
          draftString: DraftStrings.department,
          type: ActionType.VIEW,
          action: () => {
            setIsOpenDepartmentModal(false);
          },
          record: record,
        };
        setModalInfomation(info);
        setIsOpenDepartmentModal(true);
        break;
      }
      case '2': {
        // Edit department detail
        const code = record?.code;
        const res: any = await dispatch(onGetDepartmentDetail(code));
        const info = {
          draftString: DraftStrings.department,
          type: ActionType.EDIT,
          action: () => {
            setIsOpenDepartmentModal(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          record: res,
        };
        setModalInfomation(info);
        setIsOpenDepartmentModal(true);
        break;
      }
      case '3': {
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn xoá{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>
              không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleSubmit: async () => {
            const departmentCode = record?.code;
            await dispatch(onDeleteDepartment(departmentCode));
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          handleClose: () => {
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '4': {
        // Add employee
        const info = {
          draftString: '',
          type: '',
          action: () => {
            handleChangeSearchParams({...searchParams});
            setIsOpenDepartmentModal(false);
          },
          record: record,
        };
        setModalInfomation(info);
        setAddEmployeeOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const handleChangeSearchParams = async (
    values: any,
    resetRecord?: boolean,
  ) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
    if (resetRecord) setCurrenRecord(null);
  };

  const handleClickRow = (record: any) => {
    setCurrenRecord(record);
  };

  return {
    isSearchAll,
    searchParams,
    total,
    columns,
    loading,

    dataSource,
    currentPage,
    setIsRefresh,
    setCurrentPage,
    currentRecord,
    isRefreshChild,
    setIsRefreshChild,

    addDepartment,

    isOpen,
    setIsOpen,
    modalData,

    handleChangeSearchParams,

    modalInfomation,
    isOpenDepartmentModal,
    setIsOpenDepartmentModal,

    addEmployeeOpen,
    setAddEmployeeOpen,

    handleClickRow,
  };
};

export default useFunc;
