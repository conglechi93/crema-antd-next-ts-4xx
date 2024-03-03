import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import Image from 'next/image';
import React from 'react';
import logoImg from 'assets/image/login.svg';
import styles from '../style.module.scss';
import { createChallenge } from 'utils/CodeChallenge';
import { useRouter } from 'next/navigation';
import IntlMessages from '@crema/utility/IntlMessages';

const HomeLogin = () => {
  const router = useRouter();
  const handleLogin = async () => {
    const REACT_APP_SSO_SERVER_URL = process.env.REACT_APP_SSO_SERVER_URL;
    const APP_CODE = process.env.REACT_APP_SSO_APP_CODE;
    const CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
    const challenge = await createChallenge();
    const urlObj = new URL(window.location.href);
    urlObj.hash = '';
    window.history.pushState('', '', urlObj);
    const redirectTo = window.location.href;
    const codeVerifier = challenge.code_verifier;
    localStorage.setItem('codeVerifier', codeVerifier);
    const codeChallenge = challenge.code_challenge;
    const url = `${REACT_APP_SSO_SERVER_URL}?redirectTo=${redirectTo}&appCode=${APP_CODE}&clientId=${CLIENT_ID}&codeChallenge=${codeChallenge}`;
    console.log(url);
    router.push(url);
  };
  return (
    <div className={styles.box_login}>
      <Row gutter={[0, 24]}>
        <Col xs={{ span: 24 }}>
          <AppTypo variant='h2'>
            <IntlMessages id='common.signIn' />
          </AppTypo>
        </Col>
        <Col xs={{ span: 24 }}>
          <Image src={logoImg} alt='Đăng nhập' className='img' />
        </Col>
        <Col xs={{ span: 24 }}>
          <AppButton type='primary' onClick={handleLogin}>
            <IntlMessages id='common.LoginViaVARsID' />
          </AppButton>
        </Col>
        <Col xs={{ span: 24 }}>
          <span className='hotline'>
            Hotline: <a href='tel:1900 3427'>1900 3427</a>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default HomeLogin;
