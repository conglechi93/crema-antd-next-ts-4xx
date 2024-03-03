import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {onGetDataTypes} from 'redux/actions/Categories';

const useFormFilter = (
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
    status: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    status: string[];
  }>(initSearchParams);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        status: searchParams?.status,
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
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues =
      status && !Array.from(status)?.includes('') ? status : allStatus;
    const searchParams = {
      page: 1,
      searchText: searchText || '',
      status: statusValues,
    };
    setSearchParams({...searchParams});
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
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
  };
};
export default useFormFilter;
