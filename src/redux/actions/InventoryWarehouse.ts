import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onSearchInventoryWarehouse = async (payload?: any) => {
  try {
    const status = payload.status ? payload.status : [];
    const reqParams = {
      searchText: payload.searchText ? payload.searchText : '',
      page: payload.page ? payload.page : 1,
      pageSize: payload.pageSize ? payload.pageSize : 10,
      projectCode: payload.project ? payload.project.toString() : null,
      formCode: payload.form ? payload.form : null,
      status: Array.from(status)?.includes('') ? '' : status.toString(),
    };
    const res = await API.get(API_ENDPOINTS.inventory_warehouse.search, {
      params: reqParams,
    });
    return res?.data?.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const onSearchInventoryWarehouseV2 = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        searchText: payload.searchText ? payload.searchText : '',
        page: payload.page ? payload.page : 1,
        pageSize: payload.pageSize ? payload.pageSize : 10,
        projectCode: payload.project ? payload.project.toString() : null,
        formCode: payload.form ? payload.form : null,
        status: payload.status ? payload.status.toString() : null,
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(API_ENDPOINTS.inventory_warehouse.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetInvetoryWarehouseDetailByCode = (
  inventoryWarehouseCode: string,
) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.inventory_warehouse.get_detail.replace(
          '{inventoryWarehouseCode}',
          inventoryWarehouseCode,
        ),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateInventoryWareHouse = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        form: payload.form
          ? {
              code: payload.form,
            }
          : null,
        project: payload.project
          ? {
              code: payload.project,
            }
          : null,
      };
      const res: any = await API.post(
        API_ENDPOINTS.inventory_warehouse.create,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Tạo kho hàng thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error.message ?? 'Tạo kho hàng thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateInventoryWarehouse = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        form: payload.form
          ? {
              code: payload.form,
            }
          : null,
        project: payload.project
          ? {
              code: payload.project,
            }
          : null,
      };
      const res: any = await API.patch(
        API_ENDPOINTS.inventory_warehouse.update,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Chỉnh sửa kho hàng thành công',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: 'Chỉnh sửa kho hàng thất bại',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteInventoryWarehouse = (code: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.inventory_warehouse.delete.replace(
          '{inventoryWarehouseCode}',
          code,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa Kho hàng thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa Kho hàng thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
