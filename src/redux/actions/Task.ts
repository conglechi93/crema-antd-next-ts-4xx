import API from 'api/Request';
import {API_ENDPOINTS} from 'services/apiUrl';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';
export const onGetTasks = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const assignees = payload.assignees ? payload.assignees : [];
      const priorities = payload.priorities ? payload.priorities : [];
      const jobTypes = payload.jobTypes ? payload.jobTypes : [];
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText ?? '',
        isLoadMore: payload.isLoadMore ?? false,
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        assignees: Array.from(assignees)?.includes('')
          ? ''
          : assignees.toString(),
        priorities: Array.from(priorities)?.includes('')
          ? ''
          : priorities.toString(),
        jobTypes: Array.from(jobTypes)?.includes('') ? '' : jobTypes.toString(),
        fromDate: payload.fromDate ? payload.fromDate.toString() : '',
        toDate: payload.toDate ? payload.toDate.toString() : '',
        taskCode: payload.taskCode ? payload.taskCode : '',
        isSubTaskMode: payload.isSubTaskMode ? true : false,
        projectCode: payload.projectCode ? payload.projectCode : '',
      };
      const res = await API.get(API_ENDPOINTS.task.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetTaskLogs = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const types = payload.assignees ? payload.assignees : [];
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText ?? '',
        taskCode: payload.taskCode,
        types: Array.from(types)?.includes('') ? '' : types.toString(),
      };
      const res = await API.get(API_ENDPOINTS.task.get_tasks_logs, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetParentTask = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {page, pageSize, projectCode, taskCode, searchText} = payload;
      if (!projectCode) return;
      const reqParams = {
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        searchText: searchText,
        projectCode: projectCode,
        taskCode: taskCode,
      };
      const res = await API.get(API_ENDPOINTS.task.get_parent_tasks, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetTasksDetail = (taskCode: any) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.task.get_details.replace('{taskCode}', taskCode),
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return null;
    }
  };
};

export const onGetEmployeeAvailableAssigneeForTask = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const taskEmployeeType = payload.taskEmployeeType
        ? payload.taskEmployeeType
        : [];
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText ?? '',
        isLoadMore: payload.isLoadMore ?? false,
        projectCode: payload.projectCode ?? '',
        // taskEmployeeType:
        // 1: reporters
        // 2: assignees
        taskEmployeeType: Array.from(taskEmployeeType)?.includes('')
          ? ''
          : taskEmployeeType.toString(),
        status: Array.from(status)?.includes('') ? '' : status.toString(),
      };
      const res = await API.get(API_ENDPOINTS.task.search_available_employees, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateTask = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const fileAttachments: Array<any> = payload.fileAttachments
        ? payload.fileAttachments
        : [];
      const reqParams = {
        name: payload.name,
        project: payload.project,
        progress: payload.progress,
        workflowStatus: payload.workflowStatus,
        parentTask: payload.parentTask,
        startDate: payload.startDate,
        endDate: payload.endDate,
        jobType: payload.jobType,
        priority: payload.priority,
        reporters: payload.reporters,
        assignees: payload.assignees,
        description: payload.description,
        fileAttachments: fileAttachments.map((file: any) => {
          return {
            id: file.uid,
          };
        }),
      };
      const res: any = await API.post(API_ENDPOINTS.task.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateTask = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const fileAttachments: Array<any> = payload.fileAttachments
        ? payload.fileAttachments
        : [];
      const reqParams = {
        code: payload.code,
        name: payload.name,
        project: payload.project,
        progress: payload.progress,
        workflowStatus: payload.workflowStatus,
        parentTask: payload.parentTask,
        startDate: payload.startDate,
        endDate: payload.endDate,
        jobType: payload.jobType,
        priority: payload.priority,
        reporters: payload.reporters,
        assignees: payload.assignees,
        description: payload.description,
        fileAttachments: fileAttachments.map((file: any) => {
          return {
            id: file.uid,
          };
        }),
      };
      const res: any = await API.patch(API_ENDPOINTS.task.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Chỉnh sửa công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Chỉnh sửa công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteTask = (taskCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.task.delete.replace('{taskCode}', taskCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};

export const onAddEmployeeToDepartment = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        departmentCode: payload.departmentCode,
        employeeWorkSpaces: payload?.employeeWorkSpaces,
      };
      const res: any = await API.post(
        API_ENDPOINTS.departments.add_employees,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Thêm nhân viên vào phòng ban thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Thêm nhân viên vào phòng ban thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onAssginEmployee = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        assignees: payload.assignees,
      };
      const res: any = await API.post(
        API_ENDPOINTS.task.assign_employee,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Thêm thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Thêm thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onGetTaskComments = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {page, pageSize, taskCode, isLoadMore} = payload;
      if (!taskCode) return;
      const reqParams = {
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        taskCode: taskCode,
        isLoadMore: isLoadMore ? true : false,
      };
      const res = await API.get(API_ENDPOINTS.task.get_task_comments, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateTaskComment = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {taskCode, content, attachments} = payload;
      if (!taskCode) return;
      const reqParams = {
        taskCode: taskCode,
        content: content,
        attachments: attachments,
      };
      await API.post(API_ENDPOINTS.task.create_task_comment, reqParams);
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? `Thêm bình luận thất bại!`,
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onGetTasksKanban = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {page, pageSize, projectCode} = payload;

      if (!projectCode) return;
      const reqParams = {
        page: page ?? 1,
        pageSize: pageSize ?? 10,
        projectCode: projectCode,
      };
      const res = await API.get(API_ENDPOINTS.task.get_tasks_kanban, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetAllCommentsTaskLastest = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {taskCode, code} = payload;
      const reqParams = {
        taskCode: taskCode,
        code: code,
      };
      const res = await API.get(API_ENDPOINTS.task.get_comments_task_latest, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onChangeRankModeKanbanIndex = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {code, workflowStatus, index} = payload;
      const reqParams = {
        currentCode: code,
        workflowStatus: workflowStatus
          ? {
              code: workflowStatus,
            }
          : null,
        index: index,
      };
      await API.patch(API_ENDPOINTS.task.change_rank_mode_kanban, reqParams);

      return true;
    } catch (error: any) {
      console.log('error', error);
      // const toastProps = {
      //   type: 'error',
      //   message: 'Xác nhận thông tin',
      //   description: error?.message || 'Chỉnh sửa thất bại!',
      // };
      // dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};
