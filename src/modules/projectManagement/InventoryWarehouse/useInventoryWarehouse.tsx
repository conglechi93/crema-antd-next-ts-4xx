import { useEffect, useState } from 'react';
import { Menu, Popover, Tooltip } from 'antd';
import {
  onDeleteInventoryWarehouse,
  onGetInvetoryWarehouseDetailByCode,
  onSearchInventoryWarehouse,
} from 'redux/actions/InventoryWarehouse';
import {
  createInventoryDataSource,
  createInventoryWarehouseInfo,
  loadState,
  removeState,
  saveState,
} from 'utils/LocalStore';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { ActionType, DraftStrings } from 'shared/constants/AppVariables';
import { useDispatch } from 'react-redux';
import { pageSize } from 'shared/constants/AppConst';
import { addLeadingZeros } from 'utils/FormUtils';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTag from 'components/atoms/AppTag';
import AppControlAction from 'components/atoms/AppControlAction';
import ObjectHelper from 'utils/ObjectHelper';

const useInventoryWarehouse = () => {
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [currentRecord, setCurrenRecord] = useState<any>(undefined);
  const [isRefreshChild, setIsRefreshChild] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    page: currentPage,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    projectCode: '',
    formCode: '',
    status: '',
  });

  const [isSearchAll, setIsSearchAll] = useState(true);

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
  // Inventory Table Modal
  const [isOpenInventoryWarehouseModal, setIsOpenInventoryWarehouseModal] =
    useState(false);
  // Add Inventory Modal
  const [isOpenInventoryModal, setIsOpenInventoryModal] = useState(false);
  const [isOpenImportInventoryModal, setIsOpenImportInventoryModal] =
    useState(false);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (text, record) => {
        let index = (currentPage - 1) * pageSize.DEFAULT + record.index + 1;
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
      width: 100,
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
      width: 180,
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
      title: <IntlMessages id='common.project' />,
      dataIndex: 'project',
      key: '3',
      width: 200,
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
      title: <IntlMessages id='common.form' />,
      dataIndex: 'formName',
      key: '4',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.form?.name}>
            <div className='ellipsis-text'>{record?.form?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.creator' />,
      dataIndex: 'creator',
      key: '5',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.createdBy?.name ?? record?.createdBy?.phone}>
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
      width: 200,
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
      width: 100,
      render: (text, record) => {
        return (
          <AppTag
            title={record?.usedStatus?.name ?? 'Trống'}
            color={`#${record?.usedStatus.color}`}
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
          <div style={{ display: 'flex' }}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              <Menu.Item key={2}>
                <AppControlAction variant='add' />
                <IntlMessages id='common.addInventory' />
              </Menu.Item>
              <Menu.Item key={3}>
                <AppControlAction variant='downloadUp' />
                <IntlMessages id='common.importInventory' />
              </Menu.Item>
              <Menu.Item key={4} disabled={record?.usedStatus?.code === '2'}>
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={5} disabled={record?.usedStatus?.code === '2'}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='topLeft'>
            <AiOutlineEllipsis
              style={{ cursor: 'pointer', fontSize: '22px', display: 'flex' }}
            />
          </Popover>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchInventoryWarehouses = async () => {
      setLoading(true);
      const res = await onSearchInventoryWarehouse(searchParams);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      let elements = res?.elements ?? [];
      let dataSource: any = [];
      elements.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setCurrentPage(res?.currentPage ?? 1);
      setDataSource(dataSource);
      setTotal(res?.total ?? 0);
      setLoading(false);
    };
    fetchInventoryWarehouses();
  }, [searchParams, isRefresh]);

  const addItem = async () => {
    const info = {
      draftString: DraftStrings.inventoryWarehouse,
      type: ActionType.ADD,
      action: () => {
        setIsOpenInventoryWarehouseModal(false);
        setIsRefresh((pre) => !pre);
      },
      record: null,
    };
    setModalInfomation(info);
    createInventoryWarehouseInfo(null, DraftStrings.inventoryWarehouse);
    setIsOpenInventoryWarehouseModal(true);
  };

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View Detail Inventory Warehouse
        const code = record?.code;
        const res = await dispatch(onGetInvetoryWarehouseDetailByCode(code));
        const info = {
          draftString: DraftStrings.inventoryWarehouse,
          type: ActionType.VIEW,
          action: () => {
            setIsOpenInventoryWarehouseModal(false);
          },
          record: res,
        };
        setModalInfomation(info);
        createInventoryWarehouseInfo(res, DraftStrings.inventoryWarehouse);
        setIsOpenInventoryWarehouseModal(true);
        break;
      }
      case '2':
        // Add inventory
        const dataSource = loadState(DraftStrings.inventory);
        const isUsed = record?.code == dataSource?.code;
        const info = {
          draftString: DraftStrings.inventory,
          type: ActionType.ADD,
          action: () => {
            setIsOpenInventoryModal(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record?.code == currentRecord?.code || !currentRecord,
            );
            removeState([DraftStrings.inventory]);
          },
          record: record,
        };
        setModalInfomation(info);
        if (isUsed) {
          setModalData({
            title: 'Thông báo',
            description: (
              <>
                <p>
                  {'Đã có dữ liệu trước đó, bạn có muốn sử dụng lại không?'}
                </p>
              </>
            ),
            submitText: 'Đồng ý',
            handleSubmit: async () => {
              setIsOpen(false);
              setIsOpenInventoryModal(true);
              saveState(DraftStrings.inventory, dataSource);
            },
            closeText: 'Không',
            handleClose: () => {
              setIsOpen(false);
              saveState(DraftStrings.inventory, record);
              setIsOpenInventoryModal(true);
            },
            width: 512,
          });
          setIsOpen(true);
        } else {
          saveState(DraftStrings.inventory, record);
          setIsOpenInventoryModal(true);
        }
        break;
      case '3': {
        // Import inventory
        const info = {
          draftString: '',
          type: ActionType.IMPORT,
          action: () => {
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(record.code === currentRecord?.code);
          },
          record: record,
        };
        setModalInfomation(info);
        createInventoryDataSource(record, '');
        setIsOpenImportInventoryModal(true);
        break;
      }

      case '4': {
        // Edit inventory warehouse
        const code = record?.code;
        if (!code) return;
        setContentLoading(true);
        const res: any = await dispatch(
          onGetInvetoryWarehouseDetailByCode(code),
        );
        const info = {
          draftString: DraftStrings.inventoryWarehouse,
          type: ActionType.EDIT,
          action: () => {
            setIsOpenInventoryWarehouseModal(false);
            setIsRefresh((pre) => !pre);
            setIsRefreshChild(
              record?.code == currentRecord?.code || !currentRecord,
            );
          },
          record: record,
        };
        setModalInfomation(info);
        createInventoryWarehouseInfo(res, DraftStrings.inventoryWarehouse);
        setIsOpenInventoryWarehouseModal(true);
        setContentLoading(false);
        break;
      }
      case '5': {
        // Delete inventory table
        setModalData({
          title: 'Thông báo',
          description: (
            <>
              <p>
                {'Bạn có chắc chắn muốn xóa kho hàng '}
                <strong>{`${record?.code} - ${record?.name}`}</strong>{' '}
                {'này không?'}
              </p>
            </>
          ),
          submitText: 'Đồng ý',
          handleSubmit: async () => {
            await dispatch(onDeleteInventoryWarehouse(record.code));
            setIsOpen(false);
            setIsRefresh((pre) => !pre);
            if (record.code === currentRecord?.code) {
              setCurrenRecord(null);
            }
          },
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          width: 512,
        });
        setIsOpen(true);
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

    addItem,

    isOpen,
    setIsOpen,
    modalData,

    handleChangeSearchParams,

    isOpenInventoryModal,
    isOpenImportInventoryModal,
    setIsOpenImportInventoryModal,
    setIsOpenInventoryModal,

    modalInfomation,
    isOpenInventoryWarehouseModal,
    setIsOpenInventoryWarehouseModal,
    handleClickRow,

    isSearchAll,
    contentLoading,
  };
};

export default useInventoryWarehouse;
