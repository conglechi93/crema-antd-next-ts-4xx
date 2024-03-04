import { loadState } from 'utils/LocalStore';
import { checkValidateForm } from 'utils/FormUtils';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { onGetFormDetail } from 'redux/actions/Form';
import { useDispatch } from 'react-redux';
import { ActionType, PropertyType } from 'shared/constants/AppVariables';
import { onGetInventoryDetailByCode } from 'redux/actions/Inventory';
import { createImageJson } from 'utils/FileHelper';
import dayjs from 'dayjs';
import { dateTimeFormat } from 'shared/constants/AppConst';
import { onGetDistricts, onGetWards } from 'redux/actions/Categories';

const useStep1 = (
  info: any,
  form: FormInstance,
  setDisabled: (value: boolean) => void,
  handleSetFormData: (dataItems: Array<{ key: string; value: any }>) => void,
) => {
  const dispatch = useDispatch();
  const [editorValue, setEditorValue] = useState();
  const [selectFields, setSelectFields] = useState<Array<string>>([]);
  const [optionalFields, setOptionalFields] = useState<Array<string>>([]);
  const [propertyList, setPropertyList] = useState<
    Array<{
      code: string;
      name: string;
      label: string;
      id: string;
    }>
  >([]);

  const [districtOptions, setDistrictOptions] =
    useState<{ label: string; value: string }[]>();

  const [wardOptions, setWardOptions] =
    useState<{ label: string; value: string }[]>();

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

  const handleRenderFormItem = async (
    formCode: string,
    isFisrtRender: boolean,
  ) => {
    if (!formCode) return;
    const res: any = await dispatch(onGetFormDetail(formCode));
    let configProperties: Array<any> = res?.configProperties || [];
    configProperties = configProperties.filter(
      (item: any) => !item.isInvisible,
    );
    const optionalList: any = [];
    const selectList: any = [];
    let data: any = {};
    const provinceInfo = configProperties.filter(
      (item: any) => item.configDataType.code1 == PropertyType.TYPE_PROVINCE,
    );
    setProvince(provinceInfo[0]?.code);
    const districtInfo = configProperties.filter(
      (item: any) => item.configDataType.code1 == PropertyType.TYPE_DISTRICT,
    );
    setDistrict(districtInfo[0]?.code);

    const wardInfo = configProperties.filter(
      (item: any) => item.configDataType.code1 == PropertyType.TYPE_WARDS,
    );
    setWard(wardInfo[0]?.code);

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
      data = { ...data, ...propertyJS };
    });
    if (isFisrtRender) {
      handleSetFormData([
        {
          key: 'propertyList',
          value: data,
        },
      ]);
    }
    setPropertyList(configProperties);
    setOptionalFields([...optionalFields, ...optionalList]);
    setSelectFields([...selectFields, ...selectList]);
    handleCheckFormData();
  };

  const handleFetchInventoryDetail = async (inventoryCode: string) => {
    const res: any = await dispatch(
      onGetInventoryDetailByCode(inventoryCode, false),
    );
    if (res) {
      let data: any = {};
      form.setFieldsValue({
        name: res?.name,
      });
      setEditorValue(res?.description || '');
      const fileAttachments: Array<any> = [];
      const files: Array<any> = res?.fileAttachments ?? [];
      files.map((item: any) => {
        const { id, fileName, type, mimeType, url, extention } = item;
        const typeUpload = type;
        const newFile = createImageJson(
          id,
          url,
          fileName,
          extention,
          typeUpload,
        );
        fileAttachments.push(newFile);
      });
      const inventoryDetails: Array<any> = res?.inventoryDetails;

      let provinceCode;
      let districtCode;
      inventoryDetails.map((item: any) => {
        const configProperty = item?.configProperty;
        const value = item?.value;
        const propertyCode = configProperty?.code;
        const type = configProperty?.configDataType?.code;
        const fieldsValue = getFieldsValueFromType(value, type);

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
        data = { ...data, ...propertyJS };
        form.setFieldsValue({
          [item?.configProperty?.code]: fieldsValue ? fieldsValue : undefined,
        });
        switch (type) {
          case PropertyType.TYPE_PROVINCE:
            provinceCode = fieldsValue;
            handleGetAddressAPI(provinceCode);
            break;
          case PropertyType.TYPE_DISTRICT:
            districtCode = fieldsValue;
            handleGetAddressAPI(provinceCode, districtCode);
            break;
          default:
            break;
        }
      });
      handleSetFormData([
        {
          key: 'propertyList',
          value: data,
        },
        {
          key: 'name',
          value: res.name,
        },
        {
          key: 'description',
          value: res.description,
        },
        {
          key: 'fileAttachments',
          value: fileAttachments,
        },
        {
          key: 'videoUrl',
          value: res?.videoUrl,
        },
      ]);
      setDisabled(false);
    }
  };

  const getFieldsValueFromType = (fieldsValue: any, type: any) => {
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
        return fieldsValue ?? null;
      case PropertyType.TYPE_DISTRICT:
        return fieldsValue ?? null;
      case PropertyType.TYPE_WARDS:
        return fieldsValue ?? undefined;
      case PropertyType.TYPE_DATE:
        return fieldsValue ? dayjs(fieldsValue, dateTimeFormat[0]) : undefined;
      default:
        return undefined;
    }
  };

  const handleSetValueByDraftData = (dataSource: any) => {
    if (Object.keys(dataSource).length === 0) return;
    form.setFieldsValue({
      name: dataSource.name,
    });
    setEditorValue(dataSource.description || '');
    const propertyList: any = dataSource?.propertyList || {};
    let provinceCode;
    let districtCode;
    for (const [key, value] of Object.entries(propertyList)) {
      const propertyInfo: any = value;
      const propertyType = propertyInfo?.type;
      const fieldsValue = getFieldsValueFromType(
        propertyInfo?.value,
        propertyType,
      );
      form.setFieldsValue({
        [key]: fieldsValue ? fieldsValue : undefined,
      });
      switch (propertyType) {
        case PropertyType.TYPE_PROVINCE:
          provinceCode = fieldsValue;
          handleGetAddressAPI(provinceCode);
          break;
        case PropertyType.TYPE_DISTRICT:
          districtCode = fieldsValue;
          handleGetAddressAPI(provinceCode, districtCode);
          break;
        default:
          break;
      }
    }
  };

  const handleGetAddressAPI = async (
    provinceCode: string,
    districtCode?: string,
  ) => {
    if (districtCode && provinceCode) {
      const res: any = await onGetWards(districtCode, provinceCode);
      setWardOptions(
        res?.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          };
        }),
      );
      return;
    }
    if (provinceCode) {
      const res: any = await onGetDistricts(provinceCode);
      setDistrictOptions(
        res?.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          };
        }),
      );
    }
  };

  useEffect(() => {
    const { draftString, type } = info;
    if (draftString && type) {
      const dataSource = loadState(draftString);
      const formCode = dataSource?.form ? dataSource?.form.code : '';
      const submitFormData = dataSource?.submitFormData || {};
      const inventoryCode = dataSource?.inventoryCode;
      const isFisrtRender =
        Object.keys(submitFormData).length === 0 && !inventoryCode;
      handleRenderFormItem(formCode, isFisrtRender);
      if (type == ActionType.ADD) {
        handleSetValueByDraftData(submitFormData);
      } else {
        handleFetchInventoryDetail(inventoryCode);
      }
    }
  }, [info]);

  const handleCheckFormData = () => {
    const isValidForm: boolean = checkValidateForm(form, optionalFields);
    setDisabled(!isValidForm);
  };

  const getFieldsValueFormItem = async (
    property: any,
    value: any,
    form: FormInstance,
  ) => {
    const configDataTypeCode = property?.configDataType?.code;
    const propertyCode = property?.code;
    switch (configDataTypeCode) {
      case PropertyType.TYPE_PROVINCE: {
        const formData = form.getFieldsValue();
        const provinceCode = formData[province];
        form.setFieldsValue({
          [propertyCode]: value,
          [district]: null,
          [ward]: null,
        });
        setWardOptions([]);
        handleGetAddressAPI(provinceCode);
        return value;
      }
      case PropertyType.TYPE_DISTRICT: {
        const formData = form.getFieldsValue();
        const provinceCode = formData[province];
        const districtCode = formData[district];
        form.setFieldsValue({
          [propertyCode]: value,
          [ward]: null,
        });
        handleGetAddressAPI(provinceCode, districtCode);
        return value;
      }
      case PropertyType.TYPE_WARDS: {
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

  const handleChangeFormData = async (e: any) => {
    const fieldInfo = e[0];
    const { name, value } = fieldInfo;
    const property: any = propertyList.find((item) => item.code === name[0]);
    const configDataType = property?.configDataType;
    let data: any;
    if (property) {
      const { draftString } = info;
      const source = loadState(draftString);
      const propertyList: any = source?.submitFormData?.propertyList || [];
      const fieldsValue = await getFieldsValueFormItem(property, value, form);
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

  return {
    propertyList,
    handleChangeFormData,
    editorValue,
    setEditorValue,
    districtOptions,
    wardOptions,
  };
};

export default useStep1;
