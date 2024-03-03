import IntlMessages from '@crema/utility/IntlMessages';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Col, Row} from 'antd';
import {FormInstance} from 'antd/lib';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import AppTypo from 'components/atoms/AppTypo';
import {useIntl} from 'react-intl';
import styles from './style.module.scss';

type PropsTypes = {
  record: any;
};
const RolesViewDetail = (props: PropsTypes) => {
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
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
          <Col className={styles.col_left}>
            <AppTypo variant='p-md-reg'>
              {messages['common.roleName'] as string}
            </AppTypo>
          </Col>
          <Col className={styles.col_right}>
            <AppTypo variant='p-md-reg'>{record?.name}</AppTypo>
          </Col>
        </Row>
        <Row gutter={[0, 0]} className={styles.col_item}>
          <Col className={styles.col_left}>
            <AppTypo variant='p-md-reg'>
              {messages['common.description'] as string}
            </AppTypo>
          </Col>
          <Col className={styles.col_right}>
            <AppTypo variant='p-md-reg'>{record?.description}</AppTypo>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RolesViewDetail;
