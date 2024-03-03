import {SelectProps} from 'antd';
import AppSelect from '../AppSelect';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
type AppSelectLoadMoreProps = {
  searchParams: any;
  setSearchParams: (params: any) => void;
  onGetOptions: (params: any) => void;
};
const AppSelectLoadMore: React.FC<SelectProps & AppSelectLoadMoreProps> = (
  props: SelectProps & AppSelectLoadMoreProps,
) => {
  const dispatch = useDispatch();
  const {searchParams, setSearchParams, onGetOptions} = props;
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [options, setOptions] = useState<{label: string; value: string}[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      const res: any = await dispatch(
        onGetOptions({
          ...searchParams,
          page: loadmore ? searchParams.page + 1 : searchParams.page,
        }),
      );
      const optionsAPI: {label: string; value: string}[] = [];
      res?.elements?.map((item: any) => {
        optionsAPI.push({
          label: item.name,
          value: item.code,
        });
      });
      const newOption: {label: string; value: string}[] = ([] = loadmore
        ? [...options, ...optionsAPI]
        : optionsAPI);

      if (loadmore && optionsAPI.length > 0)
        setCurrentPage(searchParams.page + 1);
      else setCurrentPage(searchParams.page);

      setLoading(false);
      await setOptions(newOption);
      setTimeout(() => {
        setLoadmore(false);
      }, 500);
    };
    fetchOptions();
  }, [searchParams]);
  const handlePopupScroll = async (event: any) => {
    const target = event.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      await setLoadmore(true);
      setSearchParams({
        ...searchParams,
        page: currentPage,
      });
      target.scrollTo(0, target.scrollHeight);
    }
  };
  return (
    <AppSelect
      loading={loading || loadmore}
      allowClear={!loading && !loadmore}
      options={options}
      onPopupScroll={handlePopupScroll}
      {...props}
    />
  );
};

export default AppSelectLoadMore;
