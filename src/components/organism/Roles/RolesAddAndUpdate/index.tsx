import IntlMessages from '@crema/utility/IntlMessages';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Col, Row } from 'antd';
import { FormInstance } from 'antd/lib';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';

type PropsTypes = {
  form: FormInstance;
  handleFieldsChange: () => void;
};
const RolesAddAndUpdate = (props: PropsTypes) => {
  const { messages } = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const { form, handleFieldsChange } = props;
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>
          <IntlMessages id='common.generalInfomation' />
        </AppTypo>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <AppFormItem
            name='name'
            label={frl('common.roleName')}
            rules={[{ required: true, message: frm('common.roleName') }]}
          >
            <AppInput
              type='text'
              placeholder={messages['common.roleNameHint'] as string}
            />
          </AppFormItem>
          <AppFormItem
            name='description'
            label={<IntlMessages id='common.description' />}
          >
            <AppTextArea
              placeholder={messages['common.descriptionHint'] as string}
            />
          </AppFormItem>
        </AppForm>
      </Col>
    </Row>
  );
};

export default RolesAddAndUpdate;
