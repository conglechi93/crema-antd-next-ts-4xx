import {Checkbox, Col, List, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import useFunc from './useFunc';
import useFormMessage from '../../../../@crema/utility/hooks/useFormMessage';
import {useIntl} from 'react-intl';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSearch from 'components/atoms/AppSearch';
import SearchImg from 'assets/icon/search.png';
import AppSearchEmployee from 'components/molecules/AppSearchEmployee';
import EmployeeItem from '../EmployeeItem';
import styles from '../EmployeeItem/style.module.scss';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const AddEmployeeModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;

  const {
    listForm,
    form,
    disabled,
    loading,
    dataSource,
    handleSearch,
    handleSubmit,
    handeClose,
    handleFieldsChange,
  } = useFunc(info, isOpen, setIsOpen);

  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {messages} = useIntl();
  return (
    <AppModal
      title={
        <AppTypo variant='p-xl-semi'>{messages['common.addPersonnel']}</AppTypo>
      }
      openModal={isOpen}
      submitText={messages['common.add']}
      closeText={messages['common.reset']}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handeClose}
      width={480}
      destroyOnClose
      disabled={disabled}
      styles={{
        body: {
          height: 344,
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppForm form={form}>
            <AppFormItem name={'phone'}>
              <AppSearch
                onSearch={handleSearch}
                prefix={<img src={SearchImg.src} alt='' />}
                placeholder={messages['common.searchPhoneHint'] as string}
                suffix={null}
              />
            </AppFormItem>
          </AppForm>
        </Col>
        <Col xs={24}>
          <AppForm form={listForm} onFieldsChange={handleFieldsChange}>
            <AppFormItem name={'employees'}>
              <Checkbox.Group style={{width: '100%'}}>
                <List
                  className={styles.employees_item}
                  style={{width: '100%'}}
                  itemLayout='horizontal'
                  loading={loading}
                  locale={{emptyText: <AppSearchEmployee />}}
                  dataSource={dataSource}
                  renderItem={(item: any) => (
                    <EmployeeItem item={item} key={item?.ssoId} />
                  )}
                />
              </Checkbox.Group>
            </AppFormItem>
          </AppForm>
        </Col>
      </Row>
    </AppModal>
  );
};

export default AddEmployeeModal;
