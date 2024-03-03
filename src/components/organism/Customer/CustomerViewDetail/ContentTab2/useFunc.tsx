import {Menu, Popover, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {useDispatch} from 'react-redux';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import {
  onDeleteCustomerInventories,
  onGetInventoryInterested,
} from 'redux/actions/Customer';
import AppControlAction from 'components/atoms/AppControlAction';
import IntlMessages from '@crema/utility/IntlMessages';
import {AiOutlineEllipsis} from 'react-icons/ai';
import AppTag from 'components/atoms/AppTag';

const useCustomDetailTab2 = (record: any, activeValue: string) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [infoInventory, setInfoInventory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );

  const [isSearchAll, setIsSearchAll] = useState(true);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: any;
    description?: any;
    submitText?: any;
    handleSubmit: () => void;
    closeText?: any;
    handleClose?: () => void;
    width: number;
  }>({
    title: '',
    description: '',
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 480,
  });

  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    customerCode: string;
    searchText: string;
    inventoryWarehouseCode: string;
    status: string;
  }>({
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    customerCode: '',
    searchText: '',
    inventoryWarehouseCode: '',
    status: '',
  });

  useEffect(() => {
    if (activeValue === '2') {
      const fetchEmployeeLogs = async () => {
        setLoading(true);
        const isSearchAll = ObjectHelper.isEmpty(searchParams, [
          'page',
          'pageSize',
        ]);
        setIsSearchAll(isSearchAll);
        const customerCode = record?.code;
        const newSearchParams = {
          ...searchParams,
          customerCode: customerCode,
        };
        const res: any = await dispatch(
          onGetInventoryInterested(newSearchParams),
        );

        const dataSource: Array<any> = [];
        const elements: Array<any> = res?.elements || [];

        elements.map((item: any, index: number) => {
          dataSource.push({
            ...item,
            index: index,
            id: item?.inventory?.code,
            key: item?.inventory?.code ? item?.inventory?.code : index,
            code: item?.code ? item?.code : index,
          });
        });
        setTotal(res?.total ?? 0);
        setCurrentPage(res?.currentPage ?? 1);
        setDataSource(dataSource);
        setLoading(false);
      };
      fetchEmployeeLogs();
    }
  }, [searchParams, activeValue]);

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
      title: 'Mã',
      width: 120,
      dataIndex: 'code',
      textAlign: 'center',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventory?.code}>
            <div className='ellipsis-text'>{record?.inventory?.code ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Tên mặt hàng',
      dataIndex: 'name',
      key: '4',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventory?.name ?? ''}>
            <div className='ellipsis-text'>{record?.inventory?.name ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Kho hàng',
      dataIndex: 'warehouse',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.inventory?.inventoryWarehouse?.name ?? ''}>
            <div className='ellipsis-text'>
              {record?.inventory?.inventoryWarehouse?.name ?? ''}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: '4',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <AppTag
            title={record?.inventory?.status?.name}
            color={`#${record?.inventory?.status?.color}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 70,
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

  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        setInfoInventory(record?.inventory);
        setOpenDrawer(true);
        break;
      }
      case '2': {
        // Delete inventory
        setModalData({
          title: <IntlMessages id='common.notification' />,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa mặt hàng{' '}
              <strong>{`${record?.inventory?.code} - ${record?.inventory?.name} `}</strong>
              không?
            </p>
          ),
          submitText: <IntlMessages id='common.agree' />,
          closeText: <IntlMessages id='common.cancel' />,
          handleSubmit: async () => {
            const res: any = await dispatch(
              onDeleteCustomerInventories(record?.code),
            );
            if (res) {
              setOpen(false);
              // setIsRefresh((pre) => !pre);
              handleChangeSearchParams({
                ...searchParams,
              });
            }
          },
          handleClose: () => {
            setOpen(false);
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
    loading,
    dataSource,
    currentPage,
    setCurrentPage,

    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
    handleChangeSearchParams,
    modalData,
    setOpen,
    open,

    setOpenDrawer,
    openDrawer,
    infoInventory,
  };
};

export default useCustomDetailTab2;
