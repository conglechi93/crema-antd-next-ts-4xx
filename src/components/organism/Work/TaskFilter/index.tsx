import {Col, DatePicker, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppSearch from 'components/atoms/AppSearch';
import IntlMessages from '@crema/utility/IntlMessages';
import useTaskFilter from './useTaskFilter';
import AppSelectAll from 'components/atoms/AppSelectAll';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {onGetEmployees} from 'redux/actions/Employees';
import {dateTimeFormat} from 'shared/constants/AppConst';
import CalendarImg from 'assets/icon/Calendar.png';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
type TaskFilterProps = {
  handleChangeSearchParams: (params: any) => void;
};
const TaskFilter = (props: TaskFilterProps) => {
  const {handleChangeSearchParams} = props;
  const {RangePicker} = DatePicker;
  const {
    form,
    initialValues,
    handleSearch,
    openPop,
    setOpenPop,
    handleConfirmPop,
    handleCancelPop,
    statusOptions,
    assigneesSearchParams,
    setAssigneesSearchParams,
    priorityOptions,
    jobTypeOptions,
  } = useTaskFilter(handleChangeSearchParams);
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
                    // onSearch={(e) => handleSearch(e)}
                    placeholder={messages['common.taskSearchHint'] as string}
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='assignees'
                  label={messages['common.assignees'] as string}
                >
                  <AppSelectLoadMore
                    searchParams={assigneesSearchParams}
                    setSearchParams={setAssigneesSearchParams}
                    onGetOptions={onGetEmployees}
                    placeholder={messages['common.assigneesHint'] as string}
                    mode='multiple'
                  />
                </AppFormItem>
                <AppFormItem
                  name='priorities'
                  label={messages['common.priority']}
                >
                  <AppSelectAll
                    initialValues={initialValues?.priorities}
                    form={form}
                    fieldName='priorities'
                    options={priorityOptions}
                    placeholder={messages['common.priorityHint']}
                    mode='multiple'
                  />
                </AppFormItem>
                <AppFormItem name='jobTypes' label={messages['common.jobType']}>
                  <AppSelectAll
                    initialValues={initialValues?.jobTypes}
                    form={form}
                    fieldName='jobTypes'
                    options={jobTypeOptions}
                    placeholder={messages['common.jobTypeHint']}
                    mode='multiple'
                  />
                </AppFormItem>
                <AppFormItem name='time' label={messages['common.time']}>
                  <RangePicker
                    showTime
                    format={dateTimeFormat[1]}
                    style={{width: '100%', height: '36px'}}
                    suffixIcon={<img src={CalendarImg.src} alt='' />}
                    placeholder={[
                      dateTimeFormat[1].toString().toLowerCase(),
                      dateTimeFormat[1].toString().toLowerCase(),
                    ]}
                    showNow={false}
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
export default TaskFilter;
