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
type RolesFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const RolesFilter = (props: RolesFilterProps) => {
  const { handleChangeSearchParams } = props;

  const {
    form,
    searchParams,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
  } = useFunc(handleChangeSearchParams);
  const { messages } = useIntl();

  return (
    <Row gutter={[16, 0]} align={'bottom'} justify={'center'}>
      <Col flex={'none'}>
        <AppPopConfirm
          openPop={openPop}
          setOpenPop={setOpenPop}
          placement='bottomRight'
          destroyTooltipOnHide
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
                    placeholder={messages['common.rolesSearchHint'] as string}
                    suffix={<img src={SearchImg.src} alt='' />}
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
export default RolesFilter;
