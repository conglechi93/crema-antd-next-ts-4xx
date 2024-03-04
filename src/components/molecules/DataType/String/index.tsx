import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Col, Row } from 'antd';
import AppCheckbox from 'components/atoms/AppCheckbox';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import { useIntl } from 'react-intl';

type PropsTypes = {
  disabled: boolean;
};
const PickListComponent = (props: PropsTypes) => {
  const { disabled } = props;
  const { messages } = useIntl();
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
                name={'minLength'}
                required
                label={frl('common.minimumNumberOfCharacters')}
                rules={[
                  {
                    required: true,
                    message: frm('common.minimumNumberOfCharacters'),
                  },
                ]}
              >
                <AppInput
                  disabled={disabled}
                  type='text'
                  placeholder={
                    messages['common.minimumNumberOfCharactersHint'] as string
                  }
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name={'maxLength'}
                required
                label={frl('common.maximumNumberOfCharacters')}
                rules={[
                  {
                    required: true,
                    message: frm('common.maximumNumberOfCharacters'),
                  },
                ]}
              >
                <AppInput
                  disabled={disabled}
                  type='text'
                  placeholder={
                    messages['common.maximumNumberOfCharactersHint'] as string
                  }
                />
              </AppFormItem>
            </Col>
          </Row>
        </Col>
        <Col>
          <AppFormItem name={'isRequired'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.required'] as string}
              disabled={disabled}
            />
          </AppFormItem>
          <AppFormItem name={'isNotDuplicate'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.notDuplicate'] as string}
              disabled={disabled}
            />
          </AppFormItem>
        </Col>
      </Row>
    </>
  );
};
export default PickListComponent;
