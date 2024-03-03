import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Form, FormInstance} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppTextArea from 'components/atoms/AppTextArea';

type RejectInventoryProps = {
  form: FormInstance;
};
const RejectInventory = (props: RejectInventoryProps) => {
  const {form} = props;
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  return (
    <AppForm form={form}>
      <AppFormItem
        name={'reason'}
        label={frl('common.reason')}
        rules={[{required: true, message: frm('common.reason')}]}
      >
        <AppTextArea />
      </AppFormItem>
    </AppForm>
  );
};
export default RejectInventory;
