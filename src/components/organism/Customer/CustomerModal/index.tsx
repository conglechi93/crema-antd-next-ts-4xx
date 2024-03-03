import AppModal from 'components/molecules/AppModal';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {useIntl} from 'react-intl';
import {Col, Row} from 'antd';
import useFunc from './useFunc';
import {ActionType} from 'shared/constants/AppVariables';
import CustomerAddAndUpdate from '../CustomerAddAndUpdate';
import CustomerViewDetail from '../CustomerViewDetail';
import RenderAtorms from 'components/molecules/RenderAtorms';
import {memo, useState} from 'react';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  zIndex?: number;
};
const CustomerModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {messages} = useIntl();

  const {
    form,
    disabled,
    loading,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleFieldsChange,
    provinceInfo,
    districtInfo,
    wardInfo,
    setProvinceInfo,
    setDistrictInfo,
    setWardInfo,
    propertyList,
    handleSetFormData,
    thumbnailAvatar,
    setThumbnailAvatar,
    fileList,
    setFileList,
  } = useFunc(info, isOpen, setIsOpen);

  const renderViewComponent = () => {
    const {type} = info;
    switch (type) {
      case ActionType.ADD: {
        return (
          <CustomerAddAndUpdate
            form={form}
            handleFieldsChange={handleFieldsChange}
            propertyList={propertyList}
            provinceInfo={provinceInfo}
            setProvinceInfo={setProvinceInfo}
            districtInfo={districtInfo}
            setDistrictInfo={setDistrictInfo}
            wardInfo={wardInfo}
            setWardInfo={setWardInfo}
            handleSetFormData={handleSetFormData}
            info={info}
            thumbnailAvatar={thumbnailAvatar}
            setThumbnailAvatar={setThumbnailAvatar}
            fileList={fileList}
            setFileList={setFileList}
          />
        );
      }
      case ActionType.EDIT: {
        return (
          <CustomerAddAndUpdate
            form={form}
            handleFieldsChange={handleFieldsChange}
            propertyList={propertyList}
            provinceInfo={provinceInfo}
            setProvinceInfo={setProvinceInfo}
            districtInfo={districtInfo}
            setDistrictInfo={setDistrictInfo}
            wardInfo={wardInfo}
            setWardInfo={setWardInfo}
            handleSetFormData={handleSetFormData}
            info={info}
            thumbnailAvatar={thumbnailAvatar}
            setThumbnailAvatar={setThumbnailAvatar}
            fileList={fileList}
            setFileList={setFileList}
          />
        );
      }
      case ActionType.VIEW: {
        return <CustomerViewDetail record={info?.record} />;
      }
      default:
        return <></>;
    }
  };

  return (
    <>
      <AppModal
        title={modalData?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        submitText={modalData?.submitText}
        closeText={modalData?.closeText}
        width={1200}
        styles={{
          body: {
            height: 400,
          },
        }}
        destroyOnClose
        disabled={disabled}
        loading={loading}
      >
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24}>{renderViewComponent()}</Col>
        </Row>
      </AppModal>
    </>
  );
};

export default memo(CustomerModal); // CustomerModal;
