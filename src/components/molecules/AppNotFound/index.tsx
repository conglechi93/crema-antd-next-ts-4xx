import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from './style.module.scss';
import imgEmpty from 'assets/image/empty.png';
import imgNotFound from 'assets/image/not-found.png';

type AppNotFoundProp = {
  loading: boolean;
  image?: string;
  title?: string;
  description?: string;
  isInitialRender?: boolean;
};

const AppNotFound = (props: AppNotFoundProp) => {
  const {
    loading = false,
    image,
    title,
    description,
    isInitialRender = false,
  } = props;

  if (loading) return null;
  return (
    <div className={styles.app_not_found}>
      <Row gutter={[16, 8]} justify={'center'} align={'middle'}>
        <Col xs={24}>
          <img
            src={isInitialRender ? imgEmpty.src : imgNotFound.src}
            alt={title}
          />
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>{title}</AppTypo>
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-md-reg'>{description}</AppTypo>
        </Col>
      </Row>
    </div>
  );
};

export default AppNotFound;
