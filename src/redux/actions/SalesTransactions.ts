import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onSearchInventoryTraders = (
  payload: any,
  salesProgramDetailCode: string,
) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page ? payload.page : 1,
        pageSize: payload.pageSize ? payload.pageSize : 10,
        searchText: payload.searchText ? payload.searchText : '',
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        fromDate: payload.fromDate ? payload.fromDate.toString() : '',
        toDate: payload.toDate ? payload.toDate.toString() : '',
      };
      const res = await API.get(
        API_ENDPOINTS.sales_transactions.search_inventory_traders.replace(
          '{salesProgramDetailCode}',
          salesProgramDetailCode,
        ),
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

export const onSearchSalesTransactions = (payload?: any) => {
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
      const res = await API.get(API_ENDPOINTS.sales_transactions.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onUpdateTransactionStatus = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        action: payload.action,
        code: payload.code,
      };
      const res = await API.post(
        API_ENDPOINTS.sales_transactions.update_status,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: 'Cập nhật trạng thái thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Cập nhật trạng thái thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onConfirmTransaction = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        salesProgramTransactionCode: payload.customerId,
        fileAttachments:
          payload.attachmentId > 0
            ? [
                {
                  id: payload.attachmentId,
                },
              ]
            : [],
      };
      const res: any = await API.post(
        API_ENDPOINTS.sales_transactions.confirm_transaction,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Cập nhật trạng thái thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Cập nhật trạng thái thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onAdminApproveStatusInventoryInSalesProgram = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code,
        action: payload.action,
        reason: payload.reason,
      };
      const res: any = await API.post(
        API_ENDPOINTS.sales_transactions.admin_approve_request,
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
