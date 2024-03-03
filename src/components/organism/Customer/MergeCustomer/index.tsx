import AppProgress from 'components/molecules/AppProgress';
import useMergeCustomer from './useMergeCustomer';
import AppModal from 'components/molecules/AppModal';
import Step1 from './Step1';
import Step2 from './Step2';
import {Col, Row} from 'antd';
import Step3 from './Step3';
import Step4 from './Step4';

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const MergeCustomer = (props: PropsTypes) => {
  const {isOpen, setIsOpen} = props;
  const {
    items,
    current,
    modalInfo,
    handleSubmit,
    handleClose,
    propertyCodeConditions,
    setPropertyCodeConditions,
    customerCode,
    setCustomerCode,
    tblLabels,
    setTblLabels,
    tblEntries,
    setTblEntries,
    dataSource,
    setDataSource,
  } = useMergeCustomer(isOpen, setIsOpen);
  return (
    <AppModal
      openModal={isOpen}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      width={modalInfo.width}
      title={modalInfo.title}
      submitText={modalInfo.submitText}
      closeText={modalInfo.closeText}
      styles={{
        body: {
          height: '480px',
        },
      }}
      destroyOnClose
    >
      <Row gutter={[16, 32]} align={'middle'} justify={'center'}>
        <Col xs={24}>
          <AppProgress current={current} items={items} />
        </Col>
        <Col xs={24}>
          <div className={current === 0 ? 'block-display' : 'none-display'}>
            <Step1
              current={current}
              setPropertyCodeConditions={setPropertyCodeConditions}
            />
          </div>
          <div className={current === 1 ? 'block-display' : 'none-display'}>
            <Step2
              current={current}
              propertyCodeConditions={propertyCodeConditions}
              setCustomerCode={setCustomerCode}
            />
          </div>
          <div className={current === 2 ? 'block-display' : 'none-display'}>
            <Step3
              current={current}
              customerCode={customerCode}
              setTblLabels={setTblLabels}
              setTblEntries={setTblEntries}
            />
          </div>
          <div className={current === 3 ? 'block-display' : 'none-display'}>
            <Step4
              current={current}
              customerCode={customerCode}
              tblLabels={tblLabels}
              tblEntries={tblEntries}
              dataSource={dataSource}
              setDataSource={setDataSource}
            />
          </div>
        </Col>
      </Row>
    </AppModal>
  );
};

export default MergeCustomer;
