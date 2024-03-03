import AppFormItem from 'components/atoms/AppFormItem';
import {memo} from 'react';
import {Col, DatePicker} from 'antd';
import AppInput from 'components/atoms/AppInput';
import AppAsyncSelect from 'components/atoms/AppAsyncSelect';
import {convertInputToNumber} from 'utils/FormUtils';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {dateTimeFormat} from 'shared/constants/AppConst';
import AppSelect from 'components/atoms/AppSelect';
import AppProvinceSelect from 'components/atoms/AppProvinceSelect';

type PropsTypes = {
  dataSource: Array<any>;
  provinceOptions?: {label: string; value: string}[];
  districtOptions?: {label: string; value: string}[];
  wardOptions?: {label: string; value: string}[];
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

const RenderAtormsV2 = (props: PropsTypes) => {
  const {dataSource, districtOptions, wardOptions, responsiveCol} = props;

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
            <AppProvinceSelect
              // options={provinceOptions}
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
            <AppSelect
              id={item.code}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
              options={districtOptions}
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
            <AppSelect
              id={item.code}
              placeholder={`Chọn ${item.name ? item.name.toLowerCase() : ''}`}
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

export default memo(RenderAtormsV2); // RenderAtorms
