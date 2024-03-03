import { AppState } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetListProfile,
  onSetCurrentUser,
  onSetVarId,
} from 'redux/actions/Auth';
import { onGetAllAppParams } from 'redux/actions/Categories';
import { onGetShopDetail } from 'redux/actions/Shops';
import { initialUrl } from 'shared/constants/AppConst';
import { useAuth } from '../AuthProvider';

interface PreRenderContextProps {
  isPreLoading: boolean;
  isGetShopSuccess: boolean;
}
const PreRenderContext = createContext<PreRenderContextProps>({
  isPreLoading: true,
  isGetShopSuccess: true,
});

export const usePreRender = () => useContext(PreRenderContext);

interface PreRenderActionsProps {
  getShopDetail: (url: string) => void;
  getListProfile: () => void;
}

const PreRenderActionsContext = createContext<PreRenderActionsProps>({
  getShopDetail: () => {},
  getListProfile: () => {},
});

export const usePreRenderActions = () => useContext(PreRenderActionsContext);

type PrevRenderProps = {
  children: React.ReactNode;
};
const PreRenderProvider = (props: PrevRenderProps) => {
  const { children } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [preRenderData, setPreRenderData] = useState({
    isPreLoading: true,
    isGetShopSuccess: false,
  });
  const { currentUser } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  const { isLoading } = useAuth();

  const handleGetListProfile = async () => {
    const res: any = (await dispatch(onGetListProfile())) || [];
    return res;
  };

  const handleGetShopDetail = async (url: string) => {
    setPreRenderData({
      isPreLoading: true,
      isGetShopSuccess: false,
    });
    setTimeout(async () => {
      const res: any = await dispatch(onGetShopDetail());
      if (res) {
        await dispatch(onSetCurrentUser(res));
        await router.push(url);
      }
      setPreRenderData({
        isPreLoading: false,
        isGetShopSuccess: res ? true : false,
      });
    }, 500);
  };

  useEffect(() => {
    if (isLoading) {
      setPreRenderData({ isPreLoading: true, isGetShopSuccess: false });
      return;
    }
    const fetchCurrentUser = async () => {
      const response = await handleGetListProfile();
      // No account or error when call API
      if (!response || response.length === 0) {
        router.push('/');
        setPreRenderData({ isPreLoading: false, isGetShopSuccess: false });
        return;
      }
      const singleProfile = response.length === 1;
      const prefixUser = singleProfile ? response[0]?.detail?.authorId : null;
      // Not single profile and invalid currentUser
      if (!singleProfile && !currentUser) {
        await router.push('/');
      }

      // prefix User
      if (prefixUser) {
        const param = `U_${prefixUser}`;
        await dispatch(onSetVarId(param));
        await handleGetShopDetail(initialUrl);
        return;
      }
      setPreRenderData({ isPreLoading: false, isGetShopSuccess: true });
    };
    fetchCurrentUser();

    const fetchAllAppParams = async () => {
      await dispatch(onGetAllAppParams());
    };
    fetchAllAppParams();
  }, [isLoading]);

  return (
    <PreRenderContext.Provider value={preRenderData}>
      <PreRenderActionsContext.Provider
        value={{
          getShopDetail: handleGetShopDetail,
          getListProfile: handleGetListProfile,
        }}
      >
        {children}
      </PreRenderActionsContext.Provider>
    </PreRenderContext.Provider>
  );
};

export default PreRenderProvider;
