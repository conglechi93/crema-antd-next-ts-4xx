import React, {memo} from 'react';

import {Col, Modal, ModalProps, Row, Spin} from 'antd';

import styles from './style.module.scss';
import AppButton from 'components/atoms/AppButton';

export type ModalCustomProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  handleSubmit: () => void;
  handleClose?: () => void;
  submitText?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  contentLoading?: boolean;
  width?: number;
  children?: React.ReactNode;
  onClosable?: () => void;
  zIndex?: number;
};
const AppModal = (props: ModalCustomProps & ModalProps) => {
  const {
    openModal,
    setOpenModal,
    title,
    description,
    children,
    disabled = false,
    loading = false,
    contentLoading = false,
    width,
    onClosable,
    handleClose,
    closeText,
    handleSubmit,
    submitText,
    zIndex = 12,
  } = props;
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
        setOpenModal(false);
      }}
      open={openModal}
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
                  loading={loading}
                  disabled={disabled || loading}
                  type='primary'
                  onClick={() => handleSubmit()}
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
      {contentLoading ? (
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

export default memo(AppModal);
