import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from './style.module.scss';
import imgEmpty from 'assets/employees/empty.svg';

type AppNotFoundProp = {
  title?: string;
  description?: string;
};

const AppSearchEmployee = (props: AppNotFoundProp) => {
  const {title, description} = props;
  return (
    <div className={styles.app_not_found}>
      <Row gutter={[16, 8]} justify={'center'} align={'middle'}>
        <Col xs={24}>
          <img src={imgEmpty.src} alt={title} />
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>{title || 'Tìm kiếm nhân sự'}</AppTypo>
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-md-reg'>
            {description ||
              'Nhập chính xác số điện thoại của nhân sự để thêm vào doanh nghiệp của bạn.'}
          </AppTypo>
        </Col>
      </Row>
    </div>
  );
};

export default AppSearchEmployee;
