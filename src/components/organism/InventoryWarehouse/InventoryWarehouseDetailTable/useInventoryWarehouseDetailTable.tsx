import IntlMessages from '@crema/utility/IntlMessages';
import {Menu, Popover, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onDeleteInventory, onSearchInventory} from 'redux/actions/Inventory';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import {saveState} from 'utils/LocalStore';
import InventoryDetail from '../InventoryDetail';
import AppControlAction from 'components/atoms/AppControlAction';
import ObjectHelper from 'utils/ObjectHelper';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useInventoryWarehouseDetailTable = (
  isRefreshChild: boolean,
  setIsRefreshChild: (boolean) => void,
  inventoryWarehouseRecord: any,
  setIsRefresh: (boolean) => void,
) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [addInventoryInfo, setAddInventoryInfo] = useState({});
  const [isOpenInventoryModal, setIsOpenInventoryModal] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    inventoryWarehouseCode: string;
    status: string;
  }>({
    page: 1,
    pageSize: pageSize.INVENTORY,
    searchText: '',
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
  }>({
    title: '',
    description: '',
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 480,
  });

  useEffect(() => {
    if (inventoryWarehouseRecord) {
      const inventoryWarehouseCode = inventoryWarehouseRecord?.code;
      setSearchParams({
        page: 1,
        pageSize: pageSize.INVENTORY,
        searchText: '',
        inventoryWarehouseCode: inventoryWarehouseCode,
        status: '',
      });
    } else {
      setTotal(0);
      setDataSource([]);
    }
  }, [inventoryWarehouseRecord]);

  let initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.INVENTORY + record.index + 1;
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
      title: 'Mã mặt hàng',
      width: 120,
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
      title: 'Mô tả',
      width: 200,
      dataIndex: 'description',
      key: '3',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.description}>
            <div
              className='ellipsis-text'
              dangerouslySetInnerHTML={{__html: record?.description}}
            ></div>
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
          <Tooltip title={record?.createdBy?.phone ?? ''}>
            <div className='ellipsis-text'>
              {record?.createdBy?.name ?? record?.createdBy?.phone}
            </div>
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
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={3}>
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
  const [columns, setColumns] = useState<Array<any>>(initialColumns);

  useEffect(() => {
    const fetchInventories = async () => {
      if (!searchParams?.inventoryWarehouseCode) return;
      setIsLoading(true);
      const res: any = await dispatch(onSearchInventory(searchParams));
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
        'inventoryWarehouseCode',
      ]);
      setIsSearchAll(isSearchAll);
      const elements: Array<any> = res?.elements || [];
      let dataSource: any = [];
      elements?.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          id: item?.id,
          code: item?.code,
          key: item?.code ? item?.code : index,
        });
      });
      setColumns(initialColumns);
      setDataSource(dataSource);
      setTotal(res?.total || 0);
      setIsLoading(false);
      setCurrentPage(res?.currentPage || 1);
      setIsRefreshChild(false);
    };
    fetchInventories();
  }, [searchParams, isRefreshChild]);

  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        // View inventory detail
        setModalData({
          title: (
            <AppTitleLable
              title={'common.inventoryInfo'}
              recordTitle={record?.code}
            />
          ),
          description: <InventoryDetail inventoryRecord={record} />,
          submitText: <IntlMessages id='common.close' />,
          handleSubmit: () => {
            setOpen(false);
          },
          width: 1200,
        });
        setOpen(true);
        break;
      }
      case '2': {
        // Edit inventory
        const info = {
          draftString: DraftStrings.inventory,
          type: ActionType.EDIT,
          action: () => {
            setIsOpenInventoryModal(false);
            handleChangeSearchParam({
              searchParams,
            });
            setIsRefresh((pre) => !pre);
          },
          record: record,
        };
        setAddInventoryInfo(info);
        setModalData({
          title: <IntlMessages id='common.editInventory' />,
          handleSubmit: () => {},
          width: 1200,
        });
        const data = {
          ...inventoryWarehouseRecord,
          inventoryCode: record?.code,
        };
        saveState(DraftStrings.inventory, data);
        setIsOpenInventoryModal(true);
        break;
      }
      case '3': {
        // Delete inventory
        setModalData({
          title: messages['common.notification'] as string,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa mặt hàng{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>
              không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleSubmit: async () => {
            const res: any = await dispatch(onDeleteInventory(record?.code));
            if (res) {
              setOpen(false);
              setIsRefresh((pre) => !pre);
              handleChangeSearchParam({
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

  const handleChangeSearchParam = (values: any) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
  };
  return {
    searchParams,
    total,
    columns,
    isLoading,
    dataSource,
    handleChangeSearchParam,
    currentPage,
    setCurrentPage,
    open,
    setOpen,
    modalData,
    setModalData,

    isSearchAll,

    addInventoryInfo,
    isOpenInventoryModal,
    setIsOpenInventoryModal,
  };
};
export default useInventoryWarehouseDetailTable;
