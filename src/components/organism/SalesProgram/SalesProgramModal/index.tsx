import AppModal from 'components/molecules/AppModal';
import {useEffect, useState} from 'react';
import {loadState, removeState} from 'utils/LocalStore';
import {Col, DatePicker, Form, Row} from 'antd';
import {useDispatch} from 'react-redux';
import {
  onCreateSalesProgram,
  onGetSalesProgramDetails,
  onUpdateSalesProgram,
} from 'redux/actions/SalesPrograms';
import {dateTimeFormat} from 'shared/constants/AppConst';
import {checkValidateForm, convertInputToNumber} from 'utils/FormUtils';
import AppForm from 'components/atoms/AppForm';
import AppInput from 'components/atoms/AppInput';
import AppFormItem from 'components/atoms/AppFormItem';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {useIntl} from 'react-intl';
import AppTextArea from 'components/atoms/AppTextArea';
import CalendarImg from 'assets/icon/Calendar.png';
import dayjs from 'dayjs';
import {ActionType} from 'shared/constants/AppVariables';

type PropsTypes = {
  info: {
    draftString: string;
    type: string;
    action: () => void;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
  modalSaleProgram: any;
};
const SalesProgramModal = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const {info, isOpen, setIsOpen, modalSaleProgram} = props;
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {draftString = '', action} = info;

  useEffect(() => {
    const dateSource = loadState(draftString);
    if (!dateSource) {
      handleCheckFormData();
      return;
    }
    const fetchSalesProgramDetail = async () => {
      const salesProgramCode: string = dateSource?.code;
      if (!salesProgramCode) return;
      const res: any = await dispatch(
        onGetSalesProgramDetails(salesProgramCode),
      );
      const fromDate = res?.fromDate ?? '';
      const toDate = res?.toDate ?? '';
      await form.setFieldsValue({
        name: res?.name,
        commissionDiscount: res?.commissionDiscount,
        description: res?.description,
        toDate: dayjs(toDate, 'HH:mm:ss DD/MM/YYYY'),
        fromDate: dayjs(fromDate, 'HH:mm:ss DD/MM/YYYY'),
      });
      handleCheckFormData();
    };
    fetchSalesProgramDetail();
  }, [info]);
  const handleSubmit = async (): Promise<void> => {
    const {type = '', draftString = ''} = info;
    const dateSource = loadState(draftString);
    const {name, fromDate, toDate, commissionDiscount, description} =
      form.getFieldsValue();
    const code = dateSource?.code ?? '';
    const payload = {
      code,
      name,
      fromDate: fromDate?.format(dateTimeFormat[1]),
      toDate: toDate?.format(dateTimeFormat[1]),
      commissionDiscount,
      description,
    };

    switch (type) {
      case ActionType.ADD: {
        setLoading(true);
        await dispatch(onCreateSalesProgram(payload));
        setLoading(false);
        action();
        handleRemoveState();
        setIsOpen(false);
        break;
      }
      case ActionType.EDIT: {
        setLoading(true);
        await dispatch(onUpdateSalesProgram(payload));
        setLoading(false);
        action();
        handleRemoveState();
        setIsOpen(false);
        break;
      }
    }
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleRemoveState = (): void => {
    form.resetFields();
    removeState([draftString]);
  };

  const optionalFields = [];
  const handleCheckFormData = () => {
    const isValidForm = checkValidateForm(form, optionalFields);
    setDisabled(!isValidForm);
  };
  const {formatRequiredLabelId: frl, formatRequiredMessageId: frm} =
    useFormMessage();
  const {messages} = useIntl();
  return (
    <div>
      <AppModal
        openModal={isOpen}
        title={modalSaleProgram?.title}
        submitText={modalSaleProgram?.submitText}
        closeText={modalSaleProgram?.closeText}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        width={1200}
        disabled={disabled}
        loading={loading}
      >
        <AppForm form={form} onFieldsChange={handleCheckFormData}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={6}>
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
                <Col xs={24} lg={6}>
                  <AppFormItem
                    name={'fromDate'}
                    label={frl('common.fromDate')}
                    required
                    rules={[{required: true, message: frm('common.fromDate')}]}
                  >
                    <DatePicker
                      showTime
                      format={dateTimeFormat[1]}
                      style={{width: '100%', height: '36px'}}
                      placeholder={dateTimeFormat[1].toLocaleLowerCase()}
                      suffixIcon={<img src={CalendarImg.src} alt='' />}
                      showNow={false}
                    />
                  </AppFormItem>
                </Col>
                <Col xs={24} lg={6}>
                  <AppFormItem
                    name={'toDate'}
                    label={frl('common.toDate')}
                    required
                    rules={[{required: true, message: frm('common.toDate')}]}
                  >
                    <DatePicker
                      showTime
                      format={dateTimeFormat[1]}
                      style={{width: '100%', height: '36px'}}
                      placeholder={dateTimeFormat[1].toLocaleLowerCase()}
                      suffixIcon={<img src={CalendarImg.src} alt='' />}
                      showNow={false}
                    />
                  </AppFormItem>
                </Col>
                <Col xs={24} lg={6}>
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
      </AppModal>
    </div>
  );
};
export default SalesProgramModal;
