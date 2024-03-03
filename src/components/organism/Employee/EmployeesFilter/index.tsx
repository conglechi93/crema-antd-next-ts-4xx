import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import useFunc from './useFunc';
import AppSelectAll from 'components/atoms/AppSelectAll';
type EmployeesFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const EmployeesFilter = (props: EmployeesFilterProps) => {
  const {handleChangeSearchParams} = props;

  const {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    roleOptions,
    statusOptions,
    departmentOptions,
  } = useFunc(handleChangeSearchParams);
  const {messages} = useIntl();

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
                  label={messages['common.search']}
                >
                  <AppSearch
                    // onSearch={(e) => handleSearch(e)}
                    placeholder={
                      messages['common.employeeSearchHint'] as string
                    }
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='departments'
                  label={messages['common.department'] as string}
                >
                  <AppSelectAll
                    form={form}
                    fieldName='departments'
                    maxTagCount={'responsive'}
                    initialValues={initialValues?.department}
                    options={departmentOptions}
                    placeholder={messages['common.departmentHint'] as string}
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
                    initialValues={initialValues?.status}
                    mode='multiple'
                    options={statusOptions}
                    placeholder={messages['common.all'] as string}
                  />
                </AppFormItem>
                <AppFormItem
                  name='positions'
                  label={messages['common.position'] as string}
                >
                  <AppSelectAll
                    form={form}
                    fieldName='positions'
                    initialValues={initialValues?.role}
                    mode='multiple'
                    options={roleOptions}
                    placeholder={messages['common.positionHint'] as string}
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
export default EmployeesFilter;
