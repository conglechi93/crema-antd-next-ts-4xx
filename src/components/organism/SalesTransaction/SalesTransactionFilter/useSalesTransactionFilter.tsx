import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {AppState} from '@auth0/auth0-react';
import {useDispatch, useSelector} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';
import {onSearchSalesPrograms} from 'redux/actions/SalesPrograms';
import {onSearchInventoryWarehouse} from 'redux/actions/InventoryWarehouse';

const useSalesTransactionFilter = (
  handleChangeSearchParams: (params: any) => void,
) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [popOpen, setPopOpen] = useState(false);
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [statusOptions, setStatusOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();
  const [programOptions, setProgramOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  const [inventoryWarehouseOptions, setInventoryWarehouseOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  // Handle inventory table
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

  // Handle sales programs
  const [formSearchParams, setFormSearchParams] = useState<{
    searchText: string;
    inventoryWarehouseCode: string;
    salesProgramCode: string;
    status: string;
  }>({
    searchText: '',
    inventoryWarehouseCode: '',
    salesProgramCode: '',
    status: '',
  });
  const [loadingSalesPrograms, setLoadingSalesPrograms] = useState(false);
  const [loadMoreSalesPrograms, setLoadMoreSalesPrograms] = useState(false);
  const [currentPageSalesPrograms, setCurrentPageSalesPrograms] = useState(1);
  const [salesProgramsSearchParams, setSalesProgramsSearchParams] = useState({
    page: currentPageSalesPrograms,
    pageSize: pageSize.LOAD_MORE,
    searchText: '',
    fromDate: '',
    toDate: '',
  });
  useEffect(() => {
    const fetchSalesPrograms = async () => {
      setLoadingSalesPrograms(true);
      const res: any = await dispatch(
        onSearchSalesPrograms({
          ...salesProgramsSearchParams,
          page: loadMoreSalesPrograms
            ? salesProgramsSearchParams.page + 1
            : salesProgramsSearchParams.page,
        }),
      );
      const options: Array<any> = [];
      const elements: Array<any> = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        options.push({
          label: item.name,
          value: item.code,
        });
      });

      const newOption = loadMoreSalesPrograms
        ? [...inventoryWarehouseOptions, ...options]
        : options;
      if (loadMoreSalesPrograms && options.length > 0)
        setCurrentPageSalesPrograms(salesProgramsSearchParams.page + 1);
      else setCurrentPageSalesPrograms(salesProgramsSearchParams.page);

      await setProgramOptions(newOption);
      setTimeout(() => {
        setLoadingSalesPrograms(false);
        setLoadMoreSalesPrograms(false);
      }, 500);
    };
    fetchSalesPrograms();
  }, [salesProgramsSearchParams]);
  const handleScrollPoupSalesProgram = async (event: any) => {
    const target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      await setLoadMoreSalesPrograms(true);
      setSalesProgramsSearchParams({
        ...salesProgramsSearchParams,
        page: currentPageSalesPrograms,
      });
      target.scrollTo(0, target.scrollHeight);
    }
  };

  useEffect(() => {
    if (categories?.inventorySalesStatusShopCat) {
      const inventorySalesStatus: any = categories?.inventorySalesStatusShopCat;
      // const statusOptions: any = [{label: 'Tất cả', value: ''}];
      const statusOptions: Array<{label: string; value: string}> = [];
      inventorySalesStatus?.map((item: {name: string; code: string}) => {
        statusOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(statusOptions);
    }
  }, [categories]);

  useEffect(() => {
    if (popOpen) {
      const {searchText, inventoryWarehouseCode, salesProgramCode, status} =
        formSearchParams;
      form.setFieldsValue({
        searchText: searchText ? searchText : '',
        inventoryWarehouseCode: inventoryWarehouseCode
          ? inventoryWarehouseCode
          : undefined,
        salesProgramCode: salesProgramCode ? salesProgramCode : undefined,
        status: status && status.length ? status : undefined,
      });
    }
  }, [popOpen]);

  const handleSearch = () => {
    const searchParams = {
      ...form.getFieldsValue(),
    };
    setFormSearchParams(searchParams);
    handleChangeSearchParams(searchParams);
    setPopOpen(false);
  };

  const handleSubmitPopup = () => {
    handleSearch();
  };

  const handleCancelPopup = () => {
    form.resetFields();
  };

  return {
    form,
    statusOptions,

    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,

    programOptions,
    loadingSalesPrograms,
    handleScrollPoupSalesProgram,

    popOpen,
    setPopOpen,
    handleSearch,
    handleSubmitPopup,
    handleCancelPopup,
  };
};
export default useSalesTransactionFilter;
