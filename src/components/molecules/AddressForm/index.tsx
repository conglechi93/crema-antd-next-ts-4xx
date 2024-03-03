import {memo} from 'react';
import AppThreeCols from '../AppThreeCols';
import AppSelect from 'components/atoms/AppSelect';
import AppInput from 'components/atoms/AppInput';
import useAddressForm from './useAddressForm';
import {Col, FormInstance} from 'antd';
import AppFormItem from 'components/atoms/AppFormItem';

const AddressForm = ({
  info,
  form,
  dataSource,
  xs,
  md,
  xl,
  showStreet = false,
}: {
  info: any;
  form: FormInstance;
  dataSource?: any;
  xs?: any;
  md?: any;
  xl?: any;
  showStreet: boolean;
}) => {
  const {
    provinceOptions,
    districtOptions,
    wardOptions,
    handleChangeProvince,
    handleChangeDistrict,
    districtDisabled,
    wardDisabled,
  } = useAddressForm({form, dataSource, xs, md, xl});

  return (
    <>
      <Col xs={xs} md={md} xl={xl}>
        <AppFormItem
          name={'province'}
          label={'Tỉnh/Thành phố'}
          // rules={[{required: true, message: 'Tỉnh/Thành phố bắt buộc nhập'}]}
        >
          <AppSelect
            options={provinceOptions}
            onChange={(e, option) => handleChangeProvince(e, option)}
            placeholder='Chọn Tỉnh/Thành phố'
          />
        </AppFormItem>
      </Col>
      <Col xs={xs} md={md} xl={xl}>
        <AppFormItem name={'district'} label={'Quận/huyện'}>
          <AppSelect
            options={districtOptions}
            onChange={(e, option) => handleChangeDistrict(e, option)}
            placeholder='Chọn Quận/huyện'
            disabled={districtDisabled}
          />
        </AppFormItem>
      </Col>
      <Col xs={xs} md={md} xl={xl}>
        <AppFormItem name={'wards'} label={'Phường/xã'}>
          <AppSelect
            options={wardOptions}
            placeholder='Chọn Phường/xã'
            disabled={wardDisabled}
          />
        </AppFormItem>
      </Col>
      {showStreet && (
        <Col xs={xs} md={md} xl={xl}>
          <AppFormItem name={'street'} label={'Số nhà, đường phố'}>
            <AppInput type='text' placeholder='Số nhà, đường phố' />
          </AppFormItem>
        </Col>
      )}
    </>
  );
};
export default memo(AddressForm);
