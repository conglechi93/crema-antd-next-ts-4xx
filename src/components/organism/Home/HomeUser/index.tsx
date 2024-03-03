import { Col, Radio, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import React, { useEffect, useState } from 'react';
import AppCard from 'components/molecules/AppCard';
import { RadioChangeEvent } from 'antd/lib';
import styles from '../style.module.scss';
import {
  onGetListProfile,
  onGetOrInitUserInfo,
  onGetShopInfoV2,
  onLogoutAll,
  onSetCurrentUser,
  onSetVarId,
} from 'redux/actions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { initialUrl } from 'shared/constants/AppConst';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import IntlMessages from '@crema/utility/IntlMessages';

const Users = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken, isAuthenticated } = useSelector<
    AppState,
    AppState['auth']
  >(({ auth }) => auth);
  const [dataUser, setDataUser] = useState<any>(null);

  useEffect(() => {
    const fetchListProfiles = async () => {
      if (!isAuthenticated) return;
      const res = await dispatch(onGetListProfile());
      if (res) setDataUser(res);
    };
    fetchListProfiles();
  }, [isAuthenticated]);

  const fetchAPI = async (value: any) => {
    const prefixUser = dataUser[0]?.detail?.authorId;
    const param = value == 1 ? `U_${prefixUser}` : `E_${prefixUser}`;
    await dispatch(onSetVarId(param));
    await dispatch(onGetOrInitUserInfo());
    const res: any = await dispatch(onGetShopInfoV2());
    if (res) {
      await dispatch(onSetCurrentUser(res[0]));
      router.push(initialUrl);
    }
  };
  const onChangeRadio = (e: RadioChangeEvent) => {
    const value = e.target.value;
    fetchAPI(value?.type?.code);
  };

  const handleLogout = async () => {
    await dispatch(onLogoutAll(accessToken));
  };
  return (
    <Row gutter={[0, 24]} className={styles.profiles}>
      <Col xs={24}>
        <AppTypo variant='h2'>
          <IntlMessages id='common.signIn' />
        </AppTypo>
      </Col>
      <Col xs={24}>
        <Radio.Group>
          {dataUser?.map((item: any, index: number) => {
            const name =
              item?.type?.code == 1
                ? item?.detail?.fullName
                : item?.detail?.name;
            return (
              <Radio key={index} value={item} onChange={onChangeRadio}>
                <AppCard
                  title={`Đăng nhập dưới tài khoản ${item?.type?.name} ${
                    name ?? 'Chưa cập nhật'
                  }`}
                  imageUrl={
                    item?.detail?.avatar
                      ? item?.detail?.avatar
                      : EmptyAvatar.src
                  }
                />
              </Radio>
            );
          })}
        </Radio.Group>
      </Col>
      <Col xs={24}>
        <AppButton type='primary' onClick={handleLogout}>
          <IntlMessages id='common.LogOut' />
        </AppButton>
      </Col>
      <Col xs={24}>
        <span className='hotline'>
          Hotline: <a href='tel:1900 3427'>1900 3427</a>
        </span>
      </Col>
    </Row>
  );
};

export default Users;
