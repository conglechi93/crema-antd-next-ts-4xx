import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';

export const onSearchWorkflow = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        usedStatus: Array.from(status)?.includes('') ? '' : status.toString(),
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(API_ENDPOINTS.workflow.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetWorkflowDetail = (workflowCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.workflow.detail.replace('{workflowCode}', workflowCode),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onCreateWorkflow = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const workflows: Object = payload.workflowDetails || {};
      const workflowDetails: Array<any> = [];
      for (const [key, value] of Object.entries(workflows)) {
        workflowDetails.push(value);
      }
      const reqParams = {
        name: payload.name ?? '',
        description: payload.description,
        workflowDetails: workflowDetails,
      };
      const res = await API.post(API_ENDPOINTS.workflow.create, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Thêm công việc thành công!',
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
            : 'Thêm công việc thất bại!',
        },
      });
      return false;
    }
  };
};

export const onUpdateWorkflow = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const workflows: Object = payload.updateWorkflowDetails || {};
      const updateWorkflowDetails: Array<any> = [];
      for (const [key, value] of Object.entries(workflows)) {
        updateWorkflowDetails?.push({
          code: value?.code,
          name: value?.name,
        });
      }
      const reqParams = {
        code: payload.code ?? '',
        name: payload.name ?? '',
        description: payload.description,
        updateWorkflowDetails: updateWorkflowDetails,
      };
      const res = await API.patch(API_ENDPOINTS.workflow.update, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Cập nhật công việc thành công!',
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
            : 'Cập nhật công việc thất bại!',
        },
      });
      return false;
    }
  };
};

export const onDeleteWorkflow = (workflowCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.workflow.delete.replace('{workflowCode}', workflowCode),
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
        description: error?.message ?? 'Xóa công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
