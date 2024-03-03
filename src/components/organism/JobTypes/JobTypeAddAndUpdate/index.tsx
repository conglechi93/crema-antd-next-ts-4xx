import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Col, FormInstance, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import {useEffect} from 'react';
import {useIntl} from 'react-intl';
import useJobTypesAddAndUpdate from './useFunc';
import AppTypo from 'components/atoms/AppTypo';
import IntlMessages from '@crema/utility/IntlMessages';

type PropsType = {
  form: FormInstance;
  record: any;
  setModalInfo: (modalInfo: any) => void;
};
const JobTypesAddAndUpdate = (props: PropsType) => {
  const {form, record, setModalInfo} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record?.name,
        description: record?.description,
      });
    }
  }, [record]);

  const {handleFieldsChange} = useJobTypesAddAndUpdate(form, setModalInfo);

  return (
    <>
      <AppForm form={form} onFieldsChange={handleFieldsChange}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <AppTypo variant='p-lg-semi'>
              <IntlMessages id='common.generalInfomation' />
            </AppTypo>
          </Col>
          <Col xs={24}>
            <AppFormItem
              label={frl('common.jobTypeName')}
              name='name'
              rules={[{required: true, message: frm('common.jobTypeName')}]}
            >
              <AppInput
                type='text'
                placeholder={messages['common.jobTypeNameHint'] as string}
              />
            </AppFormItem>
          </Col>
          <Col xs={24}>
            <AppFormItem
              label={messages['common.description']}
              name='description'
            >
              <AppTextArea
                placeholder={messages['common.descriptionHint'] as string}
              />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>
    </>
  );
};

export default JobTypesAddAndUpdate;
