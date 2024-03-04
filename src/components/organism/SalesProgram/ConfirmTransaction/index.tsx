import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Button, Col, List, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelect from 'components/atoms/AppSelect';
import AppModal from 'components/molecules/AppModal';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import useInventoryWarehouseModal from './useConfirmTransaction';
import ArrowDownImg from 'assets/icon/ArrowDown.png';
import AppTypo from 'components/atoms/AppTypo';
import AppDraggerUpload from 'components/molecules/AppDraggerUpload';
import IntlMessages from '@crema/utility/IntlMessages';
import imgExcel from 'assets/image/Excel.png';
import imgCheck from 'assets/image/Check.png';

type PropsTypes = {
  info: any;
  setInfo: (info: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
};

const ConfirmTransaction = (props: PropsTypes) => {
  const { info, setInfo, isOpen, setIsOpen } = props;
  const [disabled, setDisabled] = useState(true);

  const {
    form,
    handleSubmit,
    handleClose,
    customerOptions,
    handleFieldsChange,
    handleCustomRequest,
    handleChangeCustomer,
    fileList,
    handleRemoveFile,
    disableDragger,
  } = useInventoryWarehouseModal(info, setInfo, setDisabled, setIsOpen);

  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();

  const { messages } = useIntl();
  return (
    <AppModal
      title={<IntlMessages id='common.confirmTransaction' />}
      openModal={isOpen}
      submitText={messages['common.agree'] as string}
      closeText={messages['common.cancel'] as string}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onClosable={handleClose}
      width={480}
      disabled={disabled}
    >
      <p>
        Bạn có chắc chắn xác nhận đã giao dịch mặt hàng{' '}
        <strong>{`${info?.inventory?.code} - ${info?.inventory?.name}`}</strong>{' '}
        không?
      </p>
      <AppForm form={form} onFieldsChange={handleFieldsChange}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AppFormItem
              name={'customer'}
              label={frl('common.theCustomerHasSuccessfullyTransacted')}
            >
              <AppSelect
                options={customerOptions}
                placeholder={messages['common.chooseCustomer'] as string}
                suffixIcon={<img src={ArrowDownImg.src} alt='' />}
                onChange={handleChangeCustomer}
              />
            </AppFormItem>
          </Col>
          <Col span={24}>
            <AppFormItem
              name={'file'}
              label={messages['common.uploadConfirmFile'] as string}
            >
              <Row gutter={[4, 4]}>
                <Col xs={24}>
                  <ul style={{ paddingLeft: '20px' }}>
                    <AppTypo variant='li'>
                      {messages['common.supportMultiFile'] as string}
                    </AppTypo>
                    <AppTypo variant='li'>
                      {messages['common.validUploadFileSize'] as string}
                    </AppTypo>
                    <AppTypo variant='li'>
                      {messages['common.validFileNum'] as string}{' '}
                    </AppTypo>
                  </ul>
                </Col>
                <Col xs={24}>
                  <AppDraggerUpload
                    multiple={false}
                    handleCustomRequest={handleCustomRequest}
                    fileList={fileList}
                    disabled={disableDragger}
                  />
                  {fileList?.length > 0 && (
                    <List
                      style={{ marginTop: 16 }}
                      className='fileList'
                      size='small'
                      dataSource={fileList}
                      renderItem={(file: any) => (
                        <List.Item
                          actions={[
                            <Button
                              icon={
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M17.0832 5H2.9165'
                                    stroke='#991A1A'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M15.6946 7.08301L15.3113 12.8323C15.1638 15.0447 15.09 16.1509 14.3692 16.8253C13.6483 17.4997 12.5397 17.4997 10.3223 17.4997H9.67787C7.46054 17.4997 6.35187 17.4997 5.63103 16.8253C4.91019 16.1509 4.83644 15.0447 4.68895 12.8323L4.30566 7.08301'
                                    stroke='#991A1A'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M7.91675 9.16699L8.33342 13.3337'
                                    stroke='#991A1A'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M12.0834 9.16699L11.6667 13.3337'
                                    stroke='#991A1A'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M5.41675 5C5.46331 5 5.4866 5 5.50771 4.99947C6.19391 4.98208 6.79927 4.54576 7.03276 3.90027C7.03994 3.88041 7.04731 3.85832 7.06203 3.81415L7.14294 3.57143C7.212 3.36423 7.24654 3.26063 7.29234 3.17267C7.47509 2.82173 7.8132 2.57803 8.20392 2.51564C8.30186 2.5 8.41106 2.5 8.62947 2.5H11.3707C11.5891 2.5 11.6983 2.5 11.7962 2.51564C12.187 2.57803 12.5251 2.82173 12.7078 3.17267C12.7536 3.26063 12.7882 3.36423 12.8572 3.57143L12.9381 3.81415C12.9528 3.85826 12.9602 3.88042 12.9674 3.90027C13.2009 4.54576 13.8063 4.98208 14.4925 4.99947C14.5136 5 14.5368 5 14.5834 5'
                                    stroke='#991A1A'
                                    stroke-width='1.5'
                                  />
                                </svg>
                              }
                              onClick={() => handleRemoveFile(file)}
                              type='link'
                              danger
                            ></Button>,
                          ]}
                        >
                          <Row gutter={[8, 8]} align={'middle'}>
                            <Col>
                              <img
                                style={{ display: 'block' }}
                                src={imgExcel.src}
                                alt=''
                              />
                            </Col>
                            <Col>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                }}
                              >
                                <AppTypo variant='p-md-reg'>
                                  {file.name}
                                </AppTypo>
                                <p>
                                  <img
                                    style={{ display: 'block' }}
                                    src={imgCheck.src}
                                    alt=''
                                  />
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </List.Item>
                      )}
                    />
                  )}
                </Col>
              </Row>
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>
    </AppModal>
  );
};

export default ConfirmTransaction;
