import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetCustomerTableView} from 'redux/actions/Customer';
import {pageSize} from 'shared/constants/AppConst';

const useStep3 = (
  current: number,
  customerCode: Array<any>,
  setTblLabels: (tblLabels: Array<any>) => void,
  setTblEntries: (tblEntries: Array<any>) => void,
) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [columns, setColumns] = useState<Array<any>>([]);
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
  });
  useEffect(() => {
    const fetchCustomerMerge = async () => {
      if (current != 2 || customerCode.length == 0) return;
      setLoading(true);
      const customerCodeStr = customerCode[0].toString().split('-%%-');
      const params = {
        ...searchParams,
        customerCode: customerCodeStr,
      };
      const res: any = await dispatch(onGetCustomerTableView(params));
      const tblLabels: Array<any> = res?.tblLabels || [];
      setTblLabels(tblLabels);
      const columns: Array<any> = [
        {
          title: 'STT',
          dataIndex: 'index',
          render: (text, record) => {
            let index =
              (currentPage - 1) * pageSize.DEFAULT + Number(record.index) + 1;
            return <div>{index.toString()}</div>;
          },
          width: 80,
        },
      ];
      tblLabels.map((item: any, index: any) => {
        columns.push({
          index: index,
          title: item?.name,
          dataIndex: item?.code,
          key: item?.code,
          width: 150,
          render: (text, record) => {
            return (
              <Tooltip title={text}>
                <div
                  className={`ellipsis-text ${
                    record?.isCorrect === 'false' ? 'error' : ''
                  }`}
                >
                  {text}
                </div>
              </Tooltip>
            );
          },
        });
      });

      const tblEntries: Array<any> = res?.tblEntries || [];
      setTblEntries(tblEntries);
      const dataSource: Array<any> = tblEntries?.map(
        (item: any, index: any) => {
          return {
            ...item,
            index: index,
            id: item.code ? item.code : index,
            key: item?.code ? item?.code : index,
            code: item?.code ? item?.code : index,
          };
        },
      );
      setDataSource(dataSource);
      setColumns(columns);
      setTotal(res?.total);
      setLoading(false);
    };
    fetchCustomerMerge();
  }, [current, searchParams]);

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({...searchParams, ...params});
  };
  return {
    loading,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    handleChangeSearchParams,
  };
};
export default useStep3;
