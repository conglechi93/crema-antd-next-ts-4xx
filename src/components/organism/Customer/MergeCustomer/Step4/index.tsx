import MergeCheckboxTable from '../../MergeCheckboxTable';
import useStep4 from './useStep4';

type PropsTypes = {
  current: number;
  customerCode: Array<any>;
  tblLabels: Array<any>;
  tblEntries: Array<any>;
  dataSource: Array<any>;
  setDataSource: (dataSource: Array<any>) => void;
};
const Step4 = (props: PropsTypes) => {
  const {
    current,
    customerCode,
    tblLabels,
    tblEntries,
    dataSource,
    setDataSource,
  } = props;
  const {columns, handleSave} = useStep4(
    current,
    customerCode,
    tblLabels,
    tblEntries,
    dataSource,
    setDataSource,
  );
  return (
    <>
      <MergeCheckboxTable
        columns={columns}
        dataSource={dataSource}
        setDataSource={setDataSource}
        handleSave={handleSave}
      />
    </>
  );
};
export default Step4;
