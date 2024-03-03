import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';
import {dateTimeFormat} from 'shared/constants/AppConst';

export const onGetEmployeeStatus = (employeeCode: any) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.employees.get_status.replace(
          '{employeeCode}',
          employeeCode,
        ),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};
export const onGetEmployees = (payload: any) => {
  return async (dispatch: any) => {
    const status = payload.status ? payload.status : [];
    const positions = payload.positions ? payload.positions : [];
    const departments = payload.departments ? payload.departments : [];
    try {
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText,
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        positions: Array.from(positions)?.includes('')
          ? ''
          : positions.toString(),
        departments: Array.from(departments)?.includes('')
          ? ''
          : departments.toString(),
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(API_ENDPOINTS.employees.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onUpdateStatusEmployees = (payload: any) => {
  return async (dispatch: any) => {
    const status = payload.status ? payload.status : [];
    const code = payload.code ? payload.code : null;
    try {
      const reqParams = {
        status: status,
        code: code.toString(),
      };
      const res = await API.patch(
        API_ENDPOINTS.employees.update_status,
        reqParams,
      );
      const toastProps = {
        type: res?.data?.status || 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Cập nhật trạng thái nhân viên thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: 'Cập nhật trạng thái nhân viên thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return null;
    }
  };
};

export const onUpdateEmployee = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        code: payload.code ? payload.code : null,
        name: payload.name ? payload.name : null,
        email: payload.email ? payload.email : null,
        gender: payload.gender
          ? {
              code: payload.gender,
            }
          : null,
        birthday: payload.birthday
          ? payload?.birthday.format(dateTimeFormat[0])
          : null,
        province: payload.province
          ? {
              code: payload.province,
            }
          : null,
        district: payload.district
          ? {
              code: payload.district,
            }
          : null,
        wards: payload.wards
          ? {
              code: payload.wards,
            }
          : null,
        street: payload.street,
        labourContract: payload.labourContract
          ? {
              code: payload.labourContract,
            }
          : null,
        workSpaces: payload.workSpaces,
        fileAttachments: payload?.fileAttachments,
      };
      const res = await API.patch(API_ENDPOINTS.employees.update, reqParams);
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Cập nhật thông tin nhân viên thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error?.message || 'Cập nhật thông tin nhân viên thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onGetDetailEmployee = (employeeCode: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.employees.get_details.replace(
          '{employeeCode}',
          employeeCode,
        ),
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error.message || 'Lấy thông tin nhân viên thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return null;
    }
  };
};

export const onGetUserCMSByPhone = (phone: string) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.employees.get_user_cms.replace('{phone}', phone),
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };
};

export const onInviteUser = (ssoId: string) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        ssoId: ssoId,
      };
      const res: any = await API.post(
        API_ENDPOINTS.employees.invite_user,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Bạn đã thêm mới nhân sự thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Thông tin',
        description: error.message || 'Bạn đã thêm mới nhân sự thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onGetEmployeesLogs = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        employeeCode: payload?.employeeCode,
        types: payload.types ? payload.types.toString() : null,
        fromDate: payload?.fromDate ?? '',
        toDate: payload?.toDate ?? '',
      };
      const res = await API.get(API_ENDPOINTS.employees.get_logs, {
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
