import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import useFunc from './useFunc';
import {useIntl} from 'react-intl';
import labelImg from 'assets/icon/documents_label.png';
import EmployeeInfoDetail from '../EmployeeInfoDetail';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTitleLable from 'components/atoms/AppTitleLable';

type PropsTypes = {
  record: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const EmployeesInfoModal = (props: PropsTypes) => {
  const {record, isOpen, setIsOpen} = props;

  const {handleSubmit} = useFunc(record, isOpen, setIsOpen);

  const {messages} = useIntl();
  return (
    <AppModal
      title={
        <AppTitleLable
          title={'common.employeeInfor'}
          recordTitle={record?.code}
        />
      }
      openModal={isOpen}
      submitText={messages['common.close']}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      width={1200}
      styles={{body: {height: 500}}}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <EmployeeInfoDetail record={record} />
        </Col>
      </Row>
    </AppModal>
  );
};

export default EmployeesInfoModal;
