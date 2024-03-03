import {Col, Form, Row} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onGetDataTypes} from 'redux/actions/Categories';
import {
  onCreateProperty,
  onGetPropertyDetailByCode,
  onUpdateProperty,
} from 'redux/actions/Property';
import {PropertyType, ActionType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';
import AppTitleLable from 'components/atoms/AppTitleLable';

const usePropertyModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
  const dispatch = useDispatch();
  const {record} = info;
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [popForm] = Form.useForm();
  const [modalDisabled, setModalDisabled] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{
    title: string;
    submitText: string;
    closeText: string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [currentType, setCurrentType] = useState<string>('');
  const [pickListCode, setPickListCode] = useState('');
  const [dataTypeOptions, setDataTypeOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const handleSetModalData = (type: string) => {
    const modalData = {
      [ActionType.ADD]: {
        title: messages['common.addProperty'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable
            title={'common.editProperty'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailProperty'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
      },
    };
    setModalData(modalData[type]);
  };

  const handleGetPropertyDetails = async (propertyCode: string) => {
    if (!propertyCode) return;
    const res: any = await dispatch(onGetPropertyDetailByCode(propertyCode));
    if (!res) return;
    const {
      name = '',
      description = '',
      configDataType = {},
      minLength,
      maxLength,
      isRequired = false,
      isNotDuplicate = false,
      configPickList = {},
      isMultiChoice = null,
      minValue,
      maxValue,
      isInteger = false,
    } = res;
    const {type} = info;
    if (type == ActionType.VIEW) {
      setPropertyDetails(res);
      return;
    }

    console.log('res', res);

    form.setFieldsValue({
      name,
      description,
      configDataType: configDataType.code,
    });
    setCurrentType(configDataType.code);
    switch (configDataType.code) {
      case PropertyType.TYPE_STR:
        popForm.setFieldsValue({
          minLength,
          maxLength,
          isRequired,
          isNotDuplicate,
        });
        break;
      case PropertyType.TYPE_LIST:
        popForm.setFieldsValue({
          configPickList: configPickList.code,
          isMultiChoice,
          isRequired,
        });
        setPickListCode(configPickList.code);
        break;
      case PropertyType.TYPE_DATE:
        popForm.setFieldsValue({
          isRequired,
        });
        break;
      case PropertyType.TYPE_NUM:
        popForm.setFieldsValue({
          isRequired,
          minValue,
          maxValue,
          isInteger,
        });
        break;
    }
  };

  useEffect(() => {
    const fetchDataTypeOptions = async () => {
      const res: Array<any> = (await onGetDataTypes()) ?? [];
      const dataTypeOptions: Array<any> = [];
      res?.map((item: any) => {
        dataTypeOptions.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setDataTypeOptions(dataTypeOptions);
    };
    fetchDataTypeOptions();
  }, []);

  useEffect(() => {
    if (info) {
      const {type, record} = info;
      handleSetModalData(type);
      const propertyCode = record?.code;
      handleGetPropertyDetails(propertyCode);
      if (type === ActionType.ADD) setModalDisabled(true);
    }
  }, [info]);

  const handleSubmit = async (): Promise<void> => {
    const {type, record} = info;
    const {name, configDataType, description} = form.getFieldsValue();

    const {action} = info;
    const {
      isRequired,
      minValue,
      maxValue,
      minLength,
      maxLength,
      isInteger,
      configPickList,
      isMultiChoice,
      isNotDuplicate,
    } = popForm.getFieldsValue();

    const params = {
      code: record?.code,
      name,
      configDataType: configDataType
        ? {
            code: configDataType,
          }
        : null,
      description,
      isRequired: isRequired ? true : false,
      minValue,
      maxValue,
      minLength,
      maxLength,
      isInteger: isInteger ? true : false,
      configPickList: configPickList
        ? {
            code: configPickList,
          }
        : null,
      isMultiChoice: isMultiChoice ? true : false,
      isNotDuplicate: isNotDuplicate ? true : false,
    };
    switch (type) {
      case ActionType.ADD: {
        const res: any = await dispatch(onCreateProperty(params));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.EDIT: {
        const res: any = await dispatch(onUpdateProperty(params));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.VIEW: {
        action();
        handleRemoveState();
        break;
      }
    }
  };
  const handleClose = (): void => {
    handleRemoveState();
    setIsOpen(false);
  };

  const handleRemoveState = (): void => {
    setCurrentType('');
    form.resetFields();
    popForm.resetFields();
  };

  const handleChangeDataType = (value: string): void => {
    setCurrentType(value);
    popForm.resetFields();
  };

  const handleGetOptionalFields = (type) => {
    const optionalFields = {
      [PropertyType.TYPE_STR]: ['isRequired', 'isNotDuplicate'],
      [PropertyType.TYPE_LIST]: ['isMultiChoice', 'isRequired'],
      [PropertyType.TYPE_NUM]: ['isInteger', 'isRequired'],
      [PropertyType.TYPE_DATE]: ['isRequired'],
    };
    return optionalFields[type] || [];
  };

  const handleFieldsChange = (): void => {
    const optionalFields = ['description'];
    const isValid = checkValidateForm(form, optionalFields);
    if (!isValid) {
      setModalDisabled(true);
      return;
    }
    const popOptionalFields = handleGetOptionalFields(currentType);
    const popIsValid = checkValidateForm(popForm, popOptionalFields);
    if (!popIsValid && popOptionalFields.length > 0) {
      setModalDisabled(true);
      return;
    }
    setModalDisabled(false);
  };
  return {
    form,
    popForm,
    dataTypeOptions,
    modalDisabled,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleChangeDataType,
    handleFieldsChange,
    currentType,
    pickListCode,
    setPickListCode,
    propertyDetails,
  };
};

export default usePropertyModal;
