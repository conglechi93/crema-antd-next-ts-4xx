export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';
export const SET_TOKEN_FAILED = 'SET_TOKEN_FAILED';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_VARS_ID = 'SET_VARS_ID';

export const GET_LIST_PROFILE_SUCCESS = 'GET_LIST_PROFILE_SUCCESS';
export const GET_LIST_PROFILE_FAILED = 'GET_LIST_PROFILE_FAILED';

export interface SetAccessTokenActions {
  type: typeof SET_TOKEN_SUCCESS | typeof SET_TOKEN_FAILED;
  payload?: any;
}

export type AuthActionTypes = SetAccessTokenActions;
