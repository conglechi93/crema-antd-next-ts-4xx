import {Form} from 'antd';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onCreateRole, onUpdateRole} from 'redux/actions/Roles';
import {PropertyType, ActionType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';

const usePropertyModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
  const dispatch = useDispatch();
  const {record} = info;
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    title: string;
    submitText: string;
    closeText: string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });

  const handleSetModalData = (type: string) => {
    const modalData = {
      [ActionType.ADD]: {
        title: messages['common.addRole'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable title={'common.editRole'} recordTitle={record?.code} />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailRole'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
      },
    };
    setModalData(modalData[type]);
  };

  const handleSetValueForm = (record: any) => {
    if (!record) return;
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
  };

  useEffect(() => {
    if (info) {
      const {draftString, type, record, action} = info;
      handleSetModalData(type);
      handleSetValueForm(record);
    }
  }, [info]);

  const handleSubmit = async (): Promise<void> => {
    const {type, record, action} = info;
    switch (type) {
      case ActionType.ADD: {
        const {name, description} = form.getFieldsValue();
        const payload = {
          name,
          description,
        };
        const res: any = await dispatch(onCreateRole(payload));
        if (res) {
          action();
          handleRemoveState();
          setIsOpen(false);
        }
        break;
      }
      case ActionType.EDIT: {
        const {name, description} = form.getFieldsValue();
        const code = record.code;
        const payload = {
          code,
          name,
          description,
        };
        const res: any = await dispatch(onUpdateRole(payload));
        if (res) {
          action();
          handleRemoveState();
          setIsOpen(false);
        }
        break;
      }
      case ActionType.VIEW: {
        handleClose();
        break;
      }
    }
  };
  const handleClose = (): void => {
    handleRemoveState();
    setIsOpen(false);
  };

  const handleRemoveState = (): void => {
    form.resetFields();
  };
  const optionalFields = ['description'];
  const handleFieldsChange = () => {
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);
  };

  return {
    form,
    disabled,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleFieldsChange,
  };
};

export default usePropertyModal;
