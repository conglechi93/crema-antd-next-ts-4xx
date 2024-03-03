import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';

export const onGetProjectList = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        status: payload.status ? payload.status.toString() : '',
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(
        API_ENDPOINTS.project_management.get_list_project,
        {
          params: reqParams,
        },
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onSearchProject = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const workFlow = payload.workFlow ? payload.workFlow : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        workflowCodes: Array.from(workFlow)?.includes('')
          ? ''
          : workFlow.toString(),
      };
      const res = await API.get(API_ENDPOINTS.project_management.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetProjectDetail = (projectCode: string) => {
  return async (dispatch: any) => {
    try {
      if (!projectCode) return;
      const res = await API.get(
        API_ENDPOINTS.project_management.detail.replace(
          '{projectCode}',
          projectCode,
        ),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onCreateProject = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const projectMembers: Object = payload.projectMembers || {};
      const projectDetails: Array<any> = [];
      for (const [key, value] of Object.entries(projectMembers)) {
        projectDetails.push(value);
      }
      const reqParams = {
        name: payload.name ?? '',
        workflow: payload.workflow
          ? {
              code: payload.workflow.code.toString(),
            }
          : null,
        startDate: payload.startDate,
        endDate: payload.endDate,
        projectMembers: projectDetails,
        fileAttachments: payload?.fileAttachments,
        description: payload.description,
      };

      const res = await API.post(
        API_ENDPOINTS.project_management.create,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Thêm dự án thành công!',
        },
      });
      return true;
    } catch (error: any) {
      console.log('error', error);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'error',
          message: 'Thông báo',
          description: error.message ? error.message : 'Thêm dự án thất bại!',
        },
      });
      return false;
    }
  };
};

export const onUpdateProject = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const projectMembers: Object = payload.projectMembers || {};
      const projectDetails: Array<any> = [];
      for (const [key, value] of Object.entries(projectMembers)) {
        projectDetails.push(value);
      }
      const reqParams = {
        code: payload?.code,
        name: payload.name ?? '',
        workflow: payload.workflow
          ? {
              code: payload.workflow.code.toString(),
            }
          : null,
        startDate: payload.startDate,
        endDate: payload.endDate,
        projectMembers: projectDetails,
        fileAttachments: payload?.fileAttachments,
        description: payload.description,
      };
      const res = await API.patch(
        API_ENDPOINTS.project_management.update,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Cập nhật dự án thành công!',
        },
      });
      return true;
    } catch (error: any) {
      console.log('error', error);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'error',
          message: 'Thông báo',
          description: error.message
            ? error.message
            : 'Cập nhật dự án thất bại!',
        },
      });
      return false;
    }
  };
};

export const onDeleteProject = (projectCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.project_management.delete.replace(
          '{projectCode}',
          projectCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa dự án thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Xóa dự án thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
