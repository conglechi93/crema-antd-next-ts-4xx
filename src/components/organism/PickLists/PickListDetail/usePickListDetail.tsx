import {useEffect, useState} from 'react';

const usePickListDetail = (infoDetail: any) => {
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      width: 'auto',
    },
  ];

  useEffect(() => {
    if (infoDetail) {
      let dataSource: any = [];
      infoDetail?.configPickListOptions.forEach((item: any, index: any) => {
        dataSource.push({
          ...item,
          key: index + 1,
          index: index + 1,
          value: item?.name,
          id: index + 1,
        });
      });
      setDataSource(dataSource);
    }
  }, [infoDetail]);

  return {
    columns,
    dataSource,
  };
};

export default usePickListDetail;
