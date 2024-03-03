import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetFormDetail} from 'redux/actions/Form';

const useStep1 = (current: number) => {
  const dispatch = useDispatch();
  const [propertyList, setPropertyList] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchCustomerForm = async () => {
      const formCode = 'BM2';
      const res: any = await dispatch(onGetFormDetail(formCode));
      let propertyList: Array<any> = [];
      if (res) {
        const configProperties: Array<any> = res?.configProperties || [];
        configProperties
          .filter((item: any) => item.isMergeCondition)
          .map((item: any) => {
            propertyList.push({
              code: item.code,
              name: item.name,
            });
          });
      }
      setPropertyList(propertyList);
    };
    fetchCustomerForm();
  }, []);

  const handleSearch = () => {
    const newPropertyList = propertyList;
  };
  return {propertyList};
};
export default useStep1;
