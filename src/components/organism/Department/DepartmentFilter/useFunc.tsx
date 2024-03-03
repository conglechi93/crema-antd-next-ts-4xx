import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const useInventoryWarehouseFilter = (
  onSubmitForm: (params: any, resetRecord: boolean) => void,
) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const initSearchParams = {
    searchText: '',
  };
  const [searchParams, setSearchParams] = useState<{
    searchText: string;
  }>(initSearchParams);
  const [openPop, setOpenPop] = useState(false);

  useEffect(() => {
    if (openPop) {
      const {searchText} = searchParams;
      form.setFieldsValue({
        searchText: searchText ? searchText : '',
      });
    }
  }, [openPop]);

  const handleSearch = (e) => {
    const {searchText} = form.getFieldsValue();
    const searchParams = {
      searchText: searchText ? searchText : '',
      page: 1,
    };
    setSearchParams({
      searchText: searchParams?.searchText,
    });
    onSubmitForm(searchParams, true);
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
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
  };
};
export default useInventoryWarehouseFilter;
