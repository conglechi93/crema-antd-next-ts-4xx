import {debounce} from '@mui/material';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {useCallback, useEffect, useState} from 'react';
import {pageSize} from 'shared/constants/AppConst';
import {checkValidateForm} from 'utils/FormUtils';

const useAssignTags = (
  form: FormInstance,
  handleChangeModalInfo: (data: any) => void,
  currentTags?: Array<any>,
) => {
  const [tagsSearchParams, setTagsSearchParams] = useState<any>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });

  useEffect(() => {
    if (currentTags && currentTags.length > 0) {
      form.setFieldsValue({
        tags: currentTags.map((item: any) => item.code),
      });
    }
  }, [currentTags]);

  const handleFieldsChangeDebound = () => {
    const optionalFields = [];
    const isValid = checkValidateForm(form, optionalFields);
    handleChangeModalInfo({disabled: !isValid});
  };

  const handleFieldsChange = useCallback(
    debounce((e) => handleFieldsChangeDebound(), 200),
    [],
  );
  return {
    form,
    tagsSearchParams,
    setTagsSearchParams,
    handleFieldsChange,
  };
};
export default useAssignTags;
