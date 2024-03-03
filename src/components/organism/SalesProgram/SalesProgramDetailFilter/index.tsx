import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSearch from 'components/atoms/AppSearch';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import AppSelect from 'components/atoms/AppSelect';
import IntlMessages from '@crema/utility/IntlMessages';
import useSalesProgramDetailFilter from './useSalesProgramDetailFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
import labelImg from 'assets/icon/documents_label.png';

type SalesProgramDetailFilterProps = {
  currentRecord: any;
  handleChangeSearchParams: (params: any) => void;
};

const SalesProgramDetailFilter = (props: SalesProgramDetailFilterProps) => {
  const {currentRecord, handleChangeSearchParams} = props;
  const {messages} = useIntl();
  const {
    form,
    popForm,
    statusOptions,

    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,

    handleSearch,
  } = useSalesProgramDetailFilter(currentRecord, handleChangeSearchParams);

  return (
    <Row gutter={[16, 16]} className='table_detail_filter' align={'middle'}>
      <Col flex={'auto'}>
        {currentRecord && Object?.keys(currentRecord)?.length > 0 && (
          <div className='modal_label_title'>
            <img src={labelImg.src} alt='' />
            <label>{currentRecord?.code}</label>
          </div>
        )}
      </Col>
      <Col flex={'none'} className='filter_search_filter'>
        <Row gutter={[16, 16]}>
          <Col xs={20} className='filter_search'>
            <AppForm form={form}>
              <AppFormItem name='searchText'>
                <AppSearch
                  onSearch={(e) => handleSearch(e)}
                  placeholder={
                    messages['common.inventoriesSearchHint'] as string
                  }
                  suffix={<img src={SearchImg.src} alt='' />}
                />
              </AppFormItem>
            </AppForm>
          </Col>
          <Col xs={4}>
            <AppPopConfirm
              placement='bottomRight'
              title={<IntlMessages id='common.filter' />}
              description={
                <>
                  <AppForm form={popForm}>
                    <AppFormItem
                      name='inventoryWarehouseCode'
                      label={messages['common.inventoriesTable'] as string}
                    >
                      <AppSelect
                        mode='multiple'
                        maxTagCount={'responsive'}
                        loading={loadingInventoryWarehouse}
                        allowClear={!loadingInventoryWarehouse}
                        options={inventoryWarehouseOptions}
                        placeholder={
                          messages['common.inventoriesTableHint'] as string
                        }
                        onPopupScroll={handleScrollPoupInventoryWarehouse}
                      />
                    </AppFormItem>
                    <AppFormItem
                      name='status'
                      label={messages['common.status'] as string}
                    >
                      <AppSelectAll
                        form={popForm}
                        fieldName='status'
                        mode='multiple'
                        maxTagCount={'responsive'}
                        options={statusOptions}
                        placeholder={messages['common.statusHint'] as string}
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
              onConfirm={(e) => {
                handleSearch(e);
              }}
              onCancel={(e) => {
                popForm.resetFields();
                handleSearch(e);
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default SalesProgramDetailFilter;
