import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const usePropertyFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );

  const [form] = Form.useForm();
  const [openPop, setOpenPop] = useState(false);
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const initSearchParams = {
    searchText: '',
    status: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    status: string[];
  }>(initSearchParams);

  useEffect(() => {
    if (categories?.usedStatusShopCat) {
      const usedStatusShopCat: any = categories?.usedStatusShopCat;
      const statusOptions: any = [{label: 'Tất cả', value: ''}];
      usedStatusShopCat?.map((item: {name: string; code: string}) => {
        statusOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(statusOptions);
    }
  }, [categories]);

  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        status: searchParams?.status,
      });
    }
  }, [openPop]);

  const handleSearch = (e) => {
    const {searchText, status} = form.getFieldsValue();
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues = status
      ? !Array.from(status)?.includes('')
        ? status
        : allStatus
      : undefined;
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      status: statusValues,
    };
    setSearchParams({
      searchText: searchParams?.searchText,
      status: searchParams?.status,
    });
    handleChangeSearchParams(searchParams, true);
    setOpenPop(false);
  };
  const handleConfirmPop = (e) => {
    handleSearch(e);
  };

  const handleCancelPop = () => {
    form.resetFields();
    // setSearchParams(initSearchParams);
  };
  return {
    form,
    searchParams,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,

    statusOptions,
  };
};
export default usePropertyFilter;
