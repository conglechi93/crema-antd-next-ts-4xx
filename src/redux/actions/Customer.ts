import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';
export const onGetCustomerList = (payload?: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const staffInCharges = payload.staffInCharges
        ? payload.staffInCharges
        : [];
      const customerGroup = payload.customerGroup ? payload.customerGroup : [];
      const customerSource = payload.customerSource
        ? payload.customerSource
        : [];
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        staffInCharges: staffInCharges.toString(),
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        customerGroup: Array.from(customerGroup)?.includes('')
          ? ''
          : customerGroup.toString(),
        customerSource: Array.from(customerSource)?.includes('')
          ? ''
          : customerSource.toString(),
        tags: payload.tags ? payload.tags.toString() : null,
        province: payload.province ?? '',
        district: payload.district ?? '',
        wards: payload.wards ?? '',
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(API_ENDPOINTS.customer.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onGetCustomerDetailByCode = (
  customerCode: string,
  isViewInfo?: boolean,
) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        isViewInfo: isViewInfo ? true : false,
      };
      const res = await API.get(
        API_ENDPOINTS.customer.get_details.replace(
          '{customerCode}',
          customerCode,
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

export const onCreateCustomer = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const submitFormData = payload.submitFormData || {};
      const propertyList: Object = submitFormData.propertyList || {};
      const customerDetails: Array<any> = [];
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
        customerDetails.push(data);
      }
      const fileAttachments: Array<any> =
        [...(submitFormData?.fileAttachments ?? [])] ?? [];
      const fileAttachmentsIds = fileAttachments?.map((file: any) => {
        return {
          id: file?.id?.toString(),
        };
      });
      const avatar: Array<any> = [...(submitFormData?.avatar ?? [])] ?? [];
      const firstAvatarId = avatar.find(() => true)?.toString() ?? null;
      const avatarIds = firstAvatarId ? {id: firstAvatarId} : null;

      const tags: Array<any> = submitFormData.tags ?? [];
      const reqParams = {
        avatar: avatarIds,
        name: submitFormData.name ?? '',
        phone: submitFormData.phone ?? '',
        status: submitFormData.status
          ? {
              code: submitFormData.status.toString(),
            }
          : null,
        customerSource: submitFormData.customerSource
          ? {
              code: submitFormData.customerSource.toString(),
            }
          : null,
        customerGroup: submitFormData.customerGroup
          ? {
              code: submitFormData.customerGroup.toString(),
            }
          : null,
        staffInCharges: submitFormData.staffInCharges
          ? submitFormData.staffInCharges.map((item: any) => {
              return {
                code: item.toString(),
              };
            })
          : null,
        fileAttachments: fileAttachmentsIds,
        customerDetails: customerDetails,
        customerWarehouse: {
          code: 'KKH1',
        },
        description: submitFormData.description,
        tags: tags.map((item: any) => {
          return {
            code: item.toString(),
          };
        }),
      };
      const res = await API.post(API_ENDPOINTS.customer.create, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Thêm khách hàng thành công!',
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
            : 'Thêm khách hàng thất bại!',
        },
      });
      return false;
    }
  };
};

export const onUpdateCustomer = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const submitFormData = payload.submitFormData || {};
      const propertyList: Object = submitFormData.propertyList || {};
      const customerDetails: Array<any> = [];
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
        customerDetails.push(data);
      }
      const fileAttachments: Array<any> =
        [...(submitFormData?.fileAttachments ?? [])] ?? [];
      const fileAttachmentsIds = fileAttachments?.map((file: any) => {
        return {
          id: file?.id?.toString(),
        };
      });
      const avatar: Array<any> = [...(submitFormData?.avatar ?? [])] ?? [];
      const firstAvatarId = avatar?.find(() => true)?.toString() ?? null;
      const avatarIds = firstAvatarId ? {id: firstAvatarId} : null;

      const tags: Array<any> = submitFormData.tags ?? [];
      const reqParams = {
        code: payload.customerCode ?? '',
        avatar: avatarIds,
        name: submitFormData.name ?? '',
        phone: submitFormData.phone ?? '',
        status: submitFormData.status
          ? {
              code: submitFormData.status.toString(),
            }
          : null,
        customerSource: submitFormData.customerSource
          ? {
              code: submitFormData.customerSource.toString(),
            }
          : null,
        customerGroup: submitFormData.customerGroup
          ? {
              code: submitFormData.customerGroup.toString(),
            }
          : null,
        staffInCharges: submitFormData.staffInCharges
          ? submitFormData.staffInCharges.map((item: any) => {
              return {
                code: item.toString(),
              };
            })
          : null,
        fileAttachments: fileAttachmentsIds,
        customerDetails: customerDetails,
        customerWarehouse: {
          code: 'KKH1',
        },
        description: submitFormData.description,
        tags: tags.map((item: any) => {
          return {
            code: item.toString(),
          };
        }),
      };

      const res = await API.patch(API_ENDPOINTS.customer.create, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Cập nhật khách hàng thành công!',
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
            : 'Cập nhật khách hàng thất bại!',
        },
      });
      return false;
    }
  };
};

export const onDeleteCustomer = (customerCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.customer.delete.replace('{customerCode}', customerCode),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa khách hàng thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Xóa khách hàng thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};

