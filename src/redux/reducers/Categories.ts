import { CLEAN_STATE } from 'shared/constants/ActionTypes';
import {
  GET_ALL_APP_PARAMS_FAILED,
  GET_ALL_APP_PARAMS_SUCCESS,
} from 'types/actions/Categories.action';

export type InitialStateType = {
  categories: any;
  configurations: any;
  imageUrls: string | string[] | null;
};

const initialState: InitialStateType = {
  categories: null,
  configurations: null,
  imageUrls: null,
};

const catetoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_APP_PARAMS_SUCCESS: {
      return {
        ...state,
        imageUrls: action.payload.imageUrls,
        categories: action.payload.categories,
        configurations: action.payload.configurations,
      };
    }
    case GET_ALL_APP_PARAMS_FAILED: {
      return {
        ...state,
        imageUrls: null,
        categories: null,
        configurations: null,
      };
    }
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
};
export default catetoryReducer;
