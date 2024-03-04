import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import IntlMessages from '@crema/utility/IntlMessages';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import useFunc from './useFunc';
import AppSelectAll from 'components/atoms/AppSelectAll';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { onSearchInventoryWarehouseV2 } from 'redux/actions/InventoryWarehouse';

type PropsTypes = {
  handleChangeSearchParams: (params: any) => void;
};
const FilterTab2 = (props: PropsTypes) => {
  const { handleChangeSearchParams } = props;
  const {
    form,
    statusOptions,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    inventoriesTableSearchParams,
    setInventoriesTableSearchParams,
  } = useFunc(handleChangeSearchParams);
  const { messages } = useIntl();
  return (
    <AppPopConfirm
      openPop={openPop}
      setOpenPop={setOpenPop}
      placement='bottomRight'
      title={<IntlMessages id='common.filter' />}
      description={
        <>
          <AppForm form={form}>
            <AppFormItem
              name='searchText'
              label={messages['common.search'] as string}
            >
              <AppSearch
                placeholder={messages['common.inventoriesSearchHint'] as string}
                suffix={<img src={SearchImg.src} alt='' />}
              />
            </AppFormItem>
            <AppFormItem
              name='inventoryWarehouseCode'
              label={<IntlMessages id='common.inventoriesTable' />}
            >
              <AppSelectLoadMore
                mode='multiple'
                searchParams={inventoriesTableSearchParams}
                setSearchParams={setInventoriesTableSearchParams}
                onGetOptions={onSearchInventoryWarehouseV2}
                placeholder={messages['common.inventoriesTableHint'] as string}
              />
            </AppFormItem>
            <AppFormItem
              name='status'
              label={messages['common.status'] as string}
            >
              <AppSelectAll
                form={form}
                fieldName='status'
                options={statusOptions}
                placeholder={messages['common.statusHint'] as string}
                mode='multiple'
                maxTagCount={'responsive'}
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

export default memo(FilterTab2);
