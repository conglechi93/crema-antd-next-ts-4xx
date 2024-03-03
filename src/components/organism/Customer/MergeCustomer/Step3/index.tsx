import {AppTableContainer} from '@crema';
import useStep3 from './useStep3';

type PropsTypes = {
  current: number;
  customerCode: Array<any>;
  setTblLabels: (tblLabels: Array<any>) => void;
  setTblEntries: (tblEntries: Array<any>) => void;
};
const Step3 = (props: PropsTypes) => {
  const {current, customerCode, setTblLabels, setTblEntries} = props;
  const {
    loading,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    handleChangeSearchParams,
  } = useStep3(current, customerCode, setTblLabels, setTblEntries);
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
        selectionType='checkbox'
        handleChangePage={handleChangeSearchParams}
        scroll={{x: 1000, y: 250}}
      />
    </>
  );
};
export default Step3;
