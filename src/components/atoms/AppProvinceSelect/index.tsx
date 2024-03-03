import {Select} from 'antd';
import {SelectProps} from 'antd/lib';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import {onGetProvinces} from 'redux/actions/Categories';
type AppProvinceSelectProps = {
  // setProvinceCode: any;
};
const AppProvinceSelect = (props: SelectProps & AppProvinceSelectProps) => {
  const {Option} = Select;
  const [options, setOptions] = useState<{value: string; label: string}[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProvince = async () => {
      setLoading(true);
      const res = await onGetProvinces();
      setOptions(res);
      setLoading(false);
    };
    fetchProvince();
  }, []);
  return (
    <Select
      {...props}
      loading={loading}
      className={styles.app_select}
      showSearch
      // onChange={handleChangeSelect}
    >
      {options?.map((option: any) => {
        return (
          <Option key={option.code} value={option.code} label={option.name}>
            {option.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default AppProvinceSelect;
