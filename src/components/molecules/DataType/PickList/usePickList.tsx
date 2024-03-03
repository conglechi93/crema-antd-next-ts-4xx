import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetPickListByCode} from 'redux/actions/PickList';
import {pageSize} from 'shared/constants/AppConst';
import {addLeadingZeros} from 'utils/FormUtils';

const usePickList = (
  pickListCode: string,
  setPickListCode: (pickListCode: string) => void,
) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.SALES_TRANSACTIONS +
          record.index +
          1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
      width: 40,
    },
    {
      index: '1',
      title: 'Giá trị',
      width: 120,
      dataIndex: 'name',
      textAlign: 'center',
      render: (_: any, record: any) => {
        return <p>{record.name}</p>;
      },
    },
  ];

  useEffect(() => {
    const fetchPickList = async () => {
      if (!pickListCode) return;
      setLoading(true);
      const res: any = await dispatch(onGetPickListByCode(pickListCode));
      const configPickListOptions = res?.configPickListOptions ?? [];
      const dataSource: Array<any> = [];
      configPickListOptions?.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setDataSource(dataSource);
      setLoading(false);
    };
    fetchPickList();
  }, [pickListCode]);

  const handleChoosePickList = async (e) => {
    const pickListCode = e;
    setPickListCode(pickListCode);
  };
  return {
    loading,
    searchParams,
    setSearchParams,
    dataSource,
    columns,
    handleChoosePickList,
  };
};

export default usePickList;
