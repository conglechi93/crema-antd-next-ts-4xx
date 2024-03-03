import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {onGetDataTypes} from 'redux/actions/Categories';

const usePropertyFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [dataTypeOptions, setDataTypeOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [openPop, setOpenPop] = useState(false);

  const initSearchParams = {
    searchText: '',
    dataTypeCode: [],
    status: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    dataTypeCode: string[];
    status: string[];
  }>(initSearchParams);

  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        dataTypeCode: searchParams?.dataTypeCode,
        status: searchParams?.status,
      });
    }
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

  useEffect(() => {
    const fetchDataTypeOptions = async () => {
      const options: Array<{label: string; value: string}> = [
        {
          label: 'Tất cả',
          value: '',
        },
      ];
      const res: Array<any> = (await onGetDataTypes()) ?? [];
      res.map((item) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setDataTypeOptions(options);
    };
    fetchDataTypeOptions();
  }, []);

  const handleSearch = (e) => {
    const {searchText, dataTypeCode, status} = form.getFieldsValue();
    const allDataTypes = dataTypeOptions?.map((item: any) => item.value);
    const dataTypeValues = dataTypeCode
      ? !Array.from(dataTypeCode)?.includes('')
        ? dataTypeCode
        : allDataTypes
      : undefined;
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues = status
      ? !Array.from(status)?.includes('')
        ? status
        : allStatus
      : undefined;
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      dataTypeCode: dataTypeValues,
      status: statusValues,
    };
    setSearchParams({
      searchText: searchParams?.searchText,
      dataTypeCode: searchParams?.dataTypeCode,
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
    handleSearch,
    openPop,
    setOpenPop,
    searchParams,
    handleConfirmPop,
    handleCancelPop,
    dataTypeOptions,
    statusOptions,
  };
};
export default usePropertyFilter;
