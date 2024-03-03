import React, {memo} from 'react';
import {Col, Modal, ModalProps, Row, Spin} from 'antd';
import styles from './style.module.scss';
import AppButton from 'components/atoms/AppButton';

export type ModalInfoProps = {
  title?: string | React.ReactNode;
  submitText?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  description?: string | React.ReactNode;
  width?: number;
  handleSubmit?: () => void;
  handleClose?: () => void;
  onClosable?: () => void;
  submit?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};
export type AppModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  zIndex?: number;
  modalInfo: ModalInfoProps;
};
const AppModalV2 = (props: AppModalProps & ModalProps) => {
  const {isOpen, setIsOpen, zIndex = 12, modalInfo, children} = props;
  const submit = modalInfo?.submit;
  const loading = modalInfo?.loading;
  const title = modalInfo?.title;
  const submitText = modalInfo?.submitText;
  const closeText = modalInfo?.closeText;
  const description = modalInfo?.description;
  const width = modalInfo?.width;
  const handleSubmit = modalInfo?.handleSubmit;
  const handleClose = modalInfo?.handleClose;
  const onClosable = modalInfo?.onClosable;
  const disabled = modalInfo?.disabled;

  return (
    <Modal
      {...props}
      centered
      className={styles.modal}
      classNames={{
        content: styles.content,
        header: styles.header,
        body: styles.body,
        footer: styles.footer,
      }}
      onCancel={() => {
        if (onClosable) {
          onClosable();
        }
        setIsOpen(false);
      }}
      open={isOpen}
      width={width}
      title={title}
      destroyOnClose
      footer={
        submitText || closeText ? (
          <Row gutter={[8, 8]} justify={'end'}>
            {closeText && (
              <Col flex={'none'}>
                <AppButton type='primary' ghost={true} onClick={handleClose}>
                  {closeText}
                </AppButton>
              </Col>
            )}

            {submitText && (
              <Col flex={'none'}>
                <AppButton
                  loading={submit}
                  disabled={disabled || submit}
                  type='primary'
                  onClick={() => handleSubmit?.()}
                >
                  {submitText}
                </AppButton>
              </Col>
            )}
          </Row>
        ) : (
          false
        )
      }
      zIndex={zIndex}
    >
      {loading ? (
        <div className='text-center'>
          <Spin />
        </div>
      ) : (
        <>
          {description}
          {children}
        </>
      )}
    </Modal>
  );
};

export default memo(AppModalV2);
