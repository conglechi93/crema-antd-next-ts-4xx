import {Select} from 'antd';
import {SelectProps} from 'antd/lib';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
type AppDistrictSelectProps = {
  setDistrictInfo: (value: any) => void;
};
const AppDistrictSelect = (props: SelectProps & AppDistrictSelectProps) => {
  const {id, options, setDistrictInfo} = props;
  const {Option} = Select;
  useEffect(() => {
    if (!id) return;
    setDistrictInfo({
      code: '',
      formCode: id,
    });
  }, [id]);

  return (
    <Select {...props} className={styles.app_select} showSearch>
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

export default AppDistrictSelect;
