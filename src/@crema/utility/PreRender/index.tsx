import { AppState } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetListProfile,
  onGetOrInitUserInfo,
  onGetShopInfoV2,
  onSetCurrentUser,
  onSetLoading,
  onSetVarId,
} from 'redux/actions/Auth';
import { onGetAllAppParams } from 'redux/actions/Categories';
import { initialUrl } from 'shared/constants/AppConst';
import { useAuth } from '../AuthProvider';

type PrevRenderProps = {
  children: React.ReactNode;
};
export const PreRender = (prop: PrevRenderProps) => {
  const { children } = prop;
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  const { isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }
    const fetchUserInfo = async () => {
      setLoading(true);
      dispatch(onSetLoading(true));
      const response: any = (await dispatch(onGetListProfile())) || [];
      if (response.length > 0) {
        if (response.length == 1) {
          const prefixUser = response[0]?.detail?.authorId;
          const param = `U_${prefixUser}`;
          await dispatch(onSetVarId(param));
          await dispatch(onGetOrInitUserInfo());
          const res: any = await dispatch(onGetShopInfoV2());
          if (res) {
            await dispatch(onSetCurrentUser(res[0]));
            await router.push(initialUrl);
            setLoading(false);
          }
        } else {
          if (!currentUser) {
            await router.push('/');
          } else {
            const res: any = await dispatch(onGetShopInfoV2());
            if (res) {
              await dispatch(onSetCurrentUser(res[0]));
              setLoading(false);
            }
          }
          setLoading(false);
        }
        dispatch(onSetLoading(false));
      } else {
        router?.push('/');
        setLoading(false);
      }
    };
    fetchUserInfo();

    const fetchAllAppParams = async () => {
      await dispatch(onGetAllAppParams());
    };
    fetchAllAppParams();
  }, [isLoading]);

  return <>{loading ? <></> : children}</>;
};
