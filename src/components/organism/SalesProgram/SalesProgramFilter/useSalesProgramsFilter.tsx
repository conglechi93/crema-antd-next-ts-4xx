import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {dateFormat} from 'shared/constants/AppConst';
import dayjs from 'dayjs';

const useSalesProgramsFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [statusOptions, statusCartOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [openPop, setOpenPop] = useState(false);

  const initSearchParams = {
    searchText: '',
    fromDate: '',
    toDate: '',
    status: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    fromDate: string;
    toDate: string;
    status: string[];
  }>(initSearchParams);

  useEffect(() => {
    if (categories) {
      const statusOptions: Array<{label: string; value: string}> = [
        {label: 'Tất cả', value: ''},
      ];
      categories?.salesProgramStatusShopCat?.map((item: any) => {
        statusOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      statusCartOptions(statusOptions);
    }
  }, [categories]);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      const {searchText, fromDate, toDate, status} = searchParams;
      form.setFieldsValue({
        searchText: searchText ? searchText : '',
        time:
          fromDate && toDate
            ? [dayjs(fromDate, dateFormat[0]), dayjs(toDate, dateFormat[0])]
            : undefined,
        status: status && status.length ? status : undefined,
      });
      setInitialValues(searchParams);
    } else setInitialValues(null);
  }, [openPop]);

  const handleSearch = (e: any) => {
    const {searchText, time, status} = form.getFieldsValue();
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues =
      status && !Array.from(status)?.includes('') ? status : allStatus;
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      fromDate: time ? time[0].format(dateFormat) : '',
      toDate: time ? time[1].format(dateFormat) : '',
      status: statusValues,
    };
    setSearchParams(searchParams);
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
    statusOptions,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
  };
};
export default useSalesProgramsFilter;
