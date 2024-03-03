import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {GET_SHOP_INFO} from 'types/actions/Shop.action';
import {fetchStart} from './Common';

export const onGetShopDetail = () => {
  return async (dispatch: any) => {
    dispatch(fetchStart());
    try {
      const res = await API.get(API_ENDPOINTS.shops.get_shop);
      if (res?.data) {
        dispatch({
          type: GET_SHOP_INFO,
          payload: res?.data,
        });
      }
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      dispatch({
        type: GET_SHOP_INFO,
        payload: null,
      });
      return false;
    }
  };
};
