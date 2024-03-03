import API from 'api/Request';
import {API_ENDPOINTS} from 'services/apiUrl';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';

export const onSearchForms = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText ?? '',
        usedStatus: payload.status ? payload.status.toString() : null,
        isLoadMore: payload.isLoadMore ?? false,
      };
      const res = await API.get(API_ENDPOINTS.form.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateForm = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        description: payload.description,
        configProperties: payload.configProperties,
      };
      const res: any = await API.post(API_ENDPOINTS.form.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo thuộc tính thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo thuộc tính thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateForm = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        configProperties: payload.configProperties,
      };
      const res: any = await API.patch(API_ENDPOINTS.form.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Chỉnh sửa thuộc tính thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Chỉnh sửa thuộc tính thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onGetFormDetail = (formCode: string, forArea: boolean = false) => {
  return async (dispatch: any) => {
    try {
      if (!formCode) return null;
      let reqParams = {
        'f-a': forArea,
      };
      const res = await API.get(
        API_ENDPOINTS.form.get_form_detail.replace('{formCode}', formCode),
        {
          params: reqParams,
        },
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onDeleteForm = (formCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.delete(
        API_ENDPOINTS.form.delete.replace('{formCode}', formCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa Biểu mẫu thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa Biểu mẫu thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onExportFormByFormCode = async (formCode: string) => {
  try {
    const res = await API.get(
      API_ENDPOINTS.form.export_form_by_form_code.replace(
        '{formCode}',
        formCode,
      ),
      {
        responseType: 'blob',
      },
    );
    return res;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
