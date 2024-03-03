import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {useEffect, useState} from 'react';
import {onSearchInventoryWarehouse} from 'redux/actions/InventoryWarehouse';
import {pageSize} from 'shared/constants/AppConst';

const useChooseInventoryFilter = (
  form: FormInstance,
  handleChangeSearchParams: (params: any) => void,
) => {
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

  const handleSearch = () => {
    const {searchText, inventoryWarehouseCode} = form.getFieldsValue();
    handleChangeSearchParams({
      page: 1,
      searchText,
      inventoryWarehouseCode,
    });
  };

  const handleResetForm = () => {
    form.resetFields();
    handleChangeSearchParams({
      searchText: '',
      inventoryWarehouseCode: '',
    });
  };
  return {
    form,
    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,
    handleSearch,
    handleResetForm,
  };
};
export default useChooseInventoryFilter;
