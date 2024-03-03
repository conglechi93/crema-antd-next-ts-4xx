import React from 'react';
import {useIntl} from 'react-intl';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import IntlMessages from '@crema/utility/IntlMessages';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppRangePicker from 'components/atoms/AppRangePicker';
import CalendarImg from 'assets/icon/Calendar.png';
import useFunc from './useFunc';
import AppSelectAll from 'components/atoms/AppSelectAll';

type PropsTypes = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const FilterTab3 = (props: PropsTypes) => {
  const {handleChangeSearchParams} = props;
  const {
    form,
    typeOptions,
    openPop,
    setOpenPop,
    searchParams,
    handleConfirmPop,
    handleCancelPop,
  } = useFunc(handleChangeSearchParams);
  const {messages} = useIntl();
  return (
    <AppPopConfirm
      openPop={openPop}
      setOpenPop={setOpenPop}
      placement='bottomRight'
      title={<IntlMessages id='common.filter' />}
      description={
        <>
          <AppForm form={form}>
            <AppFormItem name='types' label={<IntlMessages id='common.type' />}>
              <AppSelectAll
                form={form}
                fieldName='types'
                options={typeOptions}
                initialValues={searchParams.types}
                mode='multiple'
                placeholder={messages['common.typeHint'] as string}
              />
            </AppFormItem>
            <AppFormItem name='time' label={messages['common.time'] as string}>
              <AppRangePicker
                suffixIcon={<img src={CalendarImg.src} alt='' />}
              />
            </AppFormItem>
          </AppForm>
        </>
      }
      icon={''}
      okText={'Áp dụng'}
      cancelText='Đặt lại'
      onConfirm={handleConfirmPop}
      onCancel={handleCancelPop}
    />
  );
};

export default FilterTab3;
