import AppModal from 'components/molecules/AppModal';
import usePickListModal from './useTaskModal';
import { ActionType } from 'shared/constants/AppVariables';
import React, { memo } from 'react';
import TaskAddAndUpdate from '../TaskAddAndUpdate';
import WorkViewDetail from '../TaskViewDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};

const TaskModal = (props: PropsTypes) => {
  const { info, isOpen, setIsOpen } = props;
  const {
    form,
    modalInfo,
    disabled,
    handleFieldsChange,
    description,
    setDescription,
    handleSubmit,
    handleRemoveState,
    detailInfo,
    fetchTaskDetails,
    fileAttachments,
    setFileAttachments,
  } = usePickListModal(info, setIsOpen);
  const renderViewComponent = () => {
    const { type } = info;
    switch (type) {
      case ActionType.VIEW: {
        return (
          <WorkViewDetail
            detailInfo={detailInfo}
            fetchTaskDetails={fetchTaskDetails}
          />
        );
      }
      case ActionType.EDIT: {
        return (
          <TaskAddAndUpdate
            info={info}
            form={form}
            record={detailInfo}
            handleCheckFormData={handleFieldsChange}
            description={description}
            setDescription={setDescription}
            fileAttachments={fileAttachments}
            setFileAttachments={setFileAttachments}
          />
        );
      }
      case ActionType.ADD: {
        return (
          <TaskAddAndUpdate
            info={info}
            form={form}
            record={detailInfo}
            handleCheckFormData={handleFieldsChange}
            description={description}
            setDescription={setDescription}
            fileAttachments={fileAttachments}
            setFileAttachments={setFileAttachments}
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
        title={modalInfo?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        handleClose={handleRemoveState}
        handleSubmit={handleSubmit}
        onClosable={handleRemoveState}
        submitText={modalInfo?.submitText}
        closeText={modalInfo?.closeText}
        disabled={disabled}
        width={1400}
        styles={{
          body: {
            height: 600,
          },
        }}
      >
        {renderViewComponent()}
      </AppModal>
    </>
  );
};

export default memo(TaskModal);
