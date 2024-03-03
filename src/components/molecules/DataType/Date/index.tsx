import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Col, Row} from 'antd';
import AppCheckbox from 'components/atoms/AppCheckbox';
import AppFormItem from 'components/atoms/AppFormItem';
import {useIntl} from 'react-intl';

type PropsTypes = {
  disabled: boolean;
};
const DateComponent = (props: PropsTypes) => {
  const {disabled} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <AppFormItem name={'isRequired'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.required']}
              disabled={disabled}
            />
          </AppFormItem>
        </Col>
      </Row>
    </>
  );
};
export default DateComponent;
