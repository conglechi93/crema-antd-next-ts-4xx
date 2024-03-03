import useFormMessage from '@crema/utility/hooks/useFormMessage';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {useIntl} from 'react-intl';
import useTaskDetail from './useTaskDetail';
import {DatePicker, FormInstance, InputNumber} from 'antd';
import AppSelect from 'components/atoms/AppSelect';
import {dateTimeFormat} from 'shared/constants/AppConst';
import CalendarImg from 'assets/icon/Calendar.png';
import {memo, useState} from 'react';
import {
  onGetEmployeeAvailableAssigneeForTask,
  onGetParentTask,
} from 'redux/actions/Task';
import AppTypo from 'components/atoms/AppTypo';
import IntlMessages from '@crema/utility/IntlMessages';
import {ActionType} from 'shared/constants/AppVariables';

type PropsTypes = {
  form: FormInstance;
  record: any;
  info: any;
};
const TaskDetail = (props: PropsTypes) => {
  const {form, record, info} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();

  const {
    projectLoading,
    projectOptions,
    handleProjectPopupScroll,
    priorityOptions,
    jobTypeOptions,
    disabled,
    handleChangeProject,
    workflowOptions,
    projectCode,

    parentTaskSearchParams,
    setParentTaskSearchParams,
  } = useTaskDetail(form, record, info);
  const [reportersSearchParams, setReportersSearchParams] = useState({
    page: 1,
    pageSize: 20,
    projectCode: projectCode,
    taskEmployeeType: 1,
  });
  const [assigneesSearchParams, setAssigneesSearchParams] = useState({
    page: 1,
    pageSize: 20,
    projectCode: projectCode,
    taskEmployeeType: 2,
  });

  return (
    <>
      <AppTypo variant='p-lg-semi'>
        <IntlMessages id='common.titleDetailWork' />
      </AppTypo>
      <AppFormItem
        rules={[{required: true, message: frm('common.taskName')}]}
        name='project'
        label={frl('common.project')}
      >
        <AppSelect
          loading={projectLoading}
          options={projectOptions}
          onPopupScroll={handleProjectPopupScroll}
          placeholder={messages['common.projectHint'] as string}
          onChange={handleChangeProject}
          disabled={info?.lanesInfo || info?.type === ActionType.EDIT}
        />
      </AppFormItem>
      <AppFormItem
        rules={[{required: true, message: frl('common.status')}]}
        name='workflowStatus'
        label={frl('common.status')}
      >
        <AppSelect
          disabled={disabled}
          options={workflowOptions}
          placeholder={messages['common.statusHint'] as string}
        />
      </AppFormItem>
      <AppFormItem name='parentTask' label={messages['common.parentTask']}>
        <AppSelectLoadMore
          onGetOptions={onGetParentTask}
          searchParams={{
            ...parentTaskSearchParams,
            projectCode: projectCode,
            taskCode: record?.code,
          }}
          setSearchParams={setParentTaskSearchParams}
          disabled={disabled || info?.lanesInfo?.parentTask}
          placeholder={messages['common.parentTaskHint'] as string}
        />
      </AppFormItem>
      <AppFormItem name='startDate' label={messages['common.startDate']}>
        <DatePicker
          showTime
          format={dateTimeFormat[1]}
          style={{width: '100%', height: '36px'}}
          placeholder={dateTimeFormat[1].toLocaleLowerCase()}
          suffixIcon={<img src={CalendarImg.src} alt='' />}
          showNow={false}
        />
      </AppFormItem>
      <AppFormItem name='endDate' label={messages['common.endDate']}>
        <DatePicker
          showTime
          format={dateTimeFormat[1]}
          style={{width: '100%', height: '36px'}}
          placeholder={dateTimeFormat[1].toLocaleLowerCase()}
          suffixIcon={<img src={CalendarImg.src} alt='' />}
          showNow={false}
        />
      </AppFormItem>
      <AppFormItem name='progress' label={messages['common.progress']}>
        <InputNumber
          placeholder={'0'}
          min={0}
          max={100}
          maxLength={3}
          suffix={'%'}
          style={{width: '100%'}}
        />
      </AppFormItem>
      <AppFormItem name='priority' label={messages['common.priority']}>
        <AppSelect
          options={priorityOptions}
          placeholder={messages['common.priorityHint']}
        />
      </AppFormItem>
      <AppFormItem name='jobType' label={messages['common.jobType']}>
        <AppSelect
          options={jobTypeOptions}
          placeholder={messages['common.jobTypeHint']}
        />
      </AppFormItem>
      {projectCode && (
        <>
          <AppFormItem name='reporters' label={messages['common.reporters']}>
            <AppSelectLoadMore
              disabled={disabled}
              searchParams={{
                ...reportersSearchParams,
                projectCode: projectCode,
                isLoadMore: true,
              }}
              setSearchParams={setReportersSearchParams}
              onGetOptions={onGetEmployeeAvailableAssigneeForTask}
              placeholder={messages['common.reportersHint'] as string}
              mode='multiple'
            />
          </AppFormItem>
          <AppFormItem name='assignees' label={messages['common.assignees']}>
            <AppSelectLoadMore
              disabled={disabled}
              onGetOptions={onGetEmployeeAvailableAssigneeForTask}
              searchParams={{
                ...assigneesSearchParams,
                projectCode: projectCode,
                isLoadMore: true,
              }}
              setSearchParams={setAssigneesSearchParams}
              placeholder={messages['common.assigneesHint'] as string}
              mode='multiple'
            />
          </AppFormItem>
        </>
      )}
    </>
  );
};
export default memo(TaskDetail);
