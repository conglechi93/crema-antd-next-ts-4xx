import IntlMessages from '@crema/utility/IntlMessages';
import {Col, ColorPicker, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import {useIntl} from 'react-intl';
import styles from './style.module.scss';

type PropsTypes = {
  record: any;
};
const JobTypeViewDetail = (props: PropsTypes) => {
  const {messages} = useIntl();
  const {record} = props;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>
          <IntlMessages id='common.generalInfomation' />
        </AppTypo>
      </Col>
      <Col xs={24}>
        <Row gutter={[0, 0]} className={styles.col_item}>
          <Col xs={24}>
            <Row gutter={[0, 0]} align={'middle'}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  {messages['common.jobTypeName'] as string}
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>{record?.name}</AppTypo>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[0, 8]}>
          <Col xs={24}>
            <AppTypo variant='p-md-reg'>
              {messages['common.description'] as string}
            </AppTypo>
          </Col>
          <Col xs={24}>
            <AppTypo variant='p-md-reg'>{record?.description}</AppTypo>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default JobTypeViewDetail;
