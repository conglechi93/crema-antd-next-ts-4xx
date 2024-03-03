import {useState} from 'react';

const useMergeCheckboxTable = (
  dataSource: Array<any>,
  setDataSource: (dataSource: Array<any>) => void,
) => {
  const [count, setCount] = useState(dataSource.length);
  const handleAddPosition = () => {
    const newData: any = {
      key: count + 1,
      employee: '',
      position: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return {
    handleAddPosition,
  };
};

export default useMergeCheckboxTable;
