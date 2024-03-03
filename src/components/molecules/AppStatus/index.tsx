import {Col, Row} from 'antd';
import Image from 'next/image';
import emptryImg from '@/assets/images/empty.png';
import {memo} from 'react';

type AppStatusProps = {
  status: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
};

const AppStatus = (props: AppStatusProps) => {
  const {status, description, title} = props;
  const images = [emptryImg, emptryImg];
  return (
    <Row gutter={[0, 12]} className='layout_box'>
      <Col span={24} style={{textAlign: 'center'}}>
        <Image src={images[status]} height={100} width={160} alt='' />
      </Col>
      <Col span={24} style={{textAlign: 'center'}}>
        {title}
      </Col>
      <Col span={24} style={{textAlign: 'center'}}>
        {description}
      </Col>
    </Row>
  );
};

export default memo(AppStatus);
