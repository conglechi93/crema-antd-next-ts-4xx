import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onCreateDepartment,
  onGetDepartmentDetail,
  onUpdateDepartment,
} from 'redux/actions/Departments';
import {ActionType} from 'shared/constants/AppVariables';
import {removeState} from 'utils/LocalStore';

const useFunc = (
  info: any,
  setDisabled: (disabled: boolean) => void,
  isOpen: boolean,
  setIsOpen: (disabled: boolean) => void,
) => {
  const {type, draftString, action} = info;
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: React.ReactDOM | string;
    submitText: React.ReactDOM | string;
    closeText: React.ReactDOM | string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });
  const [recordDetail, setRecordDetail] = useState<any>();

  const handleSetModalData = (type: string) => {
    const modalConfig = {
      [ActionType.VIEW]: {
        title: messages['common.viewDepartment'] as string,
        submitText: messages['common.close'] as string,
        closeText: '',
      },
      [ActionType.ADD]: {
        title: messages['common.addDepartment'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: messages['common.editDepartment'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
    };
    setModalConfig(modalConfig[type]);
  };

  const handleSetFormData = async (record: any) => {
    const code = record?.code;
    setContentLoading(true);
    const res: any = await dispatch(onGetDepartmentDetail(code));
    const {name, description, managerWorkSpace} = res;
    const employee = managerWorkSpace?.employee;
    const position = managerWorkSpace?.position;
    setRecordDetail(res);
    form.setFieldsValue({
      name: name,
      description: description,
      employee: employee?.code ?? undefined,
      position: position?.code ?? undefined,
    });
    setContentLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      const {type, record} = info;
      handleSetModalData(type);
      if (type != ActionType.ADD) {
        handleSetFormData(record);
      }
      if (type == ActionType.ADD) {
        setDisabled(true);
      }
    }
  }, [info, isOpen]);

  const handleSubmit = async () => {
    switch (type) {
      case ActionType.VIEW: {
        handleRemoveState();
        action();
        break;
      }
      case ActionType.ADD: {
        setLoading(true);
        const {name, description, employee, position} = form.getFieldsValue();
        const payload = {
          name,
          description,
          employee,
          position,
        };
        const res: any = await dispatch(onCreateDepartment(payload));
        if (res) {
          handleRemoveState();
          action();
        }
        setLoading(false);
        break;
      }
      case ActionType.EDIT: {
        setLoading(true);
        const {record} = info;
        const {name, description, employee, position} = form.getFieldsValue();
        const code = record?.code;
        const payload = {
          code,
          name,
          description,
          employee,
          position,
        };
        const res: any = await dispatch(onUpdateDepartment(payload));
        if (res) {
          handleRemoveState();
          action();
        }
        setLoading(false);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleRemoveState = async (): Promise<void> => {
    removeState([draftString]);
    await form.resetFields();
  };
  const handleClose = async () => {
    handleRemoveState();
    setIsOpen(false);
  };

  return {
    loading,
    form,
    handleSubmit,
    handleClose,
    modalConfig,
    handleRemoveState,
    contentLoading,
    recordDetail,
  };
};

export default useFunc;
