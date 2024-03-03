import {debounce} from '@mui/material';
import {FormInstance} from 'antd';
import {useCallback} from 'react';
import {checkValidateForm} from 'utils/FormUtils';

const useJobTypesAddAndUpdate = (
  form: FormInstance,
  setModalInfo: (modalInfo: any) => void,
) => {
  const handleFieldsChangeDebound = () => {
    const optionalFields = ['description'];
    const isValid = checkValidateForm(form, optionalFields);
    setModalInfo((pre) => {
      return {
        ...pre,
        disabled: !isValid,
      };
    });
  };
  const handleFieldsChange = useCallback(
    debounce((e) => handleFieldsChangeDebound(), 100),
    [],
  );
  return {handleFieldsChange};
};

export default useJobTypesAddAndUpdate;
