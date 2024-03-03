import {Col, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';

type PropsType = {
  t: any;
  laneId: string;
};
const NewCardForm = (props: PropsType) => {
  const {t, laneId} = props;
  return (
    <Row gutter={[8, 8]} align='middle' justify={'end'}>
      <Col flex={'88px'}>
        <AppButton
          type='primary'
          onClick={() => {
            t(laneId);
          }}
        >
          Thêm mới
        </AppButton>
      </Col>
    </Row>
  );
};
export default NewCardForm;
