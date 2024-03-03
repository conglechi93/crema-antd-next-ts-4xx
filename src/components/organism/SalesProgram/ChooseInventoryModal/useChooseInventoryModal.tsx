import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onSearchInventory} from 'redux/actions/Inventory';
import {onAddInventoriesToProgram} from 'redux/actions/SalesPrograms';
import {pageSize} from 'shared/constants/AppConst';
import {ChooseInventoryType} from '.';
import {onAddCustomerInventoryInterested} from 'redux/actions/Customer';

const useChooseInventoryModal = (
  info: {
    action: () => void;
    record: any;
    type: ChooseInventoryType | undefined;
  },
  setDisabled: (value: boolean) => void,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const {action, record} = info;
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingAddInventory, setLoadingAddInventory] = useState(false);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [current, setCurrent] = useState(1);
  const [searchParams, setSearchParams] = useState({
    page: current,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    inventoryWarehouseCode: '',
    status: '',
    excludeInventorySuccess: true,
  });
  const [inventoryCodes, setInventoryCodes] = useState<Array<any>>([]);

  const columns = [
    {
      index: '1',
      title: 'Mã',
      width: 120,
      dataIndex: 'code',
    },
    {
      index: '2',
      title: 'Tên',
      width: 120,
      dataIndex: 'name',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      index: '3',
      title: 'Kho hàng',
      dataIndex: 'inventoryWarehouseName',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
    },
  ];

  useEffect(() => {
    const fetchInventories = async () => {
      setLoading(true);
      const res: any = await dispatch(onSearchInventory(searchParams));
      const elements: Array<any> = res?.elements || [];
      let dataSource: any = [];
      elements.forEach((item: any, index: number) => {
        dataSource.push({
          index: index,
          key: item?.code ? item?.code : index,
          id: item?.code,
          code: item?.code,
          name: item?.name,
          inventoryWarehouseName: item?.inventoryWarehouseName,
        });
      });
      setCurrent(searchParams.page);
      setDataSource(dataSource);
      setTotal(res?.total || 0);
      setLoading(false);
    };
    fetchInventories();
  }, [searchParams]);

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };

  const handleSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows?: any,
  ) => {
    const disabled = selectedRowKeys.length === 0;
    setDisabled(disabled);
    setInventoryCodes(selectedRowKeys);
  };

  const handleSubmit = async (): Promise<void> => {
    setLoadingAddInventory(true);
    const {type, record} = info;
    let res: any = null;
    switch (type) {
      case ChooseInventoryType.CHOOSE_INVENTORY: {
        const salesProgramCode = record?.code;
        res = await dispatch(
          onAddInventoriesToProgram({
            salesProgramCode,
            inventoryCodes,
          }),
        );

        break;
      }
      case ChooseInventoryType.ADD_INVETORY_INTEREST: {
        const customerCode = record?.code;
        const inventories: Array<any> = inventoryCodes.map((code: any) => {
          return {
            code: code,
          };
        });
        const payload = {
          customerCode: customerCode,
          inventories: inventories,
        };
        res = await dispatch(onAddCustomerInventoryInterested(payload));
        break;
      }
    }
    setLoadingAddInventory(false);
    if (res) {
      removeState();
      setIsOpen(false);
    }
  };

  const handleClose = (): void => {
    removeState();
    setIsOpen(false);
  };

  const removeState = () => {
    searchForm.resetFields();
    setSearchParams({
      page: 1,
      pageSize: pageSize.DEFAULT,
      searchText: '',
      inventoryWarehouseCode: '',
      status: '',
      excludeInventorySuccess: true,
    });
    setTotal(0);
    setDataSource([]);
    setInventoryCodes([]);
    action();
  };

  return {
    current,
    setCurrent,
    searchForm,
    total,
    loading,
    columns,
    dataSource,
    handleSelectChange,
    handleChangeSearchParams,

    handleSubmit,
    handleClose,
    removeState,
    loadingAddInventory,
  };
};
export default useChooseInventoryModal;
