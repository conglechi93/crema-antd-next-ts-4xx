import { Col, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import { useIntl } from 'react-intl';
import CalendarImg from 'assets/icon/Calendar.png';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import AppRangePicker from 'components/atoms/AppRangePicker';
import IntlMessages from '@crema/utility/IntlMessages';
import useSalesProgramsFilter from './useSalesProgramsFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
type SalesProgramFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const SalesProgramFilter = (props: SalesProgramFilterProps) => {
  const { handleChangeSearchParams } = props;

  const {
    form,
    initialValues,
    statusOptions,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
  } = useSalesProgramsFilter(handleChangeSearchParams);
  const { messages } = useIntl();

  return (
    <Row gutter={[16, 0]} align={'bottom'} justify={'center'}>
      <Col flex={'none'}>
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
                    // onSearch={handleSearch}
                    placeholder={
                      messages['common.salesProgramDetailSearchHint'] as string
                    }
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='time'
                  label={messages['common.time'] as string}
                >
                  <AppRangePicker
                    suffixIcon={<img src={CalendarImg.src} alt='' />}
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
                    initialValues={initialValues?.status}
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
export default SalesProgramFilter;