export const onAddMultipleTags = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {customers, tags} = payload;
      const reqParams = {
        customers: customers,
        tags: tags?.map((key: string) => {
          return {
            code: key,
          };
        }),
      };
      const res = await API.post(API_ENDPOINTS.customer.add_tags, reqParams);
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Thêm tags thành công!',
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
          description: error.message ? error.message : 'Thêm tags thất bại!',
        },
      });
      return false;
    }
  };
};

export const onAddCustomerInventoryInterested = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        customerCode: payload.customerCode,
        inventories: payload.inventories,
      };
      const res = await API.post(
        API_ENDPOINTS.customer.add_inventories_interested,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description: res?.data?.message || 'Thêm BĐS quan tâm thành công!',
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
            : 'Thêm BĐS quan tâm thất bại!',
        },
      });
      return false;
    }
  };
};

export const onGetCustomerLogs = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        customerCode: payload?.customerCode,
        types: payload.types ? payload.types.toString() : null,
        fromDate: payload?.fromDate ?? '',
        toDate: payload?.toDate ?? '',
      };
      const res = await API.get(API_ENDPOINTS.customer.get_logs, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error.message || 'Lấy thông tin thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return null;
    }
  };
};

export const onAddCustomerEmployeeInCharge = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const employee = payload?.employee?.map((code: any) => {
        return {
          code: code,
        };
      });
      const reqParams = {
        customers: payload.customers,
        employees: employee,
      };
      const res = await API.post(
        API_ENDPOINTS.customer.add_staff_in_charge,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description:
            res?.data?.message || 'Thêm nhân viên chăm sóc thành công!',
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
            : 'Thêm nhân viên chăm sóc thất bại!',
        },
      });
      return false;
    }
  };
};
export const onGetInventoryInterested = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const status = payload.status ? payload.status : [];
      const inventoryWarehouseCode = payload?.inventoryWarehouseCode
        ? payload?.inventoryWarehouseCode.toString()
        : '';
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload?.searchText ?? '',
        customerCode: payload?.customerCode,
        inventoryWarehouseCode: Array.from(inventoryWarehouseCode)?.includes('')
          ? ''
          : inventoryWarehouseCode.toString(),
        status: Array.from(status)?.includes('') ? '' : status.toString(),
      };
      const res = await API.get(
        API_ENDPOINTS.customer.get_inventories_interested,
        {
          params: reqParams,
        },
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error.message || 'Lấy thông tin thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return null;
    }
  };
};

export const onDeleteCustomerInventories = (customerCode: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.customer.delete_inventories_interested.replace(
          '{customerCode}',
          customerCode,
        ),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa khách hàng thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message ?? 'Xóa khách hàng thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};

export const onUpdateCustomerStatus = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const {code, status} = payload;
      const reqParams = {
        status: status
          ? {
              code: status,
            }
          : null,
        code: code,
      };
      const res = await API.patch(
        API_ENDPOINTS.customer.update_customer_status,
        reqParams,
      );
      dispatch({
        type: SHOW_MESSAGE,
        payload: {
          type: 'success',
          message: 'Xác nhận thông tin',
          description:
            res?.data?.message || 'Cập nhật trạng thái khách hàng thành công!',
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
            : 'Cập nhật trạng thái khách hàng thất bại!',
        },
      });
      return false;
    }
  };
};

export const onUploadCustomersFile = (file: any) => {
  return async (dispatch: any) => {
    const formData = new FormData();
    formData.append('upload', file);
    formData.append('warehouseCode', 'KKH1');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await API.post(
        API_ENDPOINTS.customer.upload_customer_file,
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

export const onSubmitCustomerFile = (key: string) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        key: key,
      };
      const res: any = await API.post(
        API_ENDPOINTS.customer.submit_file,
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

export const onGetCustomerMerge = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        searchText: payload.searchText,
        propertyCodeConditions: payload.propertyCodeConditions
          ? payload.propertyCodeConditions.toString()
          : [],
        formCode: 'BM2',
      };
      const res = await API.get(API_ENDPOINTS.customer.get_customer_merge, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onGetCustomerTableView = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize,
        customerCodes: payload.customerCode
          ? payload.customerCode.toString()
          : '',
      };
      const res = await API.get(
        API_ENDPOINTS.customer.get_customer_table_view,
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

export const onDownloadCustomers = async (searchParams: any) => {
  try {
    const status = searchParams.status ? searchParams.status : [];
    const staffInCharges = searchParams.staffInCharges
      ? searchParams.staffInCharges
      : [];
    const customerGroup = searchParams.customerGroup
      ? searchParams.customerGroup
      : [];
    const customerSource = searchParams.customerSource
      ? searchParams.customerSource
      : [];
    const reqParams = {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      searchText: searchParams.searchText,
      staffInCharges: staffInCharges.toString(),
      status: Array.from(status)?.includes('') ? '' : status.toString(),
      customerGroup: Array.from(customerGroup)?.includes('')
        ? ''
        : customerGroup.toString(),
      customerSource: Array.from(customerSource)?.includes('')
        ? ''
        : customerSource.toString(),
      tags: searchParams.tags ? searchParams.tags.toString() : null,
      province: searchParams.province ?? '',
      district: searchParams.district ?? '',
      wards: searchParams.wards ?? '',
    };
    const res = await API.get(API_ENDPOINTS.customer.download_customers, {
      responseType: 'blob',
      params: reqParams,
    });
    return res;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
