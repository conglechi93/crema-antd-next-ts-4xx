import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Form, Menu, Popover, Tooltip} from 'antd';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';
import {
  onDeleteInventorySalesProgram,
  onEnrollInventorySalesProgram,
  onSearchInventoriesInSalesProgram,
} from 'redux/actions/SalesPrograms';
import {addLeadingZeros} from 'utils/FormUtils';
import AppControlAction from 'components/atoms/AppControlAction';
import {SalesTransactionStatus} from 'shared/constants/AppVariables';
import TransactionDetail from 'components/organism/SalesTransaction/TransactionDetail';
import {
  onAdminApproveStatusInventoryInSalesProgram,
  onUpdateTransactionStatus,
} from 'redux/actions/SalesTransactions';
import ObjectHelper from 'utils/ObjectHelper';
import RejectInventory from 'components/organism/AdminVars/RejectInventory';
import {useIntl} from 'react-intl';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useSalesProgramDetailTable = (
  record: any,
  isRefreshChild: boolean,
  setIsRefreshChild: (value: boolean) => void,
) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    salesProgramCode: string;
    inventoryWarehouseCode: string;
    status: string;
  }>({
    page: 1,
    pageSize: pageSize.INVENTORY,
    searchText: '',
    salesProgramCode: '',
    inventoryWarehouseCode: '',
    status: '',
  });
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: any;
    description?: any;
    submitText?: any;
    handleSubmit: () => void;
    closeText?: any;
    handleClose?: () => void;
    width: number;
    height?: any;
  }>({
    title: '',
    description: '',
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 480,
    height: '',
  });

  const [info, setInfo] = useState<any>(null);

  const [isOpenConfirmTransaction, setIsOpenConfirmTransaction] =
    useState(false);

  useEffect(() => {
    if (record) {
      setSearchParams({
        page: 1,
        pageSize: pageSize.SALES_PROGRAMS,
        searchText: '',
        inventoryWarehouseCode: '',
        status: '',
        salesProgramCode: record?.code,
      });
    } else {
      setTotal(0);
      setDataSource([]);
    }
  }, [record]);

  useEffect(() => {
    const fetchSalesProgramsDetails = async () => {
      const salesProgramCode = searchParams?.salesProgramCode;
      if (!salesProgramCode) return;
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
        'salesProgramCode',
      ]);
      setIsSearchAll(isSearchAll);

      const res: any = await dispatch(
        onSearchInventoriesInSalesProgram(searchParams),
      );
      const dataSource: Array<any> = [];
      const elements = res?.elements || [];
      elements.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          code: item?.code,
          key: item?.code ? item?.code : index,
        });
      });
      setCurrentPage(res?.currentPage || 1);
      setTotal(res?.total || 0);
      setDataSource(dataSource);
      setLoading(false);
      setIsRefreshChild(false);
    };
    fetchSalesProgramsDetails();
  }, [searchParams, isRefresh, isRefreshChild]);

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
            setOpen(false);
          },
          width: 1200,
          height: 500,
        });
        setOpen(true);
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
            setOpen(false);
          },
          width: 1200,
          height: 500,
        });
        setOpen(true);
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
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
              setOpen(false);
            }
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          submitText: <IntlMessages id='common.agree' />,
          closeText: <IntlMessages id='common.cancel' />,
          handleSubmit: async () => {
            const salesProgramDetailCode = record?.code;
            await dispatch(
              onDeleteInventorySalesProgram(salesProgramDetailCode),
            );
            setOpen(false);
            setIsRefresh((pre) => !pre);
          },
          handleClose: () => {
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
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
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
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
              setOpen(false);
            }
          },
          width: 480,
        });
        setOpen(true);
        break;
      }
      case '12': {
        // Reject transaction
        setModalData({
          title: `Thông báo`,
          description: <RejectInventory form={form} />,
          submitText: 'Đồng ý',
          closeText: messages['common.cancel'] as string,
          handleClose: () => {
            setOpen(false);
          },
          handleSubmit: async () => {
            const {reason} = form.getFieldsValue();
            const action = SalesTransactionStatus.ADMIN_REJECT;
            const code = record?.code;
            const payload = {
              action,
              code,
              reason,
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
            setOpen(false);
            // TODO
          },
          width: 480,
        });
        setOpen(true);
        break;
      }
      default: {
        break;
      }
    }
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
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
      key: '2',
      title: 'Tên',
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
      key: '3',
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
      dataIndex: 'inventorySalesStatus',
      key: '4',
      width: 70,
      ellipsis: {
        showTitle: false,
      },
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
      width: 50,
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
              <Menu.Item key={12}>
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
    handleChangeSearchParams,
    currentPage,
    setCurrentPage,
    open,
    setOpen,
    modalData,
    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
  };
};
export default useSalesProgramDetailTable;
