import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import { Col, Form, Row } from 'antd';
import useStep1 from './useStep1';
import { memo } from 'react';
import { ActionType } from 'shared/constants/AppVariables';
import { useIntl } from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import Validators from 'shared/validators';
import RenderAtormsV2 from 'components/molecules/RenderAtormsV2';
import TextArea from 'antd/es/input/TextArea';
import AppEditor from 'components/atoms/AppEditor';

type PropsTypes = {
  info: any;
  setDisabled: (value: boolean) => void;
  handleSetFormData: (dataItems: Array<{ key: string; value: any }>) => void;
};
const Step1 = (props: PropsTypes) => {
  const { info, setDisabled, handleSetFormData } = props;
  const [form] = Form.useForm();
  const {
    propertyList,
    handleChangeFormData,
    editorValue,
    setEditorValue,
    districtOptions,
    wardOptions,
  } = useStep1(info, form, setDisabled, handleSetFormData);
  const { messages } = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();

  const handleChangeEditor = (event, editor) => {
    const value = editor.getData();
    const data = {
      key: 'description',
      value: value,
    };
    handleSetFormData([data]);
    setEditorValue(value);
  };

  return (
    <div>
      <AppForm form={form} onFieldsChange={handleChangeFormData}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12} xl={8}>
            <AppFormItem
              name='name'
              label={frl('common.inventoryName')}
              rules={[
                {
                  required: true,
                  message: frm('common.inventoryName'),
                },
                {
                  validator: (_, v) => Validators.MinLength(v, 1),
                  message: `Tên mặt hàng tối thiểu ${2} ký tự`,
                },
              ]}
              required
            >
              <AppInput
                type='text'
                placeholder={messages['common.inventoryNameHint'] as string}
                disabled={info.type === ActionType.VIEW}
              />
            </AppFormItem>
          </Col>
          <RenderAtormsV2
            dataSource={propertyList}
            districtOptions={districtOptions}
            wardOptions={wardOptions}
            responsiveCol={{ xs: 24, sm: 12, md: 12, xl: 8 }}
          />
          <Col xs={24}>
            <AppEditor value={editorValue} onChange={handleChangeEditor} />
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};

export default memo(Step1);
