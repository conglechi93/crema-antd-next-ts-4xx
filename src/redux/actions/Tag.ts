import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onGetTags = (payload: any) => {
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
      const res = await API.get(API_ENDPOINTS.tags.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onCreateTags = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        description: payload.description,
        color: payload.color,
      };
      const res: any = await API.post(API_ENDPOINTS.tags.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo tags thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo tags thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateTags = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        color: payload.color,
      };
      const res: any = await API.patch(API_ENDPOINTS.tags.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Cập nhật tags thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Cập nhật tags thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteTags = (code: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.tags.delete.replace('{tagCode}', code),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa tags thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa tags thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
