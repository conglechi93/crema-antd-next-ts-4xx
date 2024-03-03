import {AppState} from '@auth0/auth0-react';
import {FormInstance} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetJobTypes} from 'redux/actions/JobType';
import {
  onGetProjectDetail,
  onGetProjectList,
} from 'redux/actions/ProjectManagement';
import {pageSize} from 'shared/constants/AppConst';
import dayjs from 'dayjs';

const useTaskDetail = (form: FormInstance, record: any, info: any) => {
  const dispatch = useDispatch();
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );
  const [projectSearchParams, setProjectSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  const [priorityOptions, setPriorityOptions] = useState<any>([]);
  const [projectCode, setProjectCode] = useState<any>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [workflowOptions, setWorkflowOptions] = useState<any>([]);
  const [parentTaskSearchParams, setParentTaskSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
  });

  useEffect(() => {
    const {lanesInfo} = info;
    if (!lanesInfo) return;
    const {projectCode, workflowStatus, parentTask} = lanesInfo;
    form?.setFieldsValue({
      workflowStatus: workflowStatus,
      project: projectCode,
      parentTask: parentTask,
    });
    setProjectCode(projectCode);
    setDisabled(projectCode ? false : true);
    fetchWorkflowOptions(projectCode);
  }, [info]);

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

  useEffect(() => {
    if (!record) return;
    const projectCode = record?.project?.code;
    setDisabled(projectCode ? false : true);
    setProjectCode(projectCode);
    const startDate = record?.startDate ?? '';
    const endDate = record?.endDate ?? '';
    const assignees: Array<any> = record?.assignees ? record?.assignees : [];
    const reporters: Array<any> = record?.reporters ? record?.reporters : [];

    form.setFieldsValue({
      project: record?.project?.code,
      workflowStatus: record?.workflowStatus?.code,
      startDate: startDate
        ? dayjs(startDate, 'HH:mm:ss DD/MM/YYYY')
        : undefined,
      endDate: endDate ? dayjs(endDate, 'HH:mm:ss DD/MM/YYYY') : undefined,
      progress: record?.progress,
      priority: record?.priority?.code,
      parentTask: record?.parent ? record?.parent?.code : null,
      jobType: record?.jobType ? record?.jobType?.code : null,
      assignees: assignees?.map((item) => item.code),
      reporters: reporters?.map((item) => item.code),
    });
    fetchWorkflowOptions(projectCode);
  }, [record]);

  const [projectOptions, setProjectOptions] = useState<any>([]);
  const [projectLoading, setProjectLoading] = useState<boolean>(false);
  const fetchProjectOptions = async (
    projectSearchParams: any,
    loadmore?: boolean,
  ) => {
    setProjectLoading(true);
    const res: any = await dispatch(onGetProjectList(projectSearchParams));
    const optionsAPI: {label: string; value: string}[] = [];
    res?.elements?.map((item: any) => {
      optionsAPI.push({
        label: item.name,
        value: item.code,
      });
    });
    const newOption: {label: string; value: string}[] = ([] = loadmore
      ? [...projectOptions, ...optionsAPI]
      : optionsAPI);

    if (loadmore && optionsAPI.length > 0) {
      setProjectSearchParams((pre) => {
        return {
          ...pre,
          page: pre.page + 1,
        };
      });
    }

    setProjectOptions(newOption);
    setTimeout(() => {
      setProjectLoading(false);
    }, 300);
  };
  const handleProjectPopupScroll = async (event: any) => {
    const target = event.target;
    const searchParams = {
      ...projectSearchParams,
      page: projectSearchParams.page + 1,
    };
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      fetchProjectOptions(searchParams, true);
    }
  };
  useEffect(() => {
    fetchProjectOptions(projectSearchParams);
  }, []);

  // Get job type
  const [jobTypeOptions, setJobTypeOptions] = useState<any>([]);
  const [jobTypeSearchParams, setJobTypeSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
  });
  useEffect(() => {
    const fetchJobTypesOptions = async () => {
      const res: any = await onGetJobTypes(jobTypeSearchParams);
      const optiopns: {label: string; value: string}[] = [];
      res?.elements?.map((item: any) => {
        optiopns.push({
          label: item.name,
          value: item.code,
        });
      });
      setJobTypeOptions(optiopns);
    };
    fetchJobTypesOptions();
  }, [jobTypeSearchParams]);

  const fetchWorkflowOptions = async (projectCode: string) => {
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
    setWorkflowOptions(options);
  };
  const handleChangeProject = async (e) => {
    setProjectCode(e);
    setDisabled(!e);
    const code = e;
    fetchWorkflowOptions(code);
    form.setFieldsValue({
      workflowStatus: undefined,
    });
  };

  return {
    projectSearchParams,
    setProjectSearchParams,
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
  };
};
export default useTaskDetail;
