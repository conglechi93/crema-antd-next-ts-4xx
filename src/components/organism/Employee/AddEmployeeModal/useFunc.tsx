import {Form} from 'antd';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetUserCMSByPhone, onInviteUser} from 'redux/actions/Employees';
const useEmployeeInfoModal = (
  info: any,
  isOpen: boolean,
  setIsOpen: (disabled: boolean) => void,
) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [listForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const handleSearch = async (e) => {
    setLoading(true);
    let phone;
    if (e) {
      const formData = form.getFieldsValue();
      phone = formData?.phone;
    } else {
      phone = '';
    }

    const res: any = await dispatch(onGetUserCMSByPhone(phone));
    const basicUserInfoDTO = res?.basicUserInfoDTO || null;
    const status = res?.status || null;
    const dataSource: any = res
      ? [
          {
            basicUserInfoDTO: basicUserInfoDTO,
            status: status,
          },
        ]
      : [];
    setDataSource(dataSource);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const {action} = info;
    const {employees} = listForm.getFieldsValue();
    console.log(employees);
    const ssoId = employees ? employees[0] : '';
    const res: any = await dispatch(onInviteUser(ssoId));
    if (res) {
      action();
      handeClose();
      handleRemoveState();
      setIsOpen(false);
    }
  };

  const handeClose = () => {
    handleRemoveState();
    // setIsOpen(false);
  };

  const handleRemoveState = () => {
    form.resetFields();
    listForm.resetFields();
    setDataSource([]);
  };

  const handleFieldsChange = () => {
    const {employees} = listForm.getFieldsValue();
    setDisabled(employees?.length == 0);
  };

  return {
    listForm,
    form,
    disabled,
    loading,
    dataSource,
    handleSearch,
    handleSubmit,
    handeClose,
    handleFieldsChange,
  };
};

export default useEmployeeInfoModal;
