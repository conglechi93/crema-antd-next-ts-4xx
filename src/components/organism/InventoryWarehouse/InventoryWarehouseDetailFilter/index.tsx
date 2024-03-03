import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import useInventoryWarehouseDetailFilter from './useInventoryWarehouseDetailFilter';
import AppFormItem from 'components/atoms/AppFormItem';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import {useEffect} from 'react';
import labelImg from 'assets/icon/documents_label.png';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';

type PropsTypes = {
  searchParams: any;
  handleChangeSearchParam: (values: any) => void;
  inventoryWarehouseRecord: any;
};

const InventoryWarehouseDetailFilter = (props: PropsTypes) => {
  const {messages} = useIntl();
  const {inventoryWarehouseRecord, handleChangeSearchParam} = props;
  const {form, handleSubmitForm, openPop, setOpenPop, handleCancelPop} =
    useInventoryWarehouseDetailFilter(handleChangeSearchParam);

  useEffect(() => {
    form.resetFields();
  }, [inventoryWarehouseRecord]);

  return (
    <Row gutter={[0, 16]} align={'middle'} className='table_detail_filter'>
      <Col flex={'auto'}>
        {inventoryWarehouseRecord && (
          <div className='modal_label_title'>
            <img src={labelImg.src} alt='' />
            <label>{inventoryWarehouseRecord?.code}</label>
          </div>
        )}
      </Col>
      <Col flex={'none'} className='filter_search' style={{textAlign: 'right'}}>
        <AppPopConfirm
          openPop={openPop}
          setOpenPop={setOpenPop}
          placement='bottomRight'
          title={<IntlMessages id='common.filter' />}
          destroyTooltipOnHide
          description={
            <>
              <AppForm form={form}>
                <AppFormItem name='searchText'>
                  <AppSearch
                    placeholder='Tìm theo Mã/ Tên mặt hàng'
                    suffix={<img src={SearchImg.src} alt='' />}
                    // onSearch={handleSubmitForm}
                  />
                </AppFormItem>
              </AppForm>
            </>
          }
          icon={''}
          okText={'Áp dụng'}
          cancelText='Đặt lại'
          onConfirm={handleSubmitForm}
          onCancel={handleCancelPop}
        />
      </Col>
    </Row>
  );
};
export default InventoryWarehouseDetailFilter;
