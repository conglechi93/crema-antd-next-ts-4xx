import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import useInventoryWarehouseFilter from './useInventoryWarehouseFilter';
import AppFormItem from 'components/atoms/AppFormItem';
import {useIntl} from 'react-intl';
import AppSearch from 'components/atoms/AppSearch';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import SearchImg from 'assets/icon/search.png';
import IntlMessages from '@crema/utility/IntlMessages';
import AppSelectAll from 'components/atoms/AppSelectAll';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {onGetProjectList} from 'redux/actions/ProjectManagement';

type PropsTypes = {
  searchParams: any;
  onSubmitForm: (values: any, resetRecord: boolean) => void;
};

const InventoryWarehouseFilter = (props: PropsTypes) => {
  const {onSubmitForm} = props;
  const {
    form,
    initialValues,
    statusOptions,
    projectSearchParams,
    setProjectSearchParams,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
  } = useInventoryWarehouseFilter(onSubmitForm);
  const {messages} = useIntl();
  return (
    <Row gutter={[10, 0]} align={'bottom'} justify={'center'}>
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
                      messages['common.inventoryWarehouseSearchHint'] as string
                    }
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='project'
                  label={messages['common.project'] as string}
                >
                  <AppSelectLoadMore
                    mode='multiple'
                    onGetOptions={onGetProjectList}
                    searchParams={projectSearchParams}
                    setSearchParams={setProjectSearchParams}
                    placeholder={messages['common.projectHint'] as string}
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
export default InventoryWarehouseFilter;
