'use client';
import React, { memo } from 'react';
import styles from './style.module.scss';
import { AppState } from '@auth0/auth0-react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import HomeLogin from './Login';
import HomeUser from './HomeUser';
import Image from 'next/image';
import logoImg from 'assets/logo/logo.png';
import bgCover from 'assets/image/cover_bg.png';

const HomeComponent = () => {
  const { isAuthenticated } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  console.log('isAuthenticated', isAuthenticated);
  return (
    <div
      className={styles.home_page}
      style={{ backgroundImage: `url(${bgCover.src})` }}
    >
      <Row>
        <Col xs={{ span: 24 }}>
          <a href='/' className={styles.logo}>
            <Image src={logoImg} alt='Logo' />
          </a>
        </Col>
      </Row>
      <div className={styles.box_card}>
        {!isAuthenticated ? <HomeLogin /> : <HomeUser />}
      </div>
    </div>
  );
};

export default memo(HomeComponent);
