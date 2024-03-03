import AppTableContainer from '@crema/AppTableContainer';
import useStep2 from './useStep2';

type PropsTypes = {
  current: number;
  propertyCodeConditions: Array<any>;
  setCustomerCode: (customerCode: Array<any>) => void;
};
const Step2 = (props: PropsTypes) => {
  const { current, propertyCodeConditions, setCustomerCode } = props;
  const {
    loading,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    handleSelectChange,
  } = useStep2(current, propertyCodeConditions, setCustomerCode);
  return (
    <>
      <AppTableContainer
        loading={loading}
        total={total}
        columns={columns}
        dataSource={dataSource}
        className=''
        current={currentPage}
        setCurrent={setCurrentPage}
        pagination={{
          position: ['topRight'],
        }}
        selectionType='radio'
        handleSelectChange={handleSelectChange}
        scroll={{ x: 1000, y: 250 }}
      />
    </>
  );
};
export default Step2;
