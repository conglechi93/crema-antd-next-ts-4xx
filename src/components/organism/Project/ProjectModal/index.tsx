import AppModal from 'components/molecules/AppModal';
import useProjectModal from './useProjectModal';
import {Col, Row} from 'antd';
import {ActionType} from 'shared/constants/AppVariables';
import ProjectAddAndUpdate from '../ProjectAddAndUpdate';
import ProjectDetail from '../ProjectDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const ProjectModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {
    projectDetail,
    modalInfo,
    form,
    dataSource,
    setDataSource,
    handleSubmit,
    handleClose,
    loading,
    disabled,
    handleCheckFormData,
    fileList,
    setFileList,
  } = useProjectModal(info, setIsOpen);

  const renderViewComponent = () => {
    const {type, record} = info;

    switch (type) {
      case ActionType.ADD: {
        return (
          <ProjectAddAndUpdate
            form={form}
            info={info}
            dataSource={dataSource}
            setDataSource={setDataSource}
            setIsOpen={setIsOpen}
            handleFieldsChange={handleCheckFormData}
            fileList={fileList}
            setFileList={setFileList}
          />
        );
      }
      case ActionType.EDIT: {
        return (
          <ProjectAddAndUpdate
            form={form}
            info={info}
            setIsOpen={setIsOpen}
            dataSource={dataSource}
            setDataSource={setDataSource}
            handleFieldsChange={handleCheckFormData}
            fileList={fileList}
            setFileList={setFileList}
          />
        );
      }
      case ActionType.VIEW: {
        return <ProjectDetail infoDetail={projectDetail} dataSource={dataSource} />;
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
    >
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24}>{renderViewComponent()}</Col>
      </Row>
    </AppModal>
  );
};

export default ProjectModal;
