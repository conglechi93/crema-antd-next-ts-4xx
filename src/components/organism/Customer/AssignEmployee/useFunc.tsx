import {debounce} from '@mui/material';
import {FormInstance} from 'antd/lib';
import {useCallback, useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {checkValidateForm} from 'utils/FormUtils';

const useAssignStaffInCharge = (
  form: FormInstance,
  handleChangeModalInfo: (data: any) => void,
) => {
  const [employeeSearchParams, setEmployeeSearchParams] = useState<any>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    status: ['1'], // get active employee
    isLoadMore: true,
  });

  const handleFieldsChangeDebound = () => {
    const optionalFields = [];
    const isValid = checkValidateForm(form, optionalFields);
    handleChangeModalInfo({
      disabled: !isValid,
    });
  };

  const handleFieldsChange = useCallback(
    debounce((e) => handleFieldsChangeDebound(), 200),
    [],
  );
  return {
    form,
    employeeSearchParams,
    setEmployeeSearchParams,
    handleFieldsChange,
  };
};
export default useAssignStaffInCharge;
