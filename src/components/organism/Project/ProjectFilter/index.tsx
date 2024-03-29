import { Col, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import { useIntl } from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import usePropertyFilter from './useProjectFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
type ProjectFilterProps = {
  handleChangeSearchParams: (params: any) => void;
};
const ProjectFilter = (props: ProjectFilterProps) => {
  const { handleChangeSearchParams } = props;
  const {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
    workFlowOptions,
  } = usePropertyFilter(handleChangeSearchParams);
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
                    placeholder={messages['common.projectSearchHint'] as string}
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='workFlow'
                  label={messages['common.workFlow'] as string}
                >
                  <AppSelectAll
                    form={form}
                    fieldName='workFlow'
                    maxTagCount={'responsive'}
                    initialValues={initialValues?.workFlow}
                    options={workFlowOptions}
                    placeholder={messages['common.workFlowHint'] as string}
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
export default ProjectFilter;
