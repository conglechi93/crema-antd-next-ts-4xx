import { Col, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import { useIntl } from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import useFunc from './useFunc';
import AppSelectAll from 'components/atoms/AppSelectAll';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { onGetEmployees } from 'redux/actions/Employees';
import { onGetTags } from 'redux/actions/Tag';
import AddressForm from 'components/molecules/AddressForm';
type CustomerFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const CustomerFilter = (props: CustomerFilterProps) => {
  const { handleChangeSearchParams } = props;

  const {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,

    customerGroupOptions,
    customerStatusOptions,
    customerResourcesOptions,

    employeeSearchParams,
    setEmployeeSearchParams,
    tagsSearchParams,
    setTagsSearchParams,
  } = useFunc(handleChangeSearchParams);
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
                <Row gutter={[16, 8]} align={'middle'}>
                  <Col xs={24} md={12}>
                    <AppFormItem
                      name='searchText'
                      label={messages['common.search'] as string}
                    >
                      <AppSearch
                        placeholder={
                          messages['common.customerSearchHint'] as string
                        }
                        suffix={<img src={SearchImg.src} alt='' />}
                      />
                    </AppFormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <AppFormItem
                      name='customerGroup'
                      label={messages['common.customerGroup'] as string}
                    >
                      <AppSelectAll
                        form={form}
                        fieldName='customerGroup'
                        initialValues={initialValues?.customerGroup}
                        options={customerGroupOptions}
                        placeholder={
                          messages['common.customerGroupHint'] as string
                        }
                        mode='multiple'
                      />
                    </AppFormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <AppFormItem
                      name='customerSource'
                      label={messages['common.customerSource'] as string}
                    >
                      <AppSelectAll
                        form={form}
                        initialValues={initialValues?.customerSource}
                        fieldName='customerSource'
                        options={customerResourcesOptions}
                        placeholder={
                          messages['common.customerSourceHint'] as string
                        }
                        mode='multiple'
                      />
                    </AppFormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <AppFormItem
                      name='staffInCharges'
                      label={messages['common.personInCharge'] as string}
                    >
                      <AppSelectLoadMore
                        searchParams={employeeSearchParams}
                        setSearchParams={setEmployeeSearchParams}
                        onGetOptions={onGetEmployees}
                        placeholder={
                          messages['common.personInChargeHint'] as string
                        }
                        mode='multiple'
                      />
                    </AppFormItem>
                  </Col>
                  <AddressForm
                    form={form}
                    info={''}
                    xs={24}
                    md={12}
                    showStreet={false}
                  />
                  <Col xs={24} md={12}>
                    <AppFormItem
                      name='status'
                      label={messages['common.status'] as string}
                    >
                      <AppSelectAll
                        form={form}
                        initialValues={initialValues?.status}
                        fieldName='status'
                        options={customerStatusOptions}
                        placeholder={messages['common.statusHint'] as string}
                        mode='multiple'
                      />
                    </AppFormItem>
                  </Col>
                  <Col xs={24}>
                    <AppFormItem
                      name='tags'
                      label={messages['common.tags'] as string}
                    >
                      <AppSelectLoadMore
                        searchParams={tagsSearchParams}
                        setSearchParams={setTagsSearchParams}
                        onGetOptions={onGetTags}
                        placeholder={messages['common.tagsHint'] as string}
                        mode='multiple'
                      />
                    </AppFormItem>
                  </Col>
                </Row>
              </AppForm>
            </>
          }
          icon={''}
          okText={'Áp dụng'}
          cancelText='Đặt lại'
          onConfirm={handleConfirmPop}
          onCancel={handleCancelPop}
        ></AppPopConfirm>
      </Col>
    </Row>
  );
};
export default CustomerFilter;
