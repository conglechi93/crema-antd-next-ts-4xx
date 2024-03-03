import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onGetRoles = (payload: any) => {
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
      const res = await API.get(API_ENDPOINTS.roles.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onCreateRole = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        description: payload.description,
      };
      const res: any = await API.post(API_ENDPOINTS.roles.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Thêm vai trò thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? `Thêm vai trò thất bại!`,
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateRole = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        description: payload.description,
      };
      const res: any = await API.patch(API_ENDPOINTS.roles.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Chỉnh sửa vai trò thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? `Chỉnh sửa vai trò thất bại!`,
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteRole = (roleCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.roles.delete.replace('{roleCode}', roleCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Xóa vai trò thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Xóa vai trò thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
