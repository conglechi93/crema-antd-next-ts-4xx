import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import {useIntl} from 'react-intl';
import labelImg from 'assets/icon/documents_label.png';
import IntlMessages from '@crema/utility/IntlMessages';
import EditEmployeeInfoDetail from '../EditEmployeeInfoDetail';
import useEmployeeInfoEdit from './useFunc';
import AppTitleLable from 'components/atoms/AppTitleLable';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const EditEmployeeModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {
    form,
    loading,
    disabled,
    dataEmployeeInfo,
    handleSubmit,
    handleFieldsChange,

    workSpacesDatasource,
    setWorkSpacesDatasource,

    setThumbnailAvatar,
    thumbnailAvatar,
  } = useEmployeeInfoEdit(info, isOpen, setIsOpen);
  const {messages} = useIntl();

  return (
    <AppModal
      title={
        <AppTitleLable
          title={'common.editInfor'}
          recordTitle={info?.record?.code}
        />
      }
      openModal={isOpen}
      submitText={messages['common.save']}
      closeText={messages['common.cancel']}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={() => {
        setIsOpen(false);
      }}
      width={1200}
      styles={{body: {height: 500}}}
      disabled={disabled}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <EditEmployeeInfoDetail
            isLoading={loading}
            form={form}
            dataEmployeeInfo={dataEmployeeInfo}
            handleFieldsChange={handleFieldsChange}
            workSpacesDatasource={workSpacesDatasource}
            setWorkSpacesDatasource={setWorkSpacesDatasource}
            thumbnailAvatar={thumbnailAvatar}
            setThumbnailAvatar={setThumbnailAvatar}
          />
        </Col>
      </Row>
    </AppModal>
  );
};

export default EditEmployeeModal;
