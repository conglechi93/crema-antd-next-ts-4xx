import API from 'api/Request';
import {API_ENDPOINTS} from 'services/apiUrl';
import {SHOW_MESSAGE} from 'shared/constants/ActionTypes';
export const onGetDepartments = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        page: payload.page ?? 1,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText ?? '',
        isLoadMore: payload.isLoadMore ?? false,
      };
      const res = await API.get(API_ENDPOINTS.departments.search, {
        params: reqParams,
      });
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetEmployeeAvailableToAddDepartment = (payload: any) => {
  return async (dispatch: any) => {
    const status = payload.status ? payload.status : [];
    const departments = payload.departments ? payload.departments : [];
    try {
      const reqParams = {
        page: payload.page,
        pageSize: payload.pageSize ?? 10,
        searchText: payload.searchText,
        status: Array.from(status)?.includes('') ? '' : status.toString(),
        departments: Array.from(departments)?.includes('')
          ? ''
          : departments.toString(),
        isLoadMore: payload.isLoadMore ? true : false,
      };
      const res = await API.get(
        API_ENDPOINTS.departments.search_availble_employees,
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

export const onGetDepartmentDetail = (code: any) => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(
        API_ENDPOINTS.departments.get_details.replace('{departmentCode}', code),
      );
      return res?.data?.data;
    } catch (error: any) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCreateDepartment = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const employee = payload.employee
        ? {
            code: payload.employee,
          }
        : null;
      const position = payload.position
        ? {
            code: payload.position,
          }
        : null;
      const reqParams = {
        name: payload.name,
        description: payload.description,
        managerWorkSpace:
          employee && position
            ? {
                employee: employee,
                position: position,
              }
            : null,
      };
      const res: any = await API.post(
        API_ENDPOINTS.departments.create,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Tạo phòng ban thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Tạo phòng ban thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onUpdateDepartment = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const employee = payload.employee
        ? {
            code: payload.employee,
          }
        : null;
      const position = payload.position
        ? {
            code: payload.position,
          }
        : null;
      const reqParams = {
        code: payload.code,
        name: payload.name,
        description: payload.description,
        managerWorkSpace:
          employee && position
            ? {
                employee: employee,
                position: position,
              }
            : null,
      };
      const res: any = await API.patch(
        API_ENDPOINTS.departments.update,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message || 'Chỉnh sửa phòng ban thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Chỉnh sửa phòng ban thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};

export const onDeleteDepartment = (code: string) => {
  return async (dispatch: any) => {
    try {
      const res: any = await API.delete(
        API_ENDPOINTS.departments.delete.replace('{departmentCode}', code),
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description: res?.data?.message ?? 'Xóa phòng ban thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      const toastProps = {
        type: 'error',
        message: 'Thông báo',
        description: error.message ?? 'Xóa phòng ban thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      console.log('error', error);
      return false;
    }
  };
};

export const onAddEmployeeToDepartment = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        departmentCode: payload.departmentCode,
        employeeWorkSpaces: payload?.employeeWorkSpaces,
      };
      const res: any = await API.post(
        API_ENDPOINTS.departments.add_employees,
        reqParams,
      );
      const toastProps = {
        type: 'success',
        message: 'Xác nhận thông tin',
        description:
          res?.data?.message || 'Thêm nhân viên vào phòng ban thành công!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return true;
    } catch (error: any) {
      console.log('error', error);
      const toastProps = {
        type: 'error',
        message: 'Xác nhận thông tin',
        description: error?.message || 'Thêm nhân viên vào phòng ban thất bại!',
      };
      dispatch({type: SHOW_MESSAGE, payload: toastProps});
      return false;
    }
  };
};
