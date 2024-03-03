import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import useJopTypeFilter from './useJobTypeFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
type JopTypeFilterProps = {
  handleChangeSearchParams: (params: any, resetRecord?: boolean) => void;
};
const JopTypesFilter = (props: JopTypeFilterProps) => {
  const {handleChangeSearchParams} = props;
  const {
    initialValues,
    form,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
  } = useJopTypeFilter(handleChangeSearchParams);
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();

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
                    placeholder={messages['common.jobTypeSearchHint'] as string}
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem name='status' label={messages['common.status']}>
                  <AppSelectAll
                    form={form}
                    fieldName='status'
                    options={statusOptions}
                    initialValues={initialValues?.status}
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
export default JopTypesFilter;
