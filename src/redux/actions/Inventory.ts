import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onSubmitInventoriesFile = (formCode: string) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        key: formCode,
      };
      const res: any = await API.post(
        API_ENDPOINTS.inventory.submit_inventories_file,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Thông báo',
          description: res?.data?.message || 'Import file thành công!',
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
          description: error.message || 'Import file thất bại!',
        },
      });
      return false;
    }
  };
};

export const onCreateInventory = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const submitFormData = payload.submitFormData || {};
      const propertyList: Object = submitFormData.propertyList || {};
      const fileAttachments: Array<any> = submitFormData.fileAttachments || [];
      const fileAttachmentCode: Array<any> = [];
      fileAttachments.map((item: any) => {
        fileAttachmentCode.push({
          id: item.uid,
        });
      });
      const inventoryDetails: Array<any> = [];
      for (const [key, value] of Object.entries(propertyList)) {
        const pickListCode = value.pickListCode;
        const data = {
          configProperty: {
            code: value.code,
            configPickList: pickListCode
              ? {
                  code: pickListCode,
                }
              : null,
          },
          value: value?.value,
        };
        inventoryDetails.push(data);
      }
      const reqParams = {
        name: submitFormData.name,
        description: submitFormData.description || '',
        inventoryDetails: inventoryDetails,
        inventoryWarehouse: payload.code
          ? {
              code: payload.code,
            }
          : null,
        fileAttachments: fileAttachmentCode ?? [],
        videoUrl: submitFormData.videoUrl,
      };
      const res = await API.post(API_ENDPOINTS.inventory.create, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Thông báo',
          description: res?.data?.message || 'Thêm mặt hàng thành công!',
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
            : 'Thêm mặt hàng thất bại!',
        },
      });
      return false;
    }
  };
};

export const onUpdateInventory = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const submitFormData = payload.submitFormData || {};
      const propertyList: Object = submitFormData.propertyList || {};
      const fileAttachments: Array<any> = submitFormData.fileAttachments || [];
      const fileAttachmentCode: Array<any> = [];
      fileAttachments.map((item: any) => {
        fileAttachmentCode.push({
          id: item.uid,
        });
      });
      const inventoryDetails: Array<any> = [];
      for (const [key, value] of Object.entries(propertyList)) {
        const pickListCode = value.pickListCode;
        const data = {
          configProperty: {
            code: value.code,
            configPickList: pickListCode
              ? {
                  code: pickListCode,
                }
              : null,
          },
          value: value?.value,
        };
        inventoryDetails.push(data);
      }
      const reqParams = {
        name: submitFormData.name,
        code: payload.inventoryCode,
        description: submitFormData.description || '',
        inventoryDetails: inventoryDetails,
        inventoryWarehouse: payload.code
          ? {
              code: payload.code,
            }
          : null,
        fileAttachments: fileAttachmentCode ?? [],
        videoUrl: submitFormData.videoUrl,
      };
      const res = await API.patch(API_ENDPOINTS.inventory.update, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Thông báo',
          description: 'Chỉnh sửa mặt hàng thành công!',
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
            : 'Chỉnh sửa hàng thất bại!',
        },
      });
      return false;
    }
  };
};

export const onSearchInventory = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const reqParams = {
        page: payload.page || 1,
        pageSize: payload.pageSize || 10,
        searchText: payload.searchText || '',
        inventoryWarehouseCode:
          payload.inventoryWarehouseCode?.toString() || '',
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        excludeInventorySuccess: !!payload.excludeInventorySuccess,
      };
      const res = await API.get(API_ENDPOINTS.inventory.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onDeleteInventory = (inventoryCode: string) => {
  return async (dispatch: any) => {
    try {
      await API.delete(
        API_ENDPOINTS.inventory.delete.replace(
          '{inventoryCode}',
          inventoryCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Thông báo!',
        description: 'Xóa mặt hàng thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo!',
        description: error?.message || 'Xóa mặt hàng thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onImportExcelForm = (file: any) => {
  return async (dispatch: any) => {
    const formData = new FormData();
    formData.append('upload', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await API.post(
        API_ENDPOINTS.inventory.import_excel_form,
        formData,
        config,
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetExcelRecordsByKey = (payload: any) => {
  return async (dispatch: any) => {
    const reqParams = {
      key: payload.key,
      page: payload.page,
      pageSize: payload.pageSize,
      type: payload.type,
    };
    try {
      const res = await API.get(
        API_ENDPOINTS.inventory.review_inventories_file,
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

export const onGetInventoryDetailByCode = (
  inventoryCode: string,
  isViewInfo?: boolean,
) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        isViewInfo: isViewInfo ? true : false,
      };
      const res = await API.get(
        API_ENDPOINTS.inventory.get_detail.replace(
          '{inventoryCode}',
          inventoryCode,
        ),
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

export const onUploadInventoriesFile = (file: any, warehouseCode: string) => {
  return async (dispatch: any) => {
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('warehouseCode', warehouseCode);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await API.post(
        API_ENDPOINTS.inventory.upload_inventories_file,
        formData,
        config,
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo!',
        description: error.message || 'Import file thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};
