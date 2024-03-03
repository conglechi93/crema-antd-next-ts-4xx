import AppForm from 'components/atoms/AppForm';
import AppModal from 'components/molecules/AppModal';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {useIntl} from 'react-intl';
import AppTextArea from 'components/atoms/AppTextArea';
import {Col, Row} from 'antd';
import useFunc from './useFunc';
import AppSelect from 'components/atoms/AppSelect';
import DataType from 'components/molecules/DataType';
import {ActionType} from 'shared/constants/AppVariables';
import RolesAddAndUpdate from '../RolesAddAndUpdate';
import RolesViewDetail from '../RolesViewDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const RolesModal = (props: PropsTypes) => {
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
    disabled,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleFieldsChange,
  } = useFunc(info, setIsOpen);

  const renderViewComponent = () => {
    const {type} = info;
    switch (type) {
      case ActionType.ADD: {
        return (
          <RolesAddAndUpdate
            form={form}
            handleFieldsChange={handleFieldsChange}
          />
        );
      }
      case ActionType.EDIT: {
        return (
          <RolesAddAndUpdate
            form={form}
            handleFieldsChange={handleFieldsChange}
          />
        );
      }
      case ActionType.VIEW: {
        return <RolesViewDetail record={record} />;
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
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>{renderViewComponent()}</Col>
        </Row>
      </AppModal>
    </>
  );
};

export default RolesModal;
