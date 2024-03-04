import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Col, FormInstance, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelect from 'components/atoms/AppSelect';
import AppTypo from 'components/atoms/AppTypo';
import { ModalInfoProps } from 'components/molecules/AppModalV2';
import useUpdateCustomerStatus from './useFunc';
import { useIntl } from 'react-intl';

type UpdateCustomerStatusProps = {
  form: FormInstance;
  setModalInfo: (data: ModalInfoProps) => void;
};
const UpdateCustomerStatus = (props: UpdateCustomerStatusProps) => {
  const { form, setModalInfo } = props;
  const { messages } = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const { statusOptions, handleFieldsChange } = useUpdateCustomerStatus(
    form,
    setModalInfo,
  );
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>
          Vui lòng chọn trạng thái cho khách hàng:
        </AppTypo>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <AppFormItem
            name='status'
            label={frl('common.status')}
            rules={[{ required: true, message: fsrm('common.status') }]}
          >
            <AppSelect
              placeholder={messages['common.statusHint'] as string}
              allowClear
              options={statusOptions}
            />
          </AppFormItem>
        </AppForm>
      </Col>
    </Row>
  );
};

export default UpdateCustomerStatus;
