import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {dateFormat} from 'shared/constants/AppConst';
import dayjs from 'dayjs';

const useEmployeeInfoDetailFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [typeOptions, setTypeOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [openPop, setOpenPop] = useState(false);

  const initSearchParams = {
    fromDate: '',
    toDate: '',
    types: [],
  };
  const [searchParams, setSearchParams] = useState<{
    fromDate: string;
    toDate: string;
    types: string[];
  }>(initSearchParams);

  useEffect(() => {
    if (categories) {
      const typeOptions: Array<{label: string; value: string}> = [
        {label: 'Tất cả', value: ''},
      ];
      categories?.employeeTypeLogShopCat?.map((item: any) => {
        typeOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setTypeOptions(typeOptions);
    }
  }, [categories]);

  useEffect(() => {
    if (openPop) {
      const {fromDate, toDate, types} = searchParams;
      form.setFieldsValue({
        // toDate: dayjs(toDate, 'HH:mm:ss DD/MM/YYYY'),
        time:
          fromDate && toDate
            ? [dayjs(fromDate, dateFormat[0]), dayjs(toDate, dateFormat[0])]
            : undefined,
        types: types && types.length ? types : undefined,
      });
    }
  }, [openPop]);

  const handleSearch = () => {
    const {searchText, time, types} = form.getFieldsValue();
    console.log(searchText, time, types);
    const searchParams = {
      page: 1,
      fromDate: time ? time[0].format(dateFormat) : '',
      toDate: time ? time[1].format(dateFormat) : '',
      types: types && !Array.from(types)?.includes('') ? types : '',
    };
    setSearchParams({
      fromDate: searchParams?.fromDate,
      toDate: searchParams?.toDate,
      types: searchParams?.types,
    });
    handleChangeSearchParams(searchParams, true);
    setOpenPop(false);
  };
  const handleConfirmPop = () => {
    handleSearch();
  };

  const handleCancelPop = () => {
    form.resetFields();
    // setSearchParams(initSearchParams);
  };
  return {
    form,
    typeOptions,
    openPop,
    setOpenPop,
    searchParams,
    handleConfirmPop,
    handleCancelPop,
  };
};
export default useEmployeeInfoDetailFilter;
