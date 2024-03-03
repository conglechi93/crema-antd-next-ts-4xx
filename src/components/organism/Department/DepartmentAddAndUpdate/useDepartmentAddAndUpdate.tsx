import {FormInstance} from 'antd';
import {useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {checkValidateForm} from 'utils/FormUtils';

const useDepartmentAddAndUpdate = (
  form: FormInstance,
  setDisabled: (disabled: boolean) => void,
) => {
  const [employeeSearchParams, setEmployeeSearchParams] = useState<{
    page: number;
    pageSize: number;
    status?: string;
    isLoadMore: boolean;
  }>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    status: '1',
    isLoadMore: true,
  });

  const [positionSearchParams, setPositionSearchParams] = useState<{
    page: number;
    pageSize: number;
    isLoadMore: boolean;
  }>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  const optionalFields = ['description', 'employee', 'position'];
  const handleFieldsChange = () => {
    handleCheckFormData();
  };

  const handleCheckFormData = () => {
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);
  };
  return {
    handleFieldsChange,
    handleCheckFormData,
    employeeSearchParams,
    setEmployeeSearchParams,
    positionSearchParams,
    setPositionSearchParams,
  };
};
export default useDepartmentAddAndUpdate;
