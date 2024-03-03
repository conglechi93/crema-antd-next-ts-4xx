import {AppState} from '@auth0/auth0-react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetProjectDetail} from 'redux/actions/ProjectManagement';
import {onGetEmployeeAvailableAssigneeForTask} from 'redux/actions/Task';

const useGeneralInformation = (detailInfo: any) => {
  const dispatch = useDispatch();
  const [project, setProject] = useState<string>('');
  const [workflowValue, setWorkflowValue] = useState<any>([]);
  const [workflowStatus, setWorkFlowStatus] = useState<any>([]);
  const [priorityValue, setPriorityValue] = useState<any>([]);
  const [reporters, setReporters] = useState<any>([]);
  const [reporterValue, setReporterValue] = useState<any>([]);

  const [assignees, setAssignees] = useState<any>([]);
  const [assigneeValue, setAssigneeValue] = useState<any>([]);
  const fetchWorkflowStatus = async (projectCode: string) => {
    const res: any = await dispatch(onGetProjectDetail(projectCode));
    let options: Array<any> = [];
    if (res) {
      const workflow: Array<any> = res?.workflow?.workflowDetails ?? [];
      workflow.map((item: any) => {
        options.push({
          label: item.name,
          value: item.code,
        });
      });
    }
    setWorkFlowStatus(options);
  };

  const fetchReporters = async (projectCode: string) => {
    const searchParams = {
      page: 1,
      pageSize: 100,
      projectCode: projectCode,
      taskEmployeeType: '1',
    };
    const res: any = await dispatch(
      onGetEmployeeAvailableAssigneeForTask(searchParams),
    );
    const options: Array<any> = [];
    const elements: Array<any> = res?.elements ?? [];
    elements.map((item: any) => {
      options.push({
        label: item.name,
        value: item.code,
      });
    });
    setReporters(options);
  };
  const fetchAssignees = async (projectCode: string) => {
    const searchParams = {
      page: 1,
      pageSize: 100,
      projectCode: projectCode,
      taskEmployeeType: '2', // 2: assignees
    };
    const res: any = await dispatch(
      onGetEmployeeAvailableAssigneeForTask(searchParams),
    );
    const options: Array<any> = [];
    const elements: Array<any> = res?.elements ?? [];
    elements.map((item: any) => {
      options.push({
        label: item.name,
        value: item.code,
      });
    });
    setAssignees(options);
  };
  useEffect(() => {
    if (!detailInfo) return;
    setProject(detailInfo?.project ? detailInfo?.project?.name : '');
    const projectCode = detailInfo?.project ? detailInfo?.project?.code : '';
    fetchWorkflowStatus(projectCode);
    fetchReporters(projectCode);
    fetchAssignees(projectCode);
    // Set value
    const workflow = detailInfo?.workflowStatus
      ? [
          {
            label: detailInfo?.workflowStatus?.name,
            value: detailInfo?.workflowStatus?.code,
          },
        ]
      : [];
    setWorkflowValue(workflow);
    const priority = detailInfo?.priority
      ? [
          {
            label: detailInfo?.priority?.name,
            value: detailInfo?.priority?.code,
          },
        ]
      : [];
    setPriorityValue(priority);

    const assignee: Array<any> = detailInfo?.assignees ?? [];
    const assigneeOptions: Array<any> = [];
    assignee.map((item: any) => {
      assigneeOptions.push({
        label: item?.name,
        value: item?.code,
      });
    });
    setAssigneeValue(assigneeOptions);

    const reporter: Array<any> = detailInfo?.reporters ?? [];
    const reporterOptions: Array<any> = [];
    reporter.map((item: any) => {
      reporterOptions.push({
        label: item?.name,
        value: item?.code,
      });
    });
    setReporterValue(reporterOptions);
  }, [detailInfo]);

  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [priorityOptions, setPriorityOptions] = useState<any>([]);
  useEffect(() => {
    const fetchPriorityOptions = async () => {
      const priorityStatusShopCat: Array<any> = [];
      categories?.priorityStatusShopCat?.map((item: any) =>
        priorityStatusShopCat.push({
          label: item?.name,
          value: item?.code,
        }),
      );
      setPriorityOptions(priorityStatusShopCat);
    };
    fetchPriorityOptions();
  }, []);

  const handleChangeProject = (value) => {
    setProject(value);
  };

  return {
    project,
    handleChangeProject,
    workflowStatus,
    workflowValue,
    setWorkflowValue,
    priorityOptions,
    priorityValue,
    setPriorityValue,
    reporters,
    reporterValue,
    setReporterValue,
    assignees,
    assigneeValue,
    setAssigneeValue,
  };
};
export default useGeneralInformation;
