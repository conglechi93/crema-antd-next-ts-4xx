import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Col, Row} from 'antd';
import AppCheckbox from 'components/atoms/AppCheckbox';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import {useIntl} from 'react-intl';
type PropsTypes = {
  disabled: boolean;
};
const NumberComponent = (props: PropsTypes) => {
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
        <Col span={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <AppFormItem
                name={'minValue'}
                required
                label={frl('common.minValue')}
                rules={[{required: true, message: frm('common.minValue')}]}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.minValueHint'] as string}
                  disabled={disabled}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name={'maxValue'}
                required
                label={frl('common.maxValue')}
                rules={[{required: true, message: frm('common.maxValue')}]}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.maxValueHint'] as string}
                  disabled={disabled}
                />
              </AppFormItem>
            </Col>
          </Row>
        </Col>
        <Col>
          <AppFormItem name={'isInteger'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.noneDisplayDecimal']}
              disabled={disabled}
            />
          </AppFormItem>
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
export default NumberComponent;
