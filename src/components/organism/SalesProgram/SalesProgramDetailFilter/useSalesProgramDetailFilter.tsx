import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {AppState} from '@auth0/auth0-react';
import {useDispatch, useSelector} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';
import {onSearchSalesPrograms} from 'redux/actions/SalesPrograms';
import {onSearchInventoryWarehouse} from 'redux/actions/InventoryWarehouse';

const useSalesTransactionFilter = (
  currentRecord: any,
  handleChangeSearchParams: (params: any) => void,
) => {
  const [form] = Form.useForm();
  const [popForm] = Form.useForm();
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [statusOptions, setStatusOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  useEffect(() => {
    form.resetFields();
    popForm.resetFields();
  }, [currentRecord]);

  // Handle inventory table
  const [inventoryWarehouseOptions, setInventoryWarehouseOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [loadingInventoryWarehouse, setLoadingInventoryWarehouse] =
    useState(false);
  const [loadMoreInventoryWarehouse, setLoadMoreInventoryWarehouse] =
    useState(false);
  const [currentPageInventoryWarehouse, setCurrentPageInventoryWarehouse] =
    useState(1);
  const [inventoryWarehouseSearchParams, setInventoryWarehouseSearchParams] =
    useState({
      page: currentPageInventoryWarehouse,
      pageSize: pageSize.LOAD_MORE,
      searchText: '',
    });

  useEffect(() => {
    const fetchInventoryWarehouses = async () => {
      setLoadingInventoryWarehouse(true);
      const res: any = await onSearchInventoryWarehouse({
        ...inventoryWarehouseSearchParams,
        page: loadMoreInventoryWarehouse
          ? inventoryWarehouseSearchParams.page + 1
          : inventoryWarehouseSearchParams.page,
      });
      const options: Array<{label: string; value: string}> = [];
      const elements: Array<any> = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        options.push({
          label: item.name,
          value: item.code,
        });
      });

      const newOption = loadMoreInventoryWarehouse
        ? [...inventoryWarehouseOptions, ...options]
        : options;
      if (loadMoreInventoryWarehouse && options.length > 0)
        setCurrentPageInventoryWarehouse(
          inventoryWarehouseSearchParams.page + 1,
        );
      else
        setCurrentPageInventoryWarehouse(inventoryWarehouseSearchParams.page);

      await setInventoryWarehouseOptions(newOption);
      setTimeout(() => {
        setLoadingInventoryWarehouse(false);
        setLoadMoreInventoryWarehouse(false);
      }, 500);
    };
    fetchInventoryWarehouses();
  }, [inventoryWarehouseSearchParams]);

  const handleScrollPoupInventoryWarehouse = async (event: any) => {
    const target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      await setLoadMoreInventoryWarehouse(true);
      setInventoryWarehouseSearchParams({
        ...inventoryWarehouseSearchParams,
        page: currentPageInventoryWarehouse,
      });
      target.scrollTo(0, target.scrollHeight);
    }
  };

  useEffect(() => {
    if (categories?.inventorySalesStatusShopCat) {
      const inventorySalesStatus: any = categories?.inventorySalesStatusShopCat;
      const statusOptions: any = [{label: 'Tất cả', value: ''}];
      inventorySalesStatus?.map((item: {name: string; code: string}) => {
        statusOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(statusOptions);
    }
  }, [categories]);

  const handleSearch = (e: any) => {
    const {status, inventoryWarehouseCode} = popForm.getFieldsValue();
    const formData = form.getFieldsValue();

    const searchText = e ? formData.searchText : null;
    const popParams = {
      status: status && !Array.from(status)?.includes('') ? status : '',
      inventoryWarehouseCode: inventoryWarehouseCode
        ? inventoryWarehouseCode
        : '',
    };
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      ...popParams,
    };
    handleChangeSearchParams(searchParams);
  };

  return {
    form,
    popForm,
    statusOptions,

    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,

    handleSearch,
  };
};
export default useSalesTransactionFilter;
