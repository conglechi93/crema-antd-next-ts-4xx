import {Col, Menu, Popover, Row, Tag, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTag from 'components/atoms/AppTag';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {
  onAdminApproveStatusInventoryInSalesProgram,
  onSearchSalesTransactions,
  onUpdateTransactionStatus,
} from 'redux/actions/SalesTransactions';
import {addLeadingZeros} from 'utils/FormUtils';
import {SalesTransactionStatus} from 'shared/constants/AppVariables';
import TransactionDetail from 'components/organism/SalesTransaction/TransactionDetail';
import {
  onDeleteInventorySalesProgram,
  onEnrollInventorySalesProgram,
} from 'redux/actions/SalesPrograms';
import AppControlAction from 'components/atoms/AppControlAction';
import {useIntl} from 'react-intl';
import ObjectHelper from 'utils/ObjectHelper';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useSalesProgram = () => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
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
    height?: any;
  }>({
    title: '',
    description: <></>,
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    width: 768,
    height: '',
  });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSaleTransaction, setLoadingSaleTransaction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    salesProgramCode: string;
    inventoryWarehouseCode: string;
    status: string;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    searchText: '',
    salesProgramCode: '',
    inventoryWarehouseCode: '',
    status: '',
  });

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
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
      width: 50,
    },
    {
      title: 'Mã MH',
      width: 60,
      dataIndex: 'inventoryCode',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventory?.code}>
            <div className='ellipsis-text'>{record?.inventory?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Mã giao dịch',
      width: 60,
      dataIndex: 'salesProgramDetailCode',
      textAlign: 'center',
      key: '3',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.code}>
            <div className='ellipsis-text'>{record?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      key: '4',
      title: messages['common.inventoryName'],
      width: 120,
      dataIndex: 'inventoryName',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventory?.name}>
            <div className='ellipsis-text'>{record?.inventory?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'commissionDiscount',
      key: '5',
      width: 60,
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
      title: 'Chương trình bán hàng',
      dataIndex: 'salesProgramName',
      key: '6',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.salesProgram?.name}>
            <div className='ellipsis-text'>{record?.salesProgram?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      key: '7',
      title: 'Kho hàng',
      dataIndex: 'inventoryWarehouseName',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventoryWarehouse?.name}>
            <div className='ellipsis-text'>
              {record?.inventoryWarehouse?.name}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '8',
      width: 80,
      render: (text, record) => {
        return (
          <AppTag
            title={record?.status?.name ?? 'Không có'}
            color={`#${record?.status?.color ?? '000'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 70,
      render: (_: any, record: any) => {
        if (record?.actionsEnable?.length === 0) return <> </>;
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
              {actionsEnable?.includes(SalesTransactionStatus.VIEW_DETAIL) && (
                <Menu.Item key={1}>
                  <AppControlAction variant='view' />
                  <IntlMessages id='common.viewDetail' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesTransactionStatus.VIEW_TRADERS) && (
                <Menu.Item key={2}>
                  <AppControlAction variant='view' />
                  <IntlMessages id='common.viewerTransaction' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.PENDING_TRANSACTION,
              ) && (
                <Menu.Item key={3}>
                  <AppControlAction variant='pause' />
                  <IntlMessages id='common.pending' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.RE_OPEN_TRANSACTION,
              ) && (
                <Menu.Item key={4}>
                  <AppControlAction variant='open' />
                  <IntlMessages id='common.reopen' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.CONFIRM_TRANSACTION,
              ) && (
                <Menu.Item key={5}>
                  <AppControlAction variant='confirm' />
                  <IntlMessages id='common.confirmTransaction' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.DELETE_INVENTORY,
              ) && (
                <Menu.Item key={6}>
                  <AppControlAction variant='delete' />
                  <IntlMessages id='common.deleteTransaction' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.SEND_APPROVAL,
              ) && (
                <Menu.Item key={7}>
                  <AppControlAction variant='approval' />
                  <IntlMessages id='common.approval' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.CANCEL_SEND_APPROVAL,
              ) && (
                <Menu.Item key={8}>
                  <AppControlAction variant='cancel' />
                  <IntlMessages id='common.cancelApproval' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(
                SalesTransactionStatus.ADMIN_INREVIEW,
              ) && (
                <Menu.Item key={9}>
                  <AppControlAction variant='confirm' />
                  <IntlMessages id='common.inreview' />
                </Menu.Item>
              )}
              {actionsEnable?.includes(SalesTransactionStatus.ADMIN_ACCEPT) && (
                <Menu.Item key={10}>
                  <AppControlAction variant='confirm' />
                  <IntlMessages id='common.approve' />
                </Menu.Item>
              )}
              <Menu.Item key={11}>
                <AppControlAction variant='confirm' />
                <IntlMessages id='common.enrollTransaction' />
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
    const fetchSalesTransactions = async () => {
      setIsLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onSearchSalesTransactions(searchParams));
      const total = res?.total;
      const dataSource: Array<any> = [];
      const elements: Array<any> = res?.elements ?? [];
      elements?.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          code: item?.code,
          key: item?.code ? item?.code : index,
        });
      });
      setCurrentPage(res?.currentPage ?? 1);
      setColumns(initialColumns);
      setDataSource(dataSource);
      setTotal(total ?? 0);
      setIsLoading(false);
    };
    fetchSalesTransactions();
  }, [searchParams, isRefresh]);

  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        // View Detail
        setModalData({
          title: (
            <AppTitleLable
              title={'common.inventoryInfo'}
              recordTitle={record?.inventory?.code}
            />
          ),
          description: (
            <TransactionDetail record={record} viewerActiveValue='1' />
          ),
          submitText: <IntlMessages id='common.close' />,
          handleSubmit: () => {
            setIsOpen(false);
          },
          width: 1200,
          height: 500,
        });
        setIsOpen(true);
        break;
      }
      case '2': {
        // View traders
        setModalData({
          title: (
            <AppTitleLable
              title={'common.inventoryInfo'}
              recordTitle={record?.inventory?.code}
            />
          ),
          description: (
            <TransactionDetail record={record} viewerActiveValue='3' />
          ),
          submitText: <IntlMessages id='common.close' />,
          handleSubmit: () => {
            setIsOpen(false);
          },
          width: 1200,
          height: 500,
        });
        setIsOpen(true);
        break;
      }
      case '3': {
        // Disable transaction
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn tạm ngưng giao dịch{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.PENDING_TRANSACTION;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(onUpdateTransactionStatus(payload));
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
              setIsOpen(false);
            }
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '4': {
        // Reopen transaction
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn mở lại giao dịch{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.RE_OPEN_TRANSACTION;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(onUpdateTransactionStatus(payload));
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
            }
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '5': {
        // Confirm transaction
        setInfo(record);
        setIsOpenConfirmTransaction(true);
        break;
      }
      case '6': {
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn xoá{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleSubmit: async () => {
            const salesProgramDetailCode = record?.code;
            await dispatch(
              onDeleteInventorySalesProgram(salesProgramDetailCode),
            );
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
          },
          handleClose: () => {
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '7': {
        // Send approve
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn gửi duyệt lại mặt hàng{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.SEND_APPROVAL;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(onUpdateTransactionStatus(payload));
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
            }
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '8': {
        // Cancel approve
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn hủy gửi duyệt mặt hàng{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.CANCEL_SEND_APPROVAL;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(onUpdateTransactionStatus(payload));
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
            }
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '9': {
        // Inreview
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn kiểm duyệt mặt hàng{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.ADMIN_INREVIEW;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(
              onAdminApproveStatusInventoryInSalesProgram(payload),
            );
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
            }
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '10': {
        // Approve
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn duyệt mặt hàng{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const action = SalesTransactionStatus.ADMIN_ACCEPT;
            const code = record?.code;
            const payload = {
              action,
              code,
            };
            const res: any = await dispatch(
              onAdminApproveStatusInventoryInSalesProgram(payload),
            );
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
            }
            setIsOpen(false);
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case '11': {
        // Enroll transaction
        setModalData({
          title: `Thông báo`,
          description: (
            <p>
              Bạn có chắc chắn muốn tham gia giao dịch{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: 'Đồng ý',
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          handleSubmit: async () => {
            const code = record?.code;
            const res: any = await dispatch(
              onEnrollInventorySalesProgram(code),
            );
            if (res) {
              setSearchParams({
                ...searchParams,
                page: 1,
              });
              setIsOpen(false);
            }
          },
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  // Handle Sales Program Modal
  const [isOpenConfirmTransaction, setIsOpenConfirmTransaction] =
    useState(false);

  const handleChangeSearchParams = (values: any) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
    setIsInitialRender(false);
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
    loadingSaleTransaction,
  };
};

export default useSalesProgram;
