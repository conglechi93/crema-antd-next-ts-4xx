import {
  CLEAN_STATE,
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_LOADING,
  SET_TOKEN_FAILED,
  SET_TOKEN_SUCCESS,
} from 'shared/constants/ActionTypes';
import {
  GET_LIST_PROFILE_FAILED,
  GET_LIST_PROFILE_SUCCESS,
  SET_CURRENT_USER,
  SET_VARS_ID,
} from 'types/actions/Auth.actions';

export type InitialStateType = {
  loading: boolean;
  profile: any;
  error: any;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  currentUser: any | null;
  varsId: null | string;
  listProfile: any[];
};

const initialState: InitialStateType = {
  loading: false,
  profile: null,
  error: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  currentUser: null,
  varsId: null,
  listProfile: [],
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LIST_PROFILE_SUCCESS: {
      return {
        ...state,
        listProfile: action.payload,
      };
    }
    case GET_LIST_PROFILE_FAILED: {
      return {
        ...state,
        listProfile: [],
      };
    }
    case SET_VARS_ID: {
      return {
        ...state,
        varsId: action.payload,
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case SET_TOKEN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        isAuthenticated: true,
        error: null,
      };
    }
    case SET_TOKEN_FAILED: {
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    case LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: action.payload,
        isAuthenticated: true,
      };
    }
    case GET_PROFILE_FAILED: {
      return {
        ...state,
        profile: null,
        loading: false,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
