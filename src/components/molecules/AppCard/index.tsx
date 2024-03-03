import {Avatar, Col, Row} from 'antd';
import {memo} from 'react';
import AppTypo from 'components/atoms/AppTypo';
import styles from './style.module.scss';

type AppCardProps = {
  title?: string | React.ReactNode;
  imageUrl?: string | React.ReactNode;
};

const AppCard = (props: AppCardProps) => {
  const {imageUrl, title} = props;
  return (
    <Row gutter={[0, 16]} className={styles.app_card}>
      <Col xs={{span: 24}}>
        <Avatar size={60} src={imageUrl} />
      </Col>
      <Col xs={{span: 24}}>
        <AppTypo variant='p-md-reg'>{title}</AppTypo>
      </Col>
    </Row>
  );
};

export default memo(AppCard);
