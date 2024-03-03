import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Col, ColorPicker, FormInstance, Row} from 'antd';
import {Color} from 'antd/es/color-picker';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useTagsAddAndUpdate from './useFunc';
import AppTypo from 'components/atoms/AppTypo';
import IntlMessages from '@crema/utility/IntlMessages';

type PropsType = {
  form: FormInstance;
  record: any;
  setModalInfo: (modalInfo: any) => void;
};
const TagsAddAndUpdate = (props: PropsType) => {
  const {form, record, setModalInfo} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const [colorHex, setColorHex] = useState<any>('');
  const [formatHex, setFormatHex] = useState<any>('hex');
  const handleChangeColor = (color: Color) => {
    setColorHex(color);
    form.setFieldsValue({
      color: color.toHexString(),
    });
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record?.name,
        color: record?.color,
        description: record?.description,
      });
    } else {
      setColorHex('#1677FF');
      setFormatHex('hex');
      form.setFieldsValue({
        color: '#1677FF',
      });
    }
  }, [record]);

  const {handleFieldsChange} = useTagsAddAndUpdate(form, setModalInfo);

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
            <Row gutter={16}>
              <Col xs={12}>
                <AppFormItem
                  label={frl('common.tagName')}
                  name='name'
                  rules={[{required: true, message: frm('common.tagName')}]}
                >
                  <AppInput
                    type='text'
                    placeholder={messages['common.tagNameHint'] as string}
                  />
                </AppFormItem>
              </Col>
              <Col xs={12}>
                <AppFormItem
                  label={frl('common.color')}
                  name='color'
                  rules={[{required: true, message: frm('common.color')}]}
                >
                  <ColorPicker
                    format={formatHex}
                    value={colorHex}
                    onChange={handleChangeColor}
                    onFormatChange={setFormatHex}
                  />
                </AppFormItem>
              </Col>
            </Row>
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

export default TagsAddAndUpdate;
