import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import AppTextArea from 'components/atoms/AppTextArea';
import AppRangePicker from 'components/atoms/AppRangePicker';
import CalendarImg from 'assets/icon/Calendar.png';
import {FormInstance} from 'antd/lib';
import {convertInputToNumber} from 'utils/FormUtils';
type PropsType = {
  form: FormInstance;
  handleCheckFormData: () => void;
};
const SalesProgramContent = (props: PropsType) => {
  const {form, handleCheckFormData} = props;
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {messages} = useIntl();
  // const {RangePicker} = DatePicker;
  return (
    <div>
      <AppForm form={form} onFieldsChange={handleCheckFormData}>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              <Col xs={8}>
                <AppFormItem
                  name={'name'}
                  label={frl('common.salesProgramName')}
                  required
                  rules={[
                    {required: true, message: frm('common.salesProgramName')},
                  ]}
                >
                  <AppInput
                    type='text'
                    placeholder={
                      messages['common.salesProgramNameHint'] as string
                    }
                    minLength={2}
                    maxLength={100}
                  />
                </AppFormItem>
              </Col>
              <Col xs={8}>
                <AppFormItem
                  name={'time'}
                  label={frl('common.time')}
                  required
                  rules={[{required: true, message: frm('common.time')}]}
                >
                  <AppRangePicker
                    suffixIcon={<img src={CalendarImg.src} alt='' />}
                  />
                </AppFormItem>
              </Col>
              <Col xs={8}>
                <AppFormItem
                  name={'commissionDiscount'}
                  label={frl('common.commission')}
                  required
                  rules={[
                    {
                      required: true,
                      message: frm('common.commission'),
                    },
                  ]}
                  normalize={(value) => convertInputToNumber(value)}
                >
                  <AppInput
                    type='text'
                    placeholder='0'
                    suffix='%'
                    maxLength={2}
                  />
                </AppFormItem>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <AppFormItem
              name={'description'}
              label={frl('common.description')}
              required
              rules={[
                {
                  required: true,
                  message: frm('common.description'),
                },
              ]}
            >
              <AppTextArea
                placeholder={messages['common.descriptionHint'] as string}
                minLength={10}
                maxLength={1000}
                // showCount
                rows={4}
              />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};
export default SalesProgramContent;
