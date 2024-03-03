import AppModal from 'components/molecules/AppModal';
import {useIntl} from 'react-intl';
import useAddEmployeeModal from './useAddEmployeeModal';
import EmployeeSelectTable from '../EmployeeSelectTable';

type AddEmployeeModalProps = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const AddEmployeeModal = (props: AddEmployeeModalProps) => {
  const {info, isOpen, setIsOpen} = props;
  const {messages} = useIntl();
  const {disabled, dataSource, setDataSource, handleSubmit, handleClose} =
    useAddEmployeeModal(info, setIsOpen);

  return (
    <AppModal
      title={messages['common.addEmployee']}
      openModal={isOpen}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      width={1200}
      submitText={messages['common.add']}
      closeText={messages['common.cancel']}
      destroyOnClose
      onClosable={handleClose}
      disabled={disabled}
    >
      <EmployeeSelectTable
        departmentRecord={info?.record}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </AppModal>
  );
};
export default AddEmployeeModal;
