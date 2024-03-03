import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetCustomerMerge} from 'redux/actions/Customer';
import {pageSize} from 'shared/constants/AppConst';

const useStep2 = (
  current: number,
  propertyCodeConditions: Array<any>,
  setCustomerCode,
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
    propertyCodeConditions: propertyCodeConditions,
  });
  useEffect(() => {
    const fetchCustomerMerge = async () => {
      if (current != 1) return;
      setLoading(true);
      const params = {
        ...searchParams,
        propertyCodeConditions: propertyCodeConditions,
      };
      const res: any = await dispatch(onGetCustomerMerge(params));
      const tblLabels: Array<any> = res?.tblLabels || [];
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
      tblLabels
        ?.filter((item: any) => !item?.metadata)
        ?.map((item: any, index: any) => {
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
      const dataSource: Array<any> = tblEntries?.map(
        (item: any, index: any) => {
          return {
            ...item,
            index: index,
            id: item.duplicateCustomerCodes,
            key: item?.duplicateCustomerCodes
              ? item?.duplicateCustomerCodes
              : index,
            code: item?.duplicateCustomerCodes
              ? item?.duplicateCustomerCodes
              : index,
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

  const handleSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setCustomerCode(selectedRowKeys);
  };
  return {
    loading,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    handleSelectChange,
  };
};
export default useStep2;
