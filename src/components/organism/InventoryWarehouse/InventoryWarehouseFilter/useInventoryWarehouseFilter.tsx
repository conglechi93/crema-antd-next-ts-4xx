import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {pageSize} from 'shared/constants/AppConst';

const useInventoryWarehouseFilter = (
  onSubmitForm: (params: any, resetRecord: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initSearchParams = {
    searchText: '',
    project: [],
    status: [],
  };
  const [initialValues, setInitialValues] = useState<any>(null);
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    project: string[];
    status: string[];
  }>(initSearchParams);
  const [openPop, setOpenPop] = useState(false);
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);

  useEffect(() => {
    if (openPop) {
      const {searchText, project, status} = searchParams;
      form.setFieldsValue({
        searchText: searchText ? searchText : '',
        project: project ? project : undefined,
        status: status && status.length ? status : undefined,
      });
      setInitialValues({...searchParams});
    } else setInitialValues(null);
  }, [openPop]);

  // Handle project
  const [projectSearchParams, setProjectSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    searchText: '',
    isLoadMore: true,
  });

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
    const {searchText, project, status} = form.getFieldsValue();
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues =
      status && !Array.from(status)?.includes('') ? status : allStatus;
    const searchParams = {
      searchText: searchText || '',
      project: project || undefined,
      status: statusValues,
      page: 1,
    };
    setSearchParams(searchParams);
    onSubmitForm(searchParams, true);
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
    statusOptions,
    projectSearchParams,
    setProjectSearchParams,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
  };
};
export default useInventoryWarehouseFilter;
