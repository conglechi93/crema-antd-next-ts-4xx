import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onGetPickLists = (payload: any) => {
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
      const res = await API.get(API_ENDPOINTS.pick_lists.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetPickListByCode = (pickLickCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.pick_lists.get_by_code.replace(
          '{pickListCode}',
          pickLickCode,
        ),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreatePickList = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        description: payload.description,
        configPickListOptions: payload.configPickListOptions,
      };
      const res: any = await API.post(
        API_ENDPOINTS.pick_lists.create,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo dữ liệu DS thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo dữ liệu DS thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdatePickList = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code ?? '',
        name: payload.name ?? '',
        description: payload.description ?? '',
        configPickListOptions: payload.configPickListOptions ?? [],
      };
      const res: any = await API.patch(
        API_ENDPOINTS.pick_lists.update,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Cập nhật dữ liệu DS thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message || 'Cập nhật dữ liệu DS thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeletePickList = (code: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.pick_lists.delete.replace('{pickListCode}', code),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message || 'Xóa dữ liệu DS thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message || 'Xóa dữ liệu DS thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};
