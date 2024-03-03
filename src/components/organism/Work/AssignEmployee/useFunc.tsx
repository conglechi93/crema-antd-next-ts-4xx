import { debounce } from 'lodash';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib';
import { useCallback, useState } from 'react';
import { pageSize } from 'shared/constants/AppConst';
import { checkValidateForm } from 'utils/FormUtils';

const useAssignStaffInCharge = (
  form: FormInstance,
  record: any,
  setModalInfo: (data: any) => void,
) => {
  const [employeeSearchParams, setEmployeeSearchParams] = useState<any>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    taskEmployeeType: '2',
    isLoadMore: true,
    taskCode: record?.code,
    projectCode: record?.project?.code ?? '',
  });

  const handleFieldsChangeDebound = () => {
    const optionalFields = [];
    const isValid = checkValidateForm(form, optionalFields);
    setModalInfo((pre) => ({
      ...pre,
      disabled: !isValid,
    }));
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
