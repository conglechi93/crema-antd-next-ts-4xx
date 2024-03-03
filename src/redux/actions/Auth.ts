import API from 'api/Request';
import {
  CLEAN_STATE,
  SET_TOKEN_FAILED,
  SET_TOKEN_SUCCESS,
  SET_LOADING,
} from 'shared/constants/ActionTypes';
import { API_ENDPOINTS } from 'services/apiUrl';
import { Dispatch } from 'redux';
import { CodeChallengePayload } from 'types/payload/Auth.payload';
import { fetchStart } from './Common';
import {
  GET_LIST_PROFILE_SUCCESS,
  SET_CURRENT_USER,
  SET_VARS_ID,
} from 'types/actions/Auth.actions';
import { AppActions } from 'types';

export const onSetVarId = (varsId: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_VARS_ID,
      payload: varsId,
    });
  };
};

export const onSetCurrentUser = (user: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };
};

export const onSetLoading = (value: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

export const onGetOrInitUserInfo = () => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(API_ENDPOINTS.user.get_users);
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetShopInfoV2 = () => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(API_ENDPOINTS.auth.get_shop_v2);
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onCheckSessionInSSO = () => {
  return async (dispatch: any) => {
    dispatch(fetchStart());
    try {
      const config = {
        baseURL: process.env.BASE_SSO_URL,
        withCredentials: true,
      };
      const res = await API.get(API_ENDPOINTS.auth.check_session, config);
      return res?.data?.code === 200;
    } catch (error) {
      dispatch({
        type: SET_TOKEN_FAILED,
      });
    }
  };
};

export const onSetAccessToken = (
  codeChallengePayload: CodeChallengePayload,
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    const reqParams = {
      ...codeChallengePayload,
      appCode: process.env.REACT_APP_SSO_APP_CODE,
      clientId: process.env.REACT_APP_SSO_CLIENT_ID,
      clientSecret: process.env.REACT_APP_SSO_CLIENT_SECRET,
    };
    const config = {
      baseURL: process.env.BASE_SSO_URL,
    };
    try {
      const res = await API.post(
        API_ENDPOINTS.auth.code_challenge,
        reqParams,
        config,
      );
      const accessToken: string | null = res?.data?.data?.accessToken;
      const refreshToken: string | null = res?.data?.data?.refreshToken;
      dispatch({
        type: SET_TOKEN_SUCCESS,
        payload: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: SET_TOKEN_FAILED,
      });
    }
  };
};

export const onCheckPassword = (password: any) => {
  return async (dispatch: any) => {
    const reqParams = {
      password: password,
    };
    try {
      await API.post(API_ENDPOINTS.auth.check_password, reqParams);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onGetListProfile = () => {
  return async (dispatch: any) => {
    try {
      const res = await API.get(API_ENDPOINTS.user.list_profile);
      dispatch({
        type: GET_LIST_PROFILE_SUCCESS,
        payload: res?.data?.data,
      });
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: GET_LIST_PROFILE_SUCCESS,
      });
    }
  };
};

export const onLogout = (accessToken: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        sessionToken: accessToken,
      };
      const res = await API.post(API_ENDPOINTS.auth.logout, reqParams);
      if (res) {
        dispatch({
          type: CLEAN_STATE,
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onLogoutAll = (accessToken: any) => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        sessionToken: accessToken,
      };
      const config = {
        baseURL: process.env.BASE_SSO_URL,
      };
      await API.post(API_ENDPOINTS.auth.logout_all, reqParams, config);
      dispatch({
        type: CLEAN_STATE,
      });
      return true;
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: CLEAN_STATE,
      });
      return false;
    }
  };
};

export const onLoginV3S = () => {
  return async (dispatch: any) => {
    try {
      const reqParams = {
        email: 'truong@due.udn.vn',
        password: 'Abc123456@',
      };
      const res = await API.post(API_ENDPOINTS.auth.logout, reqParams);
      if (res) {
        dispatch({
          type: CLEAN_STATE,
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};
