import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onSearchWorkflow} from 'redux/actions/Workflow';

const useProjectFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [workFlowOptions, setWorkFlowOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [openPop, setOpenPop] = useState(false);
  const initSearchParams = {
    searchText: '',
    status: [],
    workFlow: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    status: string[];
    workFlow: string[];
  }>(initSearchParams);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        status: searchParams?.status,
        workFlow: searchParams?.workFlow,
      });
      setInitialValues({...searchParams});
    } else setInitialValues(null);
  }, [openPop]);

  useEffect(() => {
    const fetchWorkFlowOptions = async () => {
      if (!openPop) return;
      const searchParams = {
        page: 1,
        pageSize: 50,
      };
      const res: any = (await dispatch(onSearchWorkflow(searchParams))) ?? [];
      if (res) {
        const elements = res?.elements || [];
        const workFlowOptions: any = [{label: 'Tất cả', value: ''}];
        elements.map((item: any) => {
          workFlowOptions.push({
            label: item.name,
            value: item.code,
          });
        });
        setWorkFlowOptions(workFlowOptions);
      }
    };
    fetchWorkFlowOptions();
  }, [openPop]);

  useEffect(() => {
    if (categories?.projectStatusShopCat) {
      const usedStatusShopCat: any = categories?.projectStatusShopCat;
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
    const {searchText, status, workFlow} = form.getFieldsValue();
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues =
      status && !Array.from(status)?.includes('') ? status : allStatus;
    const allWorkFlow = workFlowOptions?.map((item: any) => item.value);
    const workFlowValues =
      workFlow && !Array.from(workFlow)?.includes('') ? workFlow : allWorkFlow;
    const searchParams = {
      page: 1,
      searchText: searchText || '',
      status: statusValues,
      workFlow: workFlowValues,
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
    workFlowOptions,
  };
};
export default useProjectFilter;
