import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSearch from 'components/atoms/AppSearch';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import AppSelect from 'components/atoms/AppSelect';
import IntlMessages from '@crema/utility/IntlMessages';
import useSalesTransactionFilter from './useSalesTransactionFilter';

type TransactionManagemnetFilterProps = {
  handleChangeSearchParams: (params: any) => void;
};

const SalesTransactionFilter = (props: TransactionManagemnetFilterProps) => {
  const {handleChangeSearchParams} = props;
  const {messages} = useIntl();
  const {
    form,
    statusOptions,

    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,

    programOptions,
    loadingSalesPrograms,
    handleScrollPoupSalesProgram,

    popOpen,
    setPopOpen,
    handleSearch,
    handleSubmitPopup,
    handleCancelPopup,
  } = useSalesTransactionFilter(handleChangeSearchParams);
  return (
    <AppPopConfirm
      openPop={popOpen}
      setOpenPop={setPopOpen}
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
                // onSearch={handleSearch}
                placeholder={messages['common.inventoriesSearchHint'] as string}
                suffix={<img src={SearchImg.src} alt='' />}
              />
            </AppFormItem>
            <AppFormItem
              name='salesProgramCode'
              label={messages['common.salesProgram'] as string}
            >
              <AppSelect
                loading={loadingSalesPrograms}
                allowClear={!loadingSalesPrograms}
                options={programOptions}
                placeholder={
                  messages['common.salesProgramNameSelectHint'] as string
                }
                mode='multiple'
                maxTagCount={'responsive'}
                onPopupScroll={handleScrollPoupSalesProgram}
              />
            </AppFormItem>
            <AppFormItem
              name='inventoryWarehouseCode'
              label={messages['common.inventoriesTable'] as string}
            >
              <AppSelect
                loading={loadingInventoryWarehouse}
                allowClear={!loadingInventoryWarehouse}
                options={inventoryWarehouseOptions}
                placeholder={messages['common.inventoriesTableHint'] as string}
                mode='multiple'
                maxTagCount={'responsive'}
                onPopupScroll={handleScrollPoupInventoryWarehouse}
              />
            </AppFormItem>
            <AppFormItem
              name='status'
              label={messages['common.status'] as string}
            >
              <AppSelect
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
      okButtonProps={{
        style: {
          padding: '6px 16px',
          height: '36px',
          minWidth: '100px',
          borderRadius: '8px',
          fontWeight: '500',
          backgroundColor: '#D1132A',
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      cancelButtonProps={{
        style: {
          padding: '6px 16px',
          height: '36px',
          minWidth: '100px',
          borderRadius: '8px',
          fontWeight: '500',
          borderColor: '#D1132A',
          color: '#D1132A',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      cancelText='Đặt lại'
      onConfirm={handleSubmitPopup}
      onCancel={handleCancelPopup}
    />
  );
};
export default SalesTransactionFilter;
