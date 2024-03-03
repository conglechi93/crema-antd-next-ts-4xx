import {AppState} from '@auth0/auth0-react';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const useInventoryWarehouseDetailFilter = (
  handleChangeSearchParam: (values: any) => void,
) => {
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [openPop, setOpenPop] = useState(false);
  const [statusOptions, setStatusOptions] = useState<
    Array<{label: string; value: string}>
  >([]);
  const [form] = Form.useForm();
  const [popForm] = Form.useForm();

  useEffect(() => {
    if (categories) {
      const options: Array<{label: string; value: string}> = [];
      const inventoryStatusShopCat: Array<{label: string; value: string}> =
        categories.inventoryStatusShopCat;
      inventoryStatusShopCat.map((item: any) => {
        options.push({
          label: item.name,
          value: item.code,
        });
      });
      setStatusOptions(options);
    }
  }, [categories]);

  const handleSubmitForm = () => {
    const formData = form.getFieldsValue();
    const popFormData = popForm.getFieldsValue();
    const searchParam = {
      ...formData,
      ...popFormData,
      page: 1,
    };
    handleChangeSearchParam(searchParam);
    setOpenPop(false);
  };

  const handleCancelPop = () => {
    form.resetFields();
  };
  return {
    form,
    popForm,
    statusOptions,
    handleSubmitForm,
    openPop,
    setOpenPop,
    handleCancelPop,
  };
};
export default useInventoryWarehouseDetailFilter;
