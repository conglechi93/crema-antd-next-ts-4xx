import AppFormItem from 'components/atoms/AppFormItem';
import {memo, useEffect, useState} from 'react';
import {Col, DatePicker} from 'antd';
import AppInput from 'components/atoms/AppInput';
import AppAsyncSelect from 'components/atoms/AppAsyncSelect';
import {convertInputToNumber} from 'utils/FormUtils';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {onGetDistricts, onGetWards} from 'redux/actions/Categories';
import AppProvinceSelect from 'components/atoms/AppProvinceSelect';
import AppDistrictSelect from 'components/atoms/AppDistrictSelect';
import AppWardSelect from 'components/atoms/AppWardSelect';
import {dateTimeFormat} from 'shared/constants/AppConst';
import AppSelect from 'components/atoms/AppSelect';

type PropsTypes = {
  dataSource: Array<any>;
  provinceInfo: {code: string; formCode: string};
  setProvinceInfo: (value: any) => void;
  districtInfo: {code: string; formCode: string};
  setDistrictInfo: (value: any) => void;
  wardInfo: {code: string; formCode: string};
  setWardInfo: (value: any) => void;
  responsiveCol: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
};

export enum TYPE_COMPONENT {
  INPUT_STR = 1,
  SELECT = 2,
  INPUT_NUM = 3,
  DATE = 4,
  INPUT_PHONE = 5,
  INPUT_MONEY = 6,
  INPUT_PROVINCE = 7,
  INPUT_DISTRICT = 8,
  INPUT_WARD = 9,
}

const RenderAtorms = (props: PropsTypes) => {
  const {
    dataSource,
    provinceInfo,
    setProvinceInfo,
    districtInfo,
    setDistrictInfo,
    wardInfo,
    setWardInfo,
    responsiveCol,
  } = props;
  const [districtOptions, setDistrictOptions] = useState<
    {label: string; value: string}[]
  >([]);
  const [wardOptions, setWardOptions] = useState<
    {label: string; value: string}[]
  >([]);

  useEffect(() => {
    if (!provinceInfo.code) {
      setWardOptions([]);
      setDistrictOptions([]);
      return;
    }
    const fetchDistrictsOption = async () => {
      const res: Array<any> = await onGetDistricts(provinceInfo.code);
      setDistrictOptions(
        res?.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          };
        }),
      );
    };
    fetchDistrictsOption();
  }, [provinceInfo]);

  useEffect(() => {
    if (!districtInfo.code || !provinceInfo.code) {
      // setWardOptions([]);
      return;
    }
    const fetchWardOptions = async () => {
      const res: Array<any> = await onGetWards(
        districtInfo.code,
        provinceInfo.code,
      );
      setWardOptions(
        res?.map((item: any) => {
          return {
            label: item.name,
            value: item.code,
          };
        }),
      );
    };
    fetchWardOptions();
  }, [districtInfo, provinceInfo]);

  const renderItem = (item: any) => {
    const type = item.configDataType.id;
    const {
      formatRequiredLabelId: frl,
      formatRequiredMessageId: frm,
      formatSelectRequiredMessageId: fsrm,
    } = useFormMessage();
    switch (type) {
      case TYPE_COMPONENT.INPUT_STR:
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
            rules={[
              {
                required: item.isRequired,
                message: `${item.name} bắt buộc nhập`,
              },
            ]}
          >
            <AppInput
              type='text'
              placeholder={`Nhập ${item.name ? item.name.toLowerCase() : ''}`}
              maxLength={item.maxLength ? item.maxLength : undefined}
              minLength={item.minLength ? item.minLength : undefined}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.SELECT:
        const isMultiChoice = item?.isMultiChoice ?? undefined;
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
          >
            <AppAsyncSelect
              allowClear
              mode={isMultiChoice ? 'multiple' : undefined}
              id={item?.configPickList ? item?.configPickList?.code : null}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
              maxTagCount={isMultiChoice ? 'responsive' : undefined}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_STR:
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
            rules={[
              {
                required: item.isRequired,
                message: `${item.name} bắt buộc nhập`,
              },
            ]}
          >
            <AppInput
              type='text'
              placeholder={`Nhập $${item.name ? item.name.toLowerCase() : ''}`}
              maxLength={item.maxLength ? item.maxLength : undefined}
              minLength={item.minLength ? item.minLength : undefined}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_NUM:
        return (
          <AppFormItem
            key={item.code}
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            rules={[
              {
                required: item.isRequired,
                message: `${item.name} bắt buộc nhập`,
              },
            ]}
            // normalize={(value) => convertInputToNumber(value)}
          >
            <AppInput
              type='text'
              placeholder={`Nhập ${item.name ? item.name.toLowerCase() : ''}`}
              maxLength={item.maxLength ? item.maxLength : undefined}
              minLength={item.minLength ? item.minLength : undefined}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.DATE:
        return (
          <AppFormItem
            key={item.code}
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
          >
            <DatePicker
              style={{width: '100%', height: '36px'}}
              placeholder={dateTimeFormat[0].toLocaleUpperCase()}
              format={dateTimeFormat[0]}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_MONEY:
        return (
          <AppFormItem
            key={item.code}
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            rules={[
              {
                required: item.isRequired,
                message: `${item.name} bắt buộc nhập`,
              },
            ]}
            normalize={(value) => convertInputToNumber(value)}
          >
            <AppInput
              type='text'
              placeholder={`Nhập ${item.name ? item.name.toLowerCase() : ''}`}
              maxLength={item.maxLength ? item.maxLength : undefined}
              minLength={item.minLength ? item.minLength : undefined}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_PROVINCE:
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
          >
            <AppSelect
              id={item.code}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_DISTRICT:
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
          >
            <AppDistrictSelect
              id={item.code}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
              options={districtOptions}
              setDistrictInfo={setDistrictInfo}
            />
          </AppFormItem>
        );
      case TYPE_COMPONENT.INPUT_WARD:
        return (
          <AppFormItem
            name={item.code}
            label={item.isRequired ? frl(item.name) : item.name}
            required={item.isRequired}
            key={item.code}
          >
            <AppWardSelect
              id={item.code}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
              setWardInfo={setWardInfo}
              options={wardOptions}
            />
          </AppFormItem>
        );

      default:
        return <></>;
    }
  };
  return (
    <>
      {dataSource.map((item: any) => {
        return (
          <Col
            xs={responsiveCol.xs}
            md={responsiveCol.md}
            xl={responsiveCol.xl}
          >
            {renderItem(item)}
          </Col>
        );
      })}
    </>
  );
};

export default RenderAtorms; // RenderAtorms
