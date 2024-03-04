import { Col, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import { useIntl } from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import usePropertyFilter from './usePropertyFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
type PropertyFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const PropertyFilter = (props: PropertyFilterProps) => {
  const { handleChangeSearchParams } = props;

  const {
    form,
    handleSearch,
    openPop,
    setOpenPop,
    searchParams,
    handleConfirmPop,
    handleCancelPop,
    dataTypeOptions,
    statusOptions,
  } = usePropertyFilter(handleChangeSearchParams);
  const { messages } = useIntl();

  return (
    <Row gutter={[16, 0]} align={'bottom'} justify={'center'}>
      <Col flex={'none'}>
        <AppPopConfirm
          destroyTooltipOnHide
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
                    // onSearch={(e) => handleSearch(e)}
                    placeholder={
                      messages['common.propertySearchHint'] as string
                    }
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='dataTypeCode'
                  label={messages['common.dataType'] as string}
                >
                  <AppSelectAll
                    form={form}
                    fieldName='dataTypeCode'
                    maxTagCount={'responsive'}
                    initialValues={searchParams?.dataTypeCode}
                    options={dataTypeOptions}
                    placeholder={messages['common.dataTypeHint'] as string}
                    mode='multiple'
                  />
                </AppFormItem>
                <AppFormItem
                  name='status'
                  label={messages['common.status'] as string}
                >
                  <AppSelectAll
                    form={form}
                    fieldName='status'
                    maxTagCount={'responsive'}
                    initialValues={searchParams?.status}
                    options={statusOptions}
                    placeholder={messages['common.statusHint'] as string}
                    mode='multiple'
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
      </Col>
    </Row>
  );
};
export default PropertyFilter;
