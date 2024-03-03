import AppModal from 'components/molecules/AppModal';
import {useState} from 'react';
import {ActionType} from 'shared/constants/AppVariables';
import useFunc from './useFunc';
import AppTitleLable from 'components/atoms/AppTitleLable';
import DepartmentDetail from '../DepartmentDetail';
import DepartmentAddAndUpdate from '../DepartmentAddAndUpdate';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const DepartmentModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const [disabled, setDisabled] = useState(false);
  const {record} = info;
  const {
    loading,
    form,
    handleSubmit,
    handleClose,
    modalConfig,
    handleRemoveState,
    contentLoading,
    recordDetail,
  } = useFunc(info, setDisabled, isOpen, setIsOpen);

  const renderViewComponent = () => {
    const {type} = info;
    switch (type) {
      case ActionType.VIEW: {
        return <DepartmentDetail recordDetail={recordDetail} />;
      }
      case ActionType.EDIT: {
        return <DepartmentAddAndUpdate form={form} setDisabled={setDisabled} />;
      }
      case ActionType.ADD: {
        return <DepartmentAddAndUpdate form={form} setDisabled={setDisabled} />;
      }
    }
  };

  return (
    <AppModal
      title={
        <AppTitleLable title={modalConfig?.title} recordTitle={record?.code} />
      }
      openModal={isOpen}
      submitText={modalConfig?.submitText}
      closeText={modalConfig?.closeText}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onClosable={handleRemoveState}
      width={1200}
      disabled={disabled}
      loading={loading}
      styles={{
        body: {
          height: 400,
        },
      }}
      contentLoading={contentLoading}
    >
      {renderViewComponent()}
    </AppModal>
  );
};

export default DepartmentModal;
