import { AppState } from '@auth0/auth0-react';
import { debounce } from 'lodash';
import { FormInstance } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkValidateForm } from 'utils/FormUtils';

const useUpdateCustomerStatus = (
  form: FormInstance,
  setModalInfo: (data: any) => void,
) => {
  const { categories } = useSelector<AppState, AppState['category']>(
    ({ category }) => category,
  );
  const [statusOptions, setStatusOptions] = useState<Array<any>>([]);

  useEffect(() => {
    if (categories) {
      const options: any = categories?.customerStatusShopCat;
      const statusOptions: any = [];
      options?.map((item: { name: string; code: string }) => {
        statusOptions.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(statusOptions);
    }
  }, [categories]);

  const handleFieldsChangeDebound = () => {
    const optionalFields = [];
    const isValid = checkValidateForm(form, optionalFields);
    setModalInfo((pre) => {
      return {
        ...pre,
        disabled: !isValid,
      };
    });
  };

  const handleFieldsChange = useCallback(
    debounce((e) => handleFieldsChangeDebound(), 200),
    [],
  );
  return {
    form,
    statusOptions,
    handleFieldsChange,
  };
};
export default useUpdateCustomerStatus;
