import {FormInstance} from 'antd/lib';
import {useEffect, useState} from 'react';
import {onGetDataTypes} from 'redux/actions/Categories';

const useChooseInventoryFilter = (
  form: FormInstance,
  handleChangeSearchParams: (params: any) => void,
) => {
  // Handle data type
  const [dataTypeOptions, setDataTypeOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchDataTypeOptions = async () => {
      const options: Array<{label: string; value: string}> = [
        {
          label: 'Tất cả',
          value: '',
        },
      ];
      const res: Array<any> = (await onGetDataTypes()) ?? [];
      res?.map((item) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setDataTypeOptions(options);
    };
    fetchDataTypeOptions();
  }, []);

  const handleSearch = () => {
    const {searchText, dataTypeCode} = form.getFieldsValue();
    handleChangeSearchParams({
      page: 1,
      searchText,
      dataTypeCode,
    });
  };

  const handleResetForm = () => {
    form.resetFields();
    handleChangeSearchParams({
      searchText: '',
      inventoryWarehouseCode: '',
    });
  };
  return {
    dataTypeOptions,
    setDataTypeOptions,
    handleSearch,
    handleResetForm,
  };
};
export default useChooseInventoryFilter;
