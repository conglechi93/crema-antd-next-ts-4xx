import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';

const useCustomerFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [openPop, setOpenPop] = useState(false);

  const [initialValues, setInitialValues] = useState<any>(null);
  const initSearchParams = {
    searchText: '',
    customerGroup: [],
    customerSource: [],
    tags: '',
    staffInCharges: '',
    status: [],
  };

  const [employeeSearchParams, setEmployeeSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    status: '1',
    isLoadMore: true,
  });
  const [tagsSearchParams, setTagsSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });

  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    customerGroup: string[];
    customerSource: string[];
    tags: string[] | string;
    staffInCharges: string;
    status: string[];
  }>(initSearchParams);

  const [customerResourcesOptions, setCustomerResourcesOptions] = useState<
    Array<any>
  >([]);
  const [customerGroupOptions, setCustomerGroupOptions] = useState<Array<any>>(
    [],
  );
  const [customerStatusOptions, setCustomerStatusOptions] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    if (categories) {
      const customerResourcesOptions: Array<any> = [
        {label: 'Tất cả', value: ''},
      ];
      categories?.customerSourceShopCat?.map((item: any) =>
        customerResourcesOptions.push({
          label: item?.name,
          value: item?.code,
        }),
      );
      setCustomerResourcesOptions(customerResourcesOptions);

      const customerGroupOptions: Array<any> = [{label: 'Tất cả', value: ''}];
      categories?.customerGroupShopCat?.map((item: any) =>
        customerGroupOptions.push({
          label: item?.name,
          value: item?.code,
        }),
      );
      setCustomerGroupOptions(customerGroupOptions);

      const customerStatusShopCat: Array<any> = [{label: 'Tất cả', value: ''}];
      categories?.customerStatusShopCat?.map((item: any) =>
        customerStatusShopCat.push({
          label: item?.name,
          value: item?.code,
        }),
      );
      setCustomerStatusOptions(customerStatusShopCat);
    }
  }, [categories]);

  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        customerGroup: searchParams?.customerGroup ?? undefined,
        customerSource: searchParams.customerSource
          ? searchParams.customerSource
          : undefined,
        staffInCharges: searchParams.staffInCharges
          ? searchParams.staffInCharges
          : undefined,
        status: searchParams.status ? searchParams.status : undefined,
        tags: searchParams.tags ? searchParams.tags : undefined,
      });
      setInitialValues(searchParams);
    } else {
      setInitialValues(null);
    }
  }, [openPop]);

  const handleSearch = (e) => {
    const {
      searchText,
      staffInCharges,
      status,
      customerGroup,
      customerSource,
      tags,
      province,
      district,
      wards,
    } = form.getFieldsValue();
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      customerGroup: customerGroup ? customerGroup : undefined,
      customerSource: customerSource ? customerSource : undefined,
      staffInCharges: staffInCharges ? staffInCharges : undefined,
      status: status ? status : undefined,
      tags: tags ? tags : undefined,
      province: province ?? undefined,
      district: district ?? undefined,
      wards: wards ?? undefined,
    };
    setSearchParams({
      ...searchParams,
    });
    handleChangeSearchParams(searchParams, true);
  };
  const handleConfirmPop = (e) => {
    handleSearch(e);
    setOpenPop(false);
  };

  const handleCancelPop = () => {
    form.resetFields();
    // setSearchParams(initSearchParams);
  };
  return {
    form,
    searchParams,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,

    customerGroupOptions,
    customerStatusOptions,
    customerResourcesOptions,

    employeeSearchParams,
    setEmployeeSearchParams,

    tagsSearchParams,
    setTagsSearchParams,
  };
};
export default useCustomerFilter;
