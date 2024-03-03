import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';
export const onAdminApproveRequest = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.salesProgramCode,
        action: payload.action,
        reason: payload.reason ?? '',
      };
      const res: any = await API.post(
        API_ENDPOINTS.sales_programs.admin_approve_request,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Thông báo',
          description: res?.data?.message ?? 'Cập nhật trạng thái thành công!',
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
          description: error.message ?? 'Cập nhật trạng thái thành công!',
        },
      });
      return false;
    }
  };
};
export const onAddInventoriesToProgram = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        salesProgramCode: payload.salesProgramCode,
        inventoryCodes: payload.inventoryCodes ? payload.inventoryCodes : [],
      };
      const res: any = await API.post(
        API_ENDPOINTS.sales_programs.add_inventories_to_program,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Thông báo',
          description: 'Thêm mặt hàng vào chương trình thành công!',
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
          description:
            error.message ?? 'Thêm mặt hàng vào chương trình thất bại!',
        },
      });
      return false;
    }
  };
};
export const onSearchInventoriesInSalesProgram = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        salesProgramCode: payload.salesProgramCode
          ? payload.salesProgramCode.toString()
          : '',
        inventoryWarehouseCode: payload.inventoryWarehouseCode
          ? payload.inventoryWarehouseCode.toString()
          : '',
        status: Array.from(status)?.includes('') ? '' : status.toString(),
      };
      const res = await API.get(
        API_ENDPOINTS.sales_programs.search_inventories,
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
export const onApproveRequestSalesProgram = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        action: payload.action,
      };
      const res: any = await API.post(
        API_ENDPOINTS.sales_programs.approval_request,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description:
          res?.data?.message ?? 'Thay đổi trạng thái chương trình thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description:
          error.message || 'Thay đổi trạng thái chương trình thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onSearchSalesPrograms = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        fromDate: payload.fromDate ? payload.fromDate.toString() : '',
        toDate: payload.toDate ? payload.toDate.toString() : '',
        status: Array.from(status)?.includes('') ? '' : status.toString(),
      };
      const res = await API.get(API_ENDPOINTS.sales_programs.search, {
        params: reqParams,
      });

      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetSalesProgramDetails = (salesProgramCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.sales_programs.get_details.replace(
          '{salesProgramCode}',
          salesProgramCode,
        ),
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return null;
    }
  };
};

export const onCreateSalesProgram = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        name: payload.name,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        commissionDiscount: payload.commissionDiscount,
        description: payload.description,
      };
      const res = await API.post(
        API_ENDPOINTS.sales_programs.create,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Tạo chương trình thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message || 'Tạo chương trình thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateSalesProgram = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        name: payload.name,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        commissionDiscount: payload.commissionDiscount,
        description: payload.description,
      };
      const res = await API.patch(
        API_ENDPOINTS.sales_programs.update,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Chỉnh sửa chương trình thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message || 'Chỉnh sửa chương trình thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteSalesProgram = (salesProgramCode?: any) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.sales_programs.delete.replace(
          '{salesProgramCode}',
          salesProgramCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description:
          res?.data?.message || 'Xóa mặt hàng ra khỏi chương trình thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description:
          error.message || 'Xóa măt hàng ra khỏi chương trình thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteInventorySalesProgram = (
  salesProgramDetailCode: string,
) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.sales_programs.delete_inventory.replace(
          '{salesProgramDetailCode}',
          salesProgramDetailCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description:
          res?.data?.message || 'Xóa mặt hàng trong chương trình thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message || 'Xóa chương trình thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onEnrollInventorySalesProgram = (
  salesProgramDetailCode: string,
) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.post(
        API_ENDPOINTS.sales_transactions.enroll.replace(
          '{salesProgramDetailCode}',
          salesProgramDetailCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message || 'Tham gia giao dịch thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message || 'Tham gia giao dịch thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};
