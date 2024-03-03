import AppModal from 'components/molecules/AppModal';
import usePickListModal from './usePickListModal';
import {Col, Row} from 'antd';
import {ActionType} from 'shared/constants/AppVariables';
import AppTypo from 'components/atoms/AppTypo';
import React, {useState} from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import PickListAddAndUpdate from '../PickListAddAndUpdate';
import PickListDetail from '../PickListDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};

const PickListModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;

  const {
    form,
    appModalConfig,
    handleSubmit,
    handleClose,
    handleRemoveState,

    disabled,
    handleCheckFormData,

    dataSource,
    setDataSource,
  } = usePickListModal(info, setIsOpen);

  const renderViewComponent = () => {
    const {type} = info;
    switch (type) {
      case ActionType.VIEW: {
        return <PickListDetail infoDetail={info?.record} />;
      }
      case ActionType.EDIT: {
        return (
          <PickListAddAndUpdate
            form={form}
            handleCheckFormData={handleCheckFormData}
            setDataSource={setDataSource}
            dataSource={dataSource}
            info={info}
            setIsOpen={setIsOpen}
          />
        );
      }
      case ActionType.ADD: {
        return (
          <PickListAddAndUpdate
            form={form}
            handleCheckFormData={handleCheckFormData}
            setDataSource={setDataSource}
            dataSource={dataSource}
            info={info}
            setIsOpen={setIsOpen}
          />
        );
      }
      default: {
        <></>;
      }
    }
  };
  return (
    <>
      <AppModal
        title={appModalConfig?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onClosable={handleRemoveState}
        submitText={appModalConfig?.submitText}
        closeText={appModalConfig?.closeText}
        disabled={disabled}
        width={1200}
        styles={{
          body: {
            height: 500,
          },
        }}
      >
        <Row>
          <Col xs={24} style={{marginBottom: '16px'}}>
            <AppTypo variant='p-lg-semi'>
              <IntlMessages id='common.generalInfomation' />
            </AppTypo>
          </Col>
        </Row>
        {renderViewComponent()}
      </AppModal>
    </>
  );
};

export default PickListModal;
