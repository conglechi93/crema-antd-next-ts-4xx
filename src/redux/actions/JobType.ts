import API from 'api/Request';
import {API_ENDPOINTS} from 'services/apiUrl';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';
export const onGetJobTypes = async (payload: any) => {
  try {
    const status = payload.status ? payload.status : [];
    const reqParams = {
      page: payload.page ?? 1,
      pageSize: payload.pageSize ?? 10,
      searchText: payload.searchText ?? '',
      isLoadMore: payload.isLoadMore ?? false,
      usedStatus: Array.from(status)?.includes('') ? '' : status.toString(),
    };
    const res = await API.get(API_ENDPOINTS.jobType.search, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error: any) {
    console.log('error', error);
    return false;
  }
};

export const onGetDepartmentDetail = (code: any) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.departments.get_details.replace('{departmentCode}', code),
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateJobType = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        description: payload.description,
      };
      const res: any = await API.post(API_ENDPOINTS.jobType.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo loại công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo loại công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateJobType = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        description: payload.description,
      };
      const res: any = await API.patch(API_ENDPOINTS.jobType.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Cập nhật loại công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Cập nhật loại công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteJobType = (jobTypeCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.jobType.delete.replace('{jobTypeCode}', jobTypeCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa loại công việc thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa loại công việc thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
