import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const useTagsFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [openPop, setOpenPop] = useState(false);
  const initSearchParams = {
    searchText: '',
    status: '',
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    status: any;
  }>(initSearchParams);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      const {searchText, status} = searchParams;
      form.setFieldsValue({
        searchText: searchText,
        status: status || undefined,
      });
      setInitialValues({...searchParams});
    } else setInitialValues(null);
  }, [openPop]);

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

  const handleSearch = (e) => {
    const {searchText, status} = form.getFieldsValue();
    const searchParams = {
      page: 1,
      searchText: searchText,
      status: status,
    };
    setSearchParams({...searchParams});
    handleChangeSearchParams(searchParams);
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
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
  };
};
export default useTagsFilter;
