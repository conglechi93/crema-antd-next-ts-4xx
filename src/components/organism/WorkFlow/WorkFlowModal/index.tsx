import AppModal from 'components/molecules/AppModal';
import useWorkFlowModal from './useWorkFlowModal';
import AppModalV2 from 'components/molecules/AppModalV2';
import {Col, Row} from 'antd';
import WorkFlowAddAndUpdate from '../WorkFlowAddAndUpdate';
import {ActionType} from 'shared/constants/AppVariables';
import WorkFlowDetail from '../WorkFlowDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const WorkFlowModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {
    modalInfo,
    form,
    dataSource,
    setDataSource,
    handleCheckFormData,
    disabled,
    loading,
    handleClose,
    handleSubmit,
  } = useWorkFlowModal(info, setIsOpen);

  const renderViewComponent = () => {
    const {type, record} = info;

    switch (type) {
      case ActionType.ADD: {
        return (
          <WorkFlowAddAndUpdate
            form={form}
            info={info}
            setIsOpen={setIsOpen}
            dataSource={dataSource}
            setDataSource={setDataSource}
            handleFieldsChange={handleCheckFormData}
          />
        );
      }
      case ActionType.EDIT: {
        return (
          <WorkFlowAddAndUpdate
            form={form}
            info={info}
            setIsOpen={setIsOpen}
            dataSource={dataSource}
            setDataSource={setDataSource}
            handleFieldsChange={handleCheckFormData}
          />
        );
      }
      case ActionType.VIEW: {
        return <WorkFlowDetail infoDetail={record} />;
      }
      default:
        return <></>;
    }
  };
  return (
    <AppModal
      title={modalInfo?.title}
      openModal={isOpen}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      submitText={modalInfo?.submitText}
      closeText={modalInfo?.closeText}
      width={1200}
      destroyOnClose
      disabled={disabled}
      loading={loading}
      onClosable={handleClose}
      styles={{
        body: {
          height: 500,
        },
      }}
    >
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24}>{renderViewComponent()}</Col>
      </Row>
    </AppModal>
  );
};

export default WorkFlowModal;
