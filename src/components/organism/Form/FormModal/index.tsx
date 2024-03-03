import AppForm from 'components/atoms/AppForm';
import AppModal from 'components/molecules/AppModal';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {useIntl} from 'react-intl';
import AppTextArea from 'components/atoms/AppTextArea';
import {Button, Col, Row} from 'antd';
import useFormModal from './useFormModal';
import AppTypo from 'components/atoms/AppTypo';
import IntlMessages from '@crema/utility/IntlMessages';
import FormModalTable from '../FormModalTable';
import AppButton from 'components/atoms/AppButton';
import ChoosePropertyModal from '../ChoosePropertyModal';
import {ActionType} from 'shared/constants/AppVariables';
import FormModalDetail from '../FormModalDetail';
import {AppTableContainer} from '@crema';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const FormModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {type, record} = info;

  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {messages} = useIntl();
  const {
    form,
    modalData,
    disabled,
    isOpenChoosePropertyModal,
    setIsOpenChoosePropertyModal,
    handleChoosePropertyModal,

    loading,
    columns,
    dataSource,
    handleSelectChange,
    propertySelectedRows,
    handleSubmitChoosePropertyModal,
    handleCloseChoosePropertyModal,

    handleSubmit,
    handleClose,
    handleRemoveState,
    handleCheckFormData,
  } = useFormModal(info, isOpen, setIsOpen);

  return (
    <>
      <ChoosePropertyModal
        isOpen={isOpenChoosePropertyModal}
        setIsOpen={setIsOpenChoosePropertyModal}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmitChoosePropertyModal}
        handleClose={handleCloseChoosePropertyModal}
        propertySelectedRows={propertySelectedRows}
      />
      <AppModal
        title={modalData?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        submitText={modalData?.submitText}
        closeText={modalData?.closeText}
        onClosable={handleRemoveState}
        destroyOnClose
        width={1200}
        disabled={disabled}
      >
        {type === ActionType.VIEW ? (
          <>
            <FormModalDetail recodeDetail={record} dataSource={dataSource} />
            <Row style={{margin: '16px 0'}}>
              <Col xs={24}>
                <AppTypo variant='p-lg-semi'>
                  <IntlMessages id='common.detailInfomation' />
                </AppTypo>
              </Col>
            </Row>
            <AppTableContainer
              total={0}
              className=''
              loading={loading}
              columns={columns}
              isShowTitle={false}
              dataSource={dataSource}
              pagination={false}
              scroll={{x: 1000, y: 390}}
            />
          </>
        ) : (
          <AppForm
            form={form}
            onFieldsChange={handleCheckFormData}
            onFinish={handleSubmit}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <AppFormItem
                  name={'name'}
                  label={frl('common.formName')}
                  rules={[
                    {
                      required: true,
                      message: frm('common.formName'),
                    },
                  ]}
                >
                  <AppInput
                    type='text'
                    placeholder={messages['common.formNameHint'] as string}
                  />
                </AppFormItem>
              </Col>
              <Col xs={24}>
                <AppFormItem
                  name={'description'}
                  label={messages['common.description']}
                >
                  <AppTextArea
                    placeholder={messages['common.descriptionHint'] as string}
                  />
                </AppFormItem>
              </Col>
              <Col xs={24}>
                <Row
                  gutter={[16, 16]}
                  justify={'space-between'}
                  align={'middle'}
                >
                  <Col>
                    <AppTypo variant='p-lg-semi'>
                      <IntlMessages id='common.detailInfomation' />
                    </AppTypo>
                  </Col>
                  {info?.type !== ActionType.VIEW &&
                    info?.record?.usedStatus?.code !== '2' && (
                      <Col>
                        <AppButton
                          type='primary'
                          onClick={handleChoosePropertyModal}
                        >
                          <IntlMessages id='common.add' />
                        </AppButton>
                      </Col>
                    )}
                </Row>
              </Col>
              <Col xs={24}>
                <FormModalTable loading={loading} dataSource={dataSource} />
              </Col>
            </Row>
          </AppForm>
        )}
      </AppModal>
    </>
  );
};

export default FormModal;
