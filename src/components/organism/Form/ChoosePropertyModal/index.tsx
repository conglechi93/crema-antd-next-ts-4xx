import AppModal from 'components/molecules/AppModal';
import useChoosePropertyModal from './useChoosePropertyModal';
import { Col, Row } from 'antd';
import ChoosePropertyFilter from '../ChoosePropertyFilter';
import AppTableContainer from '@crema/AppTableContainer';

type ChoosePropertyModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSelectChange: (
    selectedRowKeys: React.Key[],
    selectedRows?: any,
  ) => void;
  handleSubmit: () => void;
  handleClose: () => void;
  properySelectedKeys?: React.Key[];
  propertySelectedRows?: Array<any>;
};
const ChoosePropertyModal = (props: ChoosePropertyModalProps) => {
  const {
    isOpen,
    setIsOpen,
    handleSelectChange,
    handleSubmit,
    handleClose,
    propertySelectedRows,
  } = props;
  const {
    form,
    appModalData,
    handleRemoveState,
    handleChangeSearchParams,

    loading,
    total,
    columns,
    dataSource,
  } = useChoosePropertyModal(isOpen, setIsOpen);

  return (
    <>
      <AppModal
        title={appModalData?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        submitText={appModalData?.submitText}
        handleSubmit={handleSubmit}
        closeText={appModalData?.closeText}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        width={800}
        destroyOnClose
        styles={{
          body: {
            height: 400,
          },
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <ChoosePropertyFilter
              form={form}
              handleChangeSearchParams={handleChangeSearchParams}
            />
          </Col>
          <Col xs={24}>
            <AppTableContainer
              className='table_custom_record'
              loading={loading}
              total={total}
              columns={columns}
              dataSource={dataSource}
              handleSelectChange={handleSelectChange}
              selectedRow={propertySelectedRows}
              selectionType='checkbox'
              pagination={{
                position: ['bottomRight'],
              }}
            />
          </Col>
        </Row>
      </AppModal>
    </>
  );
};

export default ChoosePropertyModal;
