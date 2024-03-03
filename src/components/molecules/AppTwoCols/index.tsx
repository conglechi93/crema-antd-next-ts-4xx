import {Col, Row} from 'antd';

type AppColProps = {
  children: React.ReactNode[];
};
const AppTwoCols = (props: AppColProps) => {
  const {children} = props;
  return (
    <Row gutter={[16, 16]}>
      {children?.map((item, index) => {
        return (
          <Col xs={24} sm={12} key={index}>
            {item}
          </Col>
        );
      })}
    </Row>
  );
};

export default AppTwoCols;
