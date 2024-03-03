import {Col, Form, Menu, Popover, Row, Tag, Tooltip} from 'antd';
import {AiOutlineEllipsis} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import {useEffect, useState} from 'react';
import AppTag from 'components/atoms/AppTag';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {
  onAdminApproveRequest,
  onApproveRequestSalesProgram,
  onDeleteSalesProgram,
  onSearchSalesPrograms,
} from 'redux/actions/SalesPrograms';
import {addLeadingZeros} from 'utils/FormUtils';
import {
  ActionType,
  DraftStrings,
  SalesProgramStatus,
} from 'shared/constants/AppVariables';
import {saveState} from 'utils/LocalStore';
import AppTypo from 'components/atoms/AppTypo';
import AppControlAction from 'components/atoms/AppControlAction';
import ObjectHelper from 'utils/ObjectHelper';
import RejectSalesProgram from 'components/organism/AdminVars/RejectSalesProgram';
import {useIntl} from 'react-intl';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {ChooseInventoryType} from 'components/organism/SalesProgram/ChooseInventoryModal';

const useSalesProgram = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChooseInventoryModal, setIsOpenChooseInventoryModal] =
    useState(false);

  const [isRefresh, setIsRefresh] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.SALES_PROGRAMS,
    searchText: '',
    fromDate: '',
    toDate: '',
  });
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [isRefreshChild, setIsRefreshChild] = useState(false);
  const [loadingSaleProgramNoti, setLoadingSaleProgramNoti] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [modalSaleProgram, setModalSaleProgram] = useState<{
    closeText: React.ReactNode;
    submitText: React.ReactNode;
    title: React.ReactNode;
  }>({
    closeText: <></>,
    submitText: <></>,
    title: <></>,
  });

  const [addInventoriesToProgramInfo, setAddInventoriesToProgramInfo] =
    useState<{
      action: () => void;
      record: any;
      type: ChooseInventoryType | undefined;
    }>({
      action: () => {},
      record: {},
      type: undefined,
    });

  const [salesProgramInfo, setSalesProgramInfo] = useState<{
    draftString: string;
    type: string;
    action: () => void;
    initialValues?: any;
  }>({
    draftString: '',
    type: '',
    action: () => {
      setIsRefresh((pre) => !pre);
    },
  });

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.SALES_PROGRAMS + record.index + 1;
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
      title: 'Mã',
      width: 70,
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
      title: 'Tên',
      width: 120,
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
      title: 'Thời gian',
      dataIndex: 'time',
      key: '3',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.time}>
            <div className='ellipsis-text'>{record?.time}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'commissionDiscount',
      key: '4',
      width: 50,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.commissionDiscount}>
            <div className='ellipsis-text'>{`${
              record?.commissionDiscount ?? 0
            }%`}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.creator' />,
      dataIndex: 'creator',
      key: '5',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdBy?.name ?? ''}>
            <div className='ellipsis-text'>{record?.createdBy?.name ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.createdDate' />,
      dataIndex: 'createdDate',
      key: '6',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdDate ?? ''}>
            <div className='ellipsis-text'>{record?.createdDate ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '7',
      width: 80,
      render: (text: any, record: any) => {
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
      width: 50,
      render: (_: any, record: any) => {
        // if (record?.actionsEnable?.length === 0) return <> </>;
        const actionsEnable: Array<string> = record?.actionsEnable ?? [];
        let content = (
          <div style={{display: 'flex'}}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              {actionsEnable?.includes(SalesProgramStatus.EDIT) && (
                <Menu.Item key={1}>
                  <AppControlAction variant='edit' />
                  <IntlMessages id='common.edit' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.ADD_INVENTORIES) && (
                <Menu.Item key={2}>
                  <AppControlAction variant='add' />
                  <IntlMessages id='common.addInventory' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.SEND_APPROVAL) && (
                <Menu.Item key={3}>
                  <AppControlAction variant='cancel' />
                  <IntlMessages id='common.approval' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.DELETE) && (
                <Menu.Item key={4}>
                  <AppControlAction variant='delete' />
                  <IntlMessages id='common.delete' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.PENDING) && (
                <Menu.Item key={5}>
                  <AppControlAction variant='pause' />
                  <IntlMessages id='common.pending' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.RE_OPEN) && (
                <Menu.Item key={6}>
                  <AppControlAction variant='open' />
                  <IntlMessages id='common.reopen' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesProgramStatus.CANCEL_SEND_APPROVAL,
              ) && (
                <Menu.Item key={7}>
                  <AppControlAction variant='cancel' />
                  <IntlMessages id='common.cancelApproval' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.ADMIN_INREVIEW) && (
                <Menu.Item key={9}>
                  <AppControlAction variant='approval' />
                  <IntlMessages id='common.inreviewProgram' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesProgramStatus.ADMIN_ACCEPT) && (
                <Menu.Item key={10}>
                  <AppControlAction variant='approval' />
                  <IntlMessages id='common.approveProgram' />
                </Menu.Item>
              )}
              <Menu.Item key={11}>
                <AppControlAction variant='pause' />
                <IntlMessages id='common.reject' />
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
  const [columns, setColumns] = useState<Array<any>>(initialColumns);

  useEffect(() => {
    const fetchSalesPrograms = async () => {
      setIsLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onSearchSalesPrograms(searchParams));
      const dataSource: Array<any> = [];
      const elements: Array<any> = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          time: `${item?.fromDate} - ${item?.toDate}`,
          key: item?.code ? item?.code : index,
        });
      });
      setColumns(initialColumns);
      setTotal(res?.total ?? 0);
      setDataSource(dataSource);
      setCurrentPage(res?.currentPage ?? 1);
      setIsLoading(false);
    };
    fetchSalesPrograms();
  }, [searchParams, isRefresh]);

  const [modalData, setModalData] = useState<{
    title: string;
    description: JSX.Element | string;
    submitText: string;
    closeText: string;
    handleClose: () => void;
    handleSubmit: () => void;
    width?: number;
    onClosable?: () => void;
  }>({
    title: '',
    description: <></>,
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    width: 768,
    onClosable: () => {
      form.resetFields();
    },
  });
  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        // Edit sale program
        const info = {
          draftString: DraftStrings.salesProgram,
          type: ActionType.EDIT,
          action: () => {
            setIsOpenSalesProgramModal(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
        };
        setModalSaleProgram({
          title: (
            <AppTitleLable title={'common.edit'} recordTitle={record?.code} />
          ),
          submitText: messages['common.save'],
          closeText: messages['common.cancel'],
        });
        saveState(DraftStrings.salesProgram, record);
        setSalesProgramInfo(info);
        setIsOpenSalesProgramModal(true);
        break;
      }
      case '2': {
        // Choose inventory
        const info = {
          action: () => {
            setIsOpenChooseInventoryModal(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          record: record,
          type: ChooseInventoryType.CHOOSE_INVENTORY,
        };
        setAddInventoriesToProgramInfo(info);
        setIsOpenChooseInventoryModal(true);
        break;
      }
      case '3': {
        // Approve sale program
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn gửi duyệt chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const payload = {
              action: SalesProgramStatus.SEND_APPROVAL,
              code: record?.code,
            };
            await dispatch(onApproveRequestSalesProgram(payload));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '4': {
        // Delete sale program
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const salesProgramCode = record?.code;
            await dispatch(onDeleteSalesProgram(salesProgramCode));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            if (record.code === currentRecord?.code) {
              setCurrentRecord(null);
            }
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '5': {
        // Pending sale program
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn tạm ngưng chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const payload = {
              action: SalesProgramStatus.PENDING,
              code: record?.code,
            };
            await dispatch(onApproveRequestSalesProgram(payload));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '6': {
        // Open sale program
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn mở lại chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const payload = {
              action: SalesProgramStatus.RE_OPEN,
              code: record?.code,
            };
            await dispatch(onApproveRequestSalesProgram(payload));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '7': {
        // Cancel approve sale program
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn hủy gửi duyệt chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const payload = {
              action: SalesProgramStatus.CANCEL_SEND_APPROVAL,
              code: record?.code,
            };
            await dispatch(onApproveRequestSalesProgram(payload));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '9': {
        // Admin inreview request
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn đổi trạng thái chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong> thành đang
              chờ phê duyệt không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const salesProgramCode = record?.code;
            const action = SalesProgramStatus.ADMIN_INREVIEW;
            const payload = {
              salesProgramCode,
              action,
            };
            await dispatch(onAdminApproveRequest(payload));
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '10': {
        // Admin approve request
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn duyệt chương trình{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            setLoadingSaleProgramNoti(true);
            const salesProgramCode = record?.code;
            const action = SalesProgramStatus.ADMIN_ACCEPT;
            const payload = {
              salesProgramCode,
              action,
            };
            await dispatch(onAdminApproveRequest(payload));
            setLoadingSaleProgramNoti(false);
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record.code === currentRecord?.code || !currentRecord,
            );
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '11': {
        // Admin reject request
        setModalData({
          title: `Thông báo`,
          description: <RejectSalesProgram form={form} />,
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const {reason} = form.getFieldsValue();
            const salesProgramCode = record?.code;
            const action = SalesProgramStatus.ADMIN_REJECT;
            const payload = {
              salesProgramCode,
              action,
              reason,
            };
            const res: any = await dispatch(onAdminApproveRequest(payload));
            if (res) {
              setIsRefresh((pre) => !pre);
              setIsOpen(false);
              setIsRefreshChild(
                record.code === currentRecord?.code || !currentRecord,
              );
            }
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
    }
  };

  // Handle Sales Program Modal
  const [isOpenSalesProgramModal, setIsOpenSalesProgramModal] = useState(false);
  const handleAddSalesProgram = () => {
    const info = {
      draftString: DraftStrings.salesProgram,
      type: ActionType.ADD,
      action: () => {
        setIsRefresh((pre) => !pre);
        setIsOpenSalesProgramModal(false);
      },
    };
    setModalSaleProgram({
      title: (
        <AppTypo variant='p-xl-semi'>
          <IntlMessages id='common.addProgram' />
        </AppTypo>
      ),
      submitText: messages['common.save'] as string,
      closeText: messages['common.cancel'] as string,
    });
    setSalesProgramInfo(info);
    setIsOpenSalesProgramModal(true);
  };

  // Split pane
  const handleClickRow = (record: any) => {
    setCurrentRecord(record);
  };

  const handleChangeSearchParams = (params: any, resetRecord?: boolean) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
    if (resetRecord) setCurrentRecord(null);
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
    setModalData,

    modalSaleProgram,

    addInventoriesToProgramInfo,
    isOpenChooseInventoryModal,
    setIsOpenChooseInventoryModal,

    salesProgramInfo,
    isOpenSalesProgramModal,
    setIsOpenSalesProgramModal,
    handleClickRow,

    handleChangeSearchParams,
    handleAddSalesProgram,

    currentRecord,
    isRefreshChild,
    setIsRefreshChild,
    loadingSaleProgramNoti,
  };
};

export default useSalesProgram;
