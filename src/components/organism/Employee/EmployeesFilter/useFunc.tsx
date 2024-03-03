import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetDepartments} from 'redux/actions/Departments';
import {onGetRoles} from 'redux/actions/Roles';

const usePropertyFilter = (
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void,
) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [departmentOptions, setDepartmentOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [statusOptions, setStatusOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [roleOptions, setRoleOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [openPop, setOpenPop] = useState(false);

  const initSearchParams = {
    searchText: '',
    status: [],
    positions: [],
    departments: [],
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
    status: string[];
    positions: string[];
    departments: string[];
  }>(initSearchParams);

  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    if (openPop) {
      form.setFieldsValue({
        searchText: searchParams?.searchText,
        status: searchParams?.status,
        positions: searchParams?.positions,
        departments: searchParams?.departments,
      });
      setInitialValues({...searchParams});
    } else setInitialValues(null);
  }, [openPop]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      const options: Array<{label: string; value: string}> = [
        {
          label: 'Tất cả',
          value: '',
        },
      ];
      const status = categories?.employeeStatusShopCat ?? [];
      status.map((item) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setStatusOptions(options);
    };
    const fetchDepartmentOptions = async () => {
      const searchParams = {
        page: 1,
        pageSize: 50,
        searchText: '',
      };
      const options: Array<{label: string; value: string}> = [
        {
          label: 'Tất cả',
          value: '',
        },
      ];
      const res: any = await dispatch(onGetDepartments(searchParams));
      const elements = res?.elements || [];
      elements?.map((item) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setDepartmentOptions(options);
    };

    const fetchRoleOptions = async () => {
      const searchParams = {
        page: 1,
        pageSize: 50,
        searchText: '',
      };
      const options: Array<{label: string; value: string}> = [
        {
          label: 'Tất cả',
          value: '',
        },
      ];
      const res: any = await dispatch(onGetRoles(searchParams));
      const elements = res?.elements || [];
      elements?.map((item) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setRoleOptions(options);
    };
    fetchRoleOptions();
    fetchStatusOptions();
    fetchDepartmentOptions();
  }, []);

  const handleSearch = (e) => {
    const {searchText, status, positions, departments} = form.getFieldsValue();
    const allStatus = statusOptions?.map((item: any) => item.value);
    const statusValues = status
      ? !Array.from(status)?.includes('')
        ? status
        : allStatus
      : undefined;
    const allPositions = roleOptions?.map((item: any) => item.value);
    const positionsValues = positions
      ? !Array.from(positions)?.includes('')
        ? positions
        : allPositions
      : undefined;
    const allDepartments = departmentOptions?.map((item: any) => item.value);
    const departmentsValues = departments
      ? !Array.from(departments)?.includes('')
        ? departments
        : allDepartments
      : undefined;
    const searchParams = {
      page: 1,
      searchText: searchText ? searchText : '',
      status: statusValues,
      positions: positionsValues,
      departments: departmentsValues,
    };
    setSearchParams({
      searchText: searchText ? searchText : '',
      status: statusValues,
      positions: positions,
      departments: departments,
    });
    handleChangeSearchParams(searchParams, true);
    setOpenPop(false);
  };
  const handleConfirmPop = (e) => {
    handleSearch(e);
  };

  const handleCancelPop = () => {
    form.resetFields();
  };
  return {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    roleOptions,
    statusOptions,
    departmentOptions,
  };
};
export default usePropertyFilter;
