import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';
import {onSearchInventoryWarehouse} from 'redux/actions/InventoryWarehouse';

const useCustomerDetailFilterTab2 = (
  handleChangeSearchParams: (params: any) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [statusOptions, setStatusOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [warehouseOptions, setWarehouseOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [openPop, setOpenPop] = useState(false);

  const initSearchParams = {
    page: 1,
    pageSize: pageSize.SALES_TRANSACTIONS,
    searchText: '',
    inventoryWarehouseCode: '',
    status: '',
  };
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    inventoryWarehouseCode: string;
    status: string;
  }>(initSearchParams);

  const [inventoriesTableSearchParams, setInventoriesTableSearchParams] =
    useState({
      page: 1,
      pageSize: pageSize.LOAD_MORE,
      isLoadMore: true,
    });

  useEffect(() => {
    if (categories) {
      const typeOptions: Array<{label: string; value: string}> = [
        {label: 'Tất cả', value: ''},
      ];
      categories?.inventoryStatusShopCat?.map((item: any) => {
        typeOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(typeOptions);
    }
  }, [categories]);

  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        inventoryWarehouseCode: searchParams.inventoryWarehouseCode
          ? searchParams.inventoryWarehouseCode
          : undefined,
        status: searchParams.status ? searchParams.status : undefined,
      });
    }
  }, [openPop]);

  useEffect(() => {
    const fetchInventoryWarehouses = async () => {
      const options: Array<{label: string; value: string}> = [];
      const initSearchParams = {
        page: 1,
        pageSize: pageSize.SALES_TRANSACTIONS,
        searchText: '',
        projectCode: '',
        formCode: '',
        status: '',
      };
      const res = await onSearchInventoryWarehouse(initSearchParams);
      res?.elements?.map((item: any) => {
        options.push({
          label: item.name,
          value: item.code,
        });
      });
      setWarehouseOptions(options);
    };
    fetchInventoryWarehouses();
  }, []);

  const handleSearch = () => {
    const {searchText, inventoryWarehouseCode, status} = form.getFieldsValue();
    const searchParams = {
      page: 1,
      pageSize: 10,
      searchText: searchText ? searchText : '',
      inventoryWarehouseCode: inventoryWarehouseCode,
      status: status,
    };
    setSearchParams(searchParams);
    handleChangeSearchParams(searchParams);
  };
  const handleConfirmPop = () => {
    handleSearch();
    setOpenPop(false);
  };

  const handleCancelPop = () => {
    form.resetFields();
  };

  return {
    form,
    statusOptions,
    warehouseOptions,
    openPop,
    setOpenPop,
    searchParams,
    setSearchParams,
    handleConfirmPop,
    handleCancelPop,
    inventoriesTableSearchParams,
    setInventoriesTableSearchParams,
  };
};
export default useCustomerDetailFilterTab2;
