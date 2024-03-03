import {debounce} from '@mui/material';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onCreateCustomer,
  onGetCustomerDetailByCode,
  onUpdateCustomer,
} from 'redux/actions/Customer';
import {onGetFormDetail} from 'redux/actions/Form';
import {dateTimeFormat} from 'shared/constants/AppConst';
import {ActionType, PropertyType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';
import {loadState, removeState, saveState} from 'utils/LocalStore';
import dayjs from 'dayjs';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {createImageJson} from 'utils/FileHelper';

const usePropertyModal = (
  info: any,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const {type} = info;
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [form] = Form.useForm();

  const [propertyList, setPropertyList] = useState<
    Array<{
      code: string;
      name: string;
      label: string;
      id: string;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [thumbnailAvatar, setThumbnailAvatar] = useState<any>(null);
  const [fileList, setFileList] = useState<any>([]);
  const [modalData, setModalData] = useState<{
    title: string;
    submitText: string;
    closeText: string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });

  const [selectFields, setSelectFields] = useState<Array<string>>([]);
  const [optionalFields, setOptionalFields] = useState<Array<string>>([]);

  const [provinceInfo, setProvinceInfo] = useState<{
    code: string;
    formCode: string;
  }>({
    code: '',
    formCode: '',
  });

  const [districtInfo, setDistrictInfo] = useState<{
    code: string;
    formCode: string;
  }>({
    code: '',
    formCode: '',
  });

  const [wardInfo, setWardInfo] = useState<{
    code: string;
    formCode: string;
  }>({
    code: '',
    formCode: '',
  });

  const handleSetModalData = (type: string) => {
    const modalData = {
      [ActionType.ADD]: {
        title: messages['common.addCustomer'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable
            title={'common.editCustomer'}
            recordTitle={info?.record?.code}
          />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailCustomer'}
            recordTitle={info?.record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
      },
    };
    setModalData(modalData[type]);
  };

  const handleSetFormData = (dataItems: Array<{key: string; value: any}>) => {
    const {draftString} = info;
    let dataDraft = {...loadState(draftString)};
    let submitFormData = dataDraft?.submitFormData || {};
    dataItems?.forEach((item) => {
      submitFormData = {
        ...submitFormData,
        [item.key]: item.value,
      };
    });
    dataDraft = {
      ...dataDraft,
      submitFormData: submitFormData,
    };
    saveState(draftString, dataDraft);
  };

  const handleRenderFormItem = async (isFisrtRender: boolean) => {
    const formCode = 'BM2';
    const forArea = false;
    const res: any = await dispatch(onGetFormDetail(formCode, forArea));
    let configProperties: Array<any> = res?.configProperties || [];
    configProperties = configProperties.filter(
      (item: any) => !item.isInvisible,
    );
    const optionalFields: any = [
      'avatar',
      'customerGroup',
      'customerSource',
      'tags',
      'staffInCharges',
      'description',
      'fileAttachments',
    ];
    const optionalList: any = [];
    const selectList: any = [];
    let data: any = {};
    configProperties?.map((item: any) => {
      const isList =
        item?.configPickList && Object.keys(item?.configPickList).length > 0;
      const isRequire = item?.isRequired;
      if (!isRequire) {
        optionalList.push(item.code);
      }
      let valueForInput = '';
      let valueForPickList = [];
      if (isList) {
        selectList.push(item.code);
      }
      // Set Form Data
      const propertyJS: any = {
        [item.code]: {
          code: item?.code,
          value: isList ? valueForPickList : valueForInput,
          pickListCode: isList ? item?.configPickList?.code : null,
          type: item?.configDataType?.code ?? '',
          isMultiChoice: item?.isMultiChoice ? true : false,
        },
      };
      data = {...data, ...propertyJS};
    });
    setPropertyList(configProperties);
    if (isFisrtRender) {
      handleSetFormData([
        {
          key: 'propertyList',
          value: data,
        },
      ]);
    }
    setOptionalFields([...optionalFields, ...optionalList]);
    setSelectFields([...selectFields, ...selectList]);
  };

  const getFieldsValueFromType = (
    fieldsValue: any,
    type: any,
    propertyCode: any,
  ) => {
    switch (type) {
      case PropertyType.TYPE_STR:
        return fieldsValue || '';
      case PropertyType.TYPE_NUM:
        return fieldsValue;
      case PropertyType.TYPE_LIST:
        const fieldsValueArr: Array<any> = fieldsValue;
        return fieldsValueArr && fieldsValueArr.length > 0
          ? fieldsValueArr?.map((item: any) => item.code)
          : null;
      case PropertyType.TYPE_PROVINCE:
        setProvinceInfo({
          formCode: propertyCode,
          code: fieldsValue,
        });
        return fieldsValue ?? null;
      case PropertyType.TYPE_DISTRICT:
        setDistrictInfo({
          formCode: propertyCode,
          code: fieldsValue,
        });
        return fieldsValue ?? null;
      case PropertyType.TYPE_WARDS:
        setWardInfo({
          formCode: propertyCode,
          code: fieldsValue,
        });
        return fieldsValue ?? undefined;
      case PropertyType.TYPE_DATE:
        return fieldsValue ? dayjs(fieldsValue, dateTimeFormat[0]) : undefined;
      default:
        return undefined;
    }
  };
  const handleFetchCustomerDetail = async (code: string) => {
    const res: any = await dispatch(onGetCustomerDetailByCode(code));
    console.log('res', res);

    const tagsOptions: Array<any> = res?.tags ?? [];
    let formData: Array<any> = [];

    if (res) {
      const customerSource = res?.customerSource;
      const customerGroup = res?.customerGroup;
      const tags = tagsOptions
        ? tagsOptions?.map((item: any) => item?.code)
        : undefined;
      const status = res?.status ? res?.status?.code : undefined;
      const staffInCharges: Array<any> = res?.staffInCharges ?? [];
      form.setFieldsValue({
        name: res?.name,
        phone: res?.phone,
        customerGroup: customerGroup ? customerGroup?.code : undefined,
        customerSource: customerSource ? customerSource?.code : undefined,
        tags: tags,
        status: status,
        description: res?.description,
        staffInCharges: staffInCharges.map((item: any) => item?.code),
      });
      setThumbnailAvatar(res?.avatar);
      let newFileAttachments: Array<any> = [];
      if (type === ActionType.EDIT) {
        const fileAttachment: Array<any> = res?.fileAttachments ?? [];
        fileAttachment?.map((item: any) => {
          const {id, url, fileName, extension, type} = item;
          newFileAttachments?.push(
            createImageJson(id, url, fileName, extension, type),
          );
        });
        setFileList(newFileAttachments);
      }

      formData = [
        ...formData,
        {
          key: 'avatar',
          value: res?.avatar ? [res?.avatar?.id] : null,
        },
        {
          key: 'fileAttachments',
          value: newFileAttachments,
        },
        {
          key: 'name',
          value: res?.name ?? '',
        },
        {
          key: 'phone',
          value: res?.phone ?? '',
        },
        {
          key: 'customerGroup',
          value: customerGroup ? customerGroup?.code : '',
        },
        {
          key: 'customerSource',
          value: customerSource ? customerSource?.code : '',
        },
        {
          key: 'tags',
          value: tags,
        },
        {
          key: 'status',
          value: status,
        },
        {
          key: 'description',
          value: res?.description,
        },
      ];
    }
    const customerDetails: Array<any> = res?.customerDetails;
    let data;
    customerDetails.map((item: any) => {
      const configProperty = item?.configProperty;
      const value = item?.value;
      const propertyCode = configProperty?.code;
      const type = configProperty?.configDataType?.code;
      const fieldsValue = getFieldsValueFromType(value, type, propertyCode);
      const propertyJS: any = {
        [item?.configProperty?.code]: {
          code: propertyCode,
          value: value,
          pickListCode: item?.configProperty?.configPickList
            ? item?.configProperty?.configPickList?.code
            : null,
          isMultiChoice: item?.isMultiChoice ? true : false,
        },
      };
      data = {...data, ...propertyJS};
      form.setFieldsValue({
        [item?.configProperty?.code]: fieldsValue ? fieldsValue : undefined,
      });
    });

    formData = [
      ...formData,
      {
        key: 'propertyList',
        value: data,
      },
    ];
    handleSetFormData(formData);
  };

  useEffect(() => {
    if (info && isOpen) {
      const {draftString, type, record, action} = info;
      handleSetModalData(type);
      const dataSource = loadState(draftString);
      const submitFormData = dataSource?.submitFormData || {};
      const isFisrtRender = Object.keys(submitFormData).length === 0;
      handleRenderFormItem(isFisrtRender);
      setDisabled(type === ActionType.ADD);
      const code = record?.code;
      if (type == ActionType.EDIT) {
        handleFetchCustomerDetail(code);
      } else {
        // handleSetValueByDraftData(submitFormData);
      }
    }
  }, [info, isOpen]);

  const handleSubmit = async (): Promise<void> => {
    const {draftString, type, record} = info;
    setLoading(true);
    let res: any = null;
    switch (type) {
      case ActionType.ADD:
        res = await dispatch(onCreateCustomer(loadState(draftString)));
        break;
      case ActionType.EDIT:
        const payload = {
          customerCode: record.code,
          ...loadState(draftString),
        };

        res = await dispatch(onUpdateCustomer(payload));
        break;
      case ActionType.VIEW:
        setIsOpen(false);

        break;
      default:
        break;
    }
    setLoading(false);
    if (res) {
      handleClose();
      info.action();
    }
    return;
  };
  const handleClose = (): void => {
    setIsOpen(false);
    handleRemoveState();
  };

  const handleRemoveState = (): void => {
    form.resetFields();
    const {draftString} = info;
    removeState([draftString]);
    setThumbnailAvatar(null);
    setFileList([]);
  };

  const getFieldsValueFormItem = (
    property: any,
    value: any,
    form: FormInstance,
  ) => {
    const configDataTypeCode = property?.configDataType?.code;
    switch (configDataTypeCode) {
      case PropertyType.TYPE_PROVINCE: {
        setProvinceInfo((prevState) => ({
          ...prevState,
          code: value,
        }));
        const districtCode = districtInfo.formCode;
        const wardCode = wardInfo.formCode;
        form.setFieldsValue({
          [districtCode]: null,
          [wardCode]: null,
        });
        return value;
      }
      case PropertyType.TYPE_DISTRICT: {
        setDistrictInfo((prevState) => ({
          ...prevState,
          code: value,
        }));
        const {formCode} = wardInfo;
        form.setFieldsValue({
          [formCode]: null,
        });
        return value;
      }
      case PropertyType.TYPE_WARDS: {
        setWardInfo((prevState) => ({
          ...prevState,
          code: value,
        }));
        return value;
      }
      case PropertyType.TYPE_DATE: {
        return value ? value.format(dateTimeFormat[0]) : undefined;
      }
      case PropertyType.TYPE_LIST: {
        const isMultiChoice = property?.isMultiChoice;
        let selectValue;
        if (isMultiChoice) {
          selectValue = value?.map((item: any) => {
            return {
              code: item,
            };
          });
        } else {
          selectValue = value
            ? [
                {
                  code: value,
                },
              ]
            : [];
        }
        return selectValue || [];
      }
      default:
        return value;
    }
  };

  const handleFieldsChangeDebound = (e: any) => {
    const fieldInfo = e[0];
    const {name, value} = fieldInfo;
    const property: any = propertyList.find((item) => item.code === name[0]);
    const configDataType = property?.configDataType;
    let data: any;
    if (property) {
      const {draftString} = info;
      const source = loadState(draftString);
      const propertyList: any = source?.submitFormData?.propertyList || [];
      const fieldsValue = getFieldsValueFormItem(property, value, form);
      const propertyJS: any = {
        [property.code]: {
          code: property?.code,
          value: fieldsValue,
          pickListCode: property.configPickList
            ? property.configPickList?.code
            : null,
          type: configDataType?.code ?? '',
          isMultiChoice: property?.isMultiChoice,
        },
      };
      data = [
        {
          key: 'propertyList',
          value: {
            ...propertyList,
            ...propertyJS,
          },
        },
      ];
    } else {
      data = [
        {
          key: name[0],
          value: selectFields.includes(name[0])
            ? {
                key: name[0],
                value: value,
              }
            : value,
          id: property?.id,
        },
      ];
    }
    handleSetFormData(data);
    handleCheckFormData();
  };
  const handleFieldsChange = useCallback(
    debounce((e) => handleFieldsChangeDebound(e), 200),
    [optionalFields, propertyList],
  );

  const handleCheckFormData = () => {
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);
  };
  // const handleCheckFormData = useCallback(
  //   debounce(() => handleCheckFormDataDebounce(), 200),
  //   [optionalFields],
  // );

  return {
    form,
    disabled,
    loading,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleFieldsChange,
    provinceInfo,
    districtInfo,
    wardInfo,
    setProvinceInfo,
    setDistrictInfo,
    setWardInfo,
    propertyList,
    handleSetFormData,

    thumbnailAvatar,
    setThumbnailAvatar,
    fileList,
    setFileList,
  };
};

export default usePropertyModal;
