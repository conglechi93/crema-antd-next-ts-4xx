import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {onGetJobTypes} from 'redux/actions/JobType';
import {dateTimeFormat, pageSize} from 'shared/constants/AppConst';
import dayjs from 'dayjs';

const useTaskFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [form] = Form.useForm();
  const [statusOptions, setStatusOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [assigneesSearchParams, setAssigneesSearchParams] = useState<any>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  const [openPop, setOpenPop] = useState(false);
  const initSearchParams = {
    searchText: '',
    assignees: [],
    priorities: [],
    jobTypes: [],
    fromDate: null,
    toDate: null,
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    assignees: any;
    priorities: any;
    jobTypes: any;
    fromDate: any;
    toDate: any;
  }>(initSearchParams);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      const {fromDate, toDate} = searchParams;
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        assignees: searchParams?.assignees,
        priorities: searchParams?.priorities ?? undefined,
        jobTypes: searchParams?.jobTypes ?? undefined,
        time:
          fromDate && toDate
            ? [
                dayjs(fromDate, dateTimeFormat[1]),
                dayjs(toDate, dateTimeFormat[1]),
              ]
            : undefined,
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
    const {searchText, assignees, priorities, jobTypes, time} =
      form.getFieldsValue();
    const searchParams = {
      page: 1,
      searchText: searchText,
      assignees: assignees,
      priorities: priorities,
      jobTypes: jobTypes,
      fromDate: time ? time[0].format(dateTimeFormat[1]) : '',
      toDate: time ? time[1].format(dateTimeFormat[1]) : '',
    };
    console.log(searchParams);
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

  // Get job type
  const [jobTypeOptions, setJobTypeOptions] = useState<any>([]);
  const [priorityOptions, setPriorityOptions] = useState<any>();
  const [jobTypeSearchParams, setJobTypeSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
  });
  useEffect(() => {
    const fetchPriorityOptions = async () => {
      const priorityStatusShopCat: Array<any> = [{label: 'Tất cả', value: ''}];
      categories?.priorityStatusShopCat?.map((item: any) =>
        priorityStatusShopCat.push({
          label: item?.name,
          value: item?.code,
        }),
      );
      setPriorityOptions(priorityStatusShopCat);
    };
    fetchPriorityOptions();

    const fetchJobTypesOptions = async () => {
      const res: any = await onGetJobTypes(jobTypeSearchParams);
      const optiopns: {label: string; value: string}[] = [];
      res?.elements?.map((item: any) => {
        optiopns.push({
          label: item.name,
          value: item.code,
        });
      });
      setJobTypeOptions(optiopns);
    };
    fetchJobTypesOptions();
  }, [jobTypeSearchParams, categories]);
  return {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,

    assigneesSearchParams,
    setAssigneesSearchParams,
    priorityOptions,
    jobTypeOptions,
  };
};
export default useTaskFilter;
