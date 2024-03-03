import {Col, Row} from 'antd';
import {memo} from 'react';

type AppColProps = {
  children: React.ReactNode[];
};
const AppThreeCols = (props: AppColProps) => {
  const {children} = props;
  return (
    <Row gutter={[16, 0]}>
      {children?.map((item, index) => {
        return (
          <Col xs={24} sm={24} md={8} key={index} style={{padding: '8px'}}>
            {item}
          </Col>
        );
      })}
    </Row>
  );
};

export default memo(AppThreeCols); // AppThreeCols
