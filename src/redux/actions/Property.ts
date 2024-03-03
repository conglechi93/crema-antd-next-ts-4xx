import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';

export const onGetAllPropertyList = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        searchText: payload.searchText,
        dataTypeCode: payload.dataTypeCode
          ? payload.dataTypeCode.toString()
          : null,
        isSystem: payload.isSystem,
        isInvisible: payload.isInvisible,
      };
      const res = await API.get(API_ENDPOINTS.property.search_all, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onGetPropertyList = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const dataTypes = payload.dataTypeCode ? payload.dataTypeCode : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        dataTypeCode: Array.from(dataTypes)?.includes('')
          ? ''
          : dataTypes.toString(),
        usedStatus: Array.from(status)?.includes('') ? '' : status.toString(),
        isInvisible: payload.isInvisible,
        isSystem: payload.isSystem,
      };
      const res = await API.get(API_ENDPOINTS.property.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onGetPropertyDetailByCode = (propertyCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.property.get_details.replace(
          '{propertyCode}',
          propertyCode,
        ),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};
export const onCreateProperty = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        // Required
        name: payload.name,
        description: payload.description,
        configDataType: payload.configDataType,
        isRequired: payload.isRequired,

        // Pick list
        configPickList: payload.configPickList,
        isMultiChoice: payload.isMultiChoice, // true or false

        // Number or Money
        isInteger: payload.isInteger, // true or false
        unit: payload.unit,
        minValue: payload.minValue ? Number(payload.minValue) : null,
        maxValue: payload.maxValue ? Number(payload.maxValue) : null,

        // String
        minLength: payload.minLength ? Number(payload.minLength) : null,
        maxLength: payload.maxLength ? Number(payload.maxLength) : null,
        isNotDuplicate: payload.isNotDuplicate, // true or false

        // Phone
        isAcceptStandardizedPhone: payload.isAcceptStandardizedPhone, // true or false
      };
      const res: any = await API.post(API_ENDPOINTS.property.create, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Thêm thuộc tính thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? `Thêm thuộc tính thất bại!`,
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateProperty = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        // Required
        code: payload.code,
        name: payload.name,
        description: payload.description,
        configDataType: payload.configDataType,
        isRequired: payload.isRequired,

        // Pick list
        configPickList: payload.configPickList,
        isMultiChoice: payload.isMultiChoice, // true or false

        // Number or Money
        isInteger: payload.isInteger, // true or false
        unit: payload.unit,
        minValue: payload.minValue ? Number(payload.minValue) : null,
        maxValue: payload.maxValue ? Number(payload.maxValue) : null,

        // String
        minLength: payload.minLength ? Number(payload.minLength) : null,
        maxLength: payload.maxLength ? Number(payload.maxLength) : null,
        isNotDuplicate: payload.isNotDuplicate, // true or false

        // Phone
        isAcceptStandardizedPhone: payload.isAcceptStandardizedPhone, // true or false
      };
      const res = await API.patch(API_ENDPOINTS.property.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Thông báo',
        description: res?.data?.message ?? 'Chỉnh sửa thuộc tính thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Chỉnh sửa thuộc tính thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteProperty = (propertyCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.property.delete.replace('{propertyCode}', propertyCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa thuộc tính thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Xóa thuộc tính thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};
