import {Col, Divider, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import useChooseInventoryFilter from './useChooseInventoryFilter';
import AppSearch from 'components/atoms/AppSearch';
import AppSelect from 'components/atoms/AppSelect';
import AppFormItem from 'components/atoms/AppFormItem';
import SearchImg from 'assets/icon/search.png';
import styles from './style.module.scss';
import AppButton from 'components/atoms/AppButton';
import {FormInstance} from 'antd/lib';

type ChooseInventoryFilterProps = {
  form: FormInstance;
  handleChangeSearchParams: (params: any) => void;
};
const ChooseInventoryFilter = (props: ChooseInventoryFilterProps) => {
  const {form, handleChangeSearchParams} = props;
  const {
    inventoryWarehouseOptions,
    loadingInventoryWarehouse,
    handleScrollPoupInventoryWarehouse,
    handleSearch,
    handleResetForm,
  } = useChooseInventoryFilter(form, handleChangeSearchParams);
  return (
    <div>
      <AppForm form={form}>
        <Row gutter={[8, 8]}>
          <Col flex={'auto'}>
            <Row gutter={[8, 8]}>
              <Col xs={12} className={styles.input_search}>
                <AppFormItem name={'searchText'}>
                  <AppSearch
                    onSearch={handleSearch}
                    placeholder='Tìm theo Mã/ Tên mặt hàng'
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
              </Col>
              <Col xs={12}>
                <AppFormItem name={'inventoryWarehouseCode'}>
                  <AppSelect
                    loading={loadingInventoryWarehouse}
                    placeholder='Chọn kho hàng'
                    options={inventoryWarehouseOptions}
                    mode='multiple'
                    onPopupScroll={handleScrollPoupInventoryWarehouse}
                  />
                </AppFormItem>
              </Col>
            </Row>
          </Col>
          <Col md={{flex: 'none'}}>
            <AppButton type='primary' onClick={handleSearch}>
              Tìm kiếm
            </AppButton>
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};

export default ChooseInventoryFilter;
