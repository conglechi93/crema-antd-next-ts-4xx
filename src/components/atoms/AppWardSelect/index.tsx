import {Select} from 'antd';
import {SelectProps} from 'antd/lib';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
type AppWardSelectProps = {
  setWardInfo: (value: any) => void;
};
const AppWardSelect = (props: SelectProps & AppWardSelectProps) => {
  const {id, options, setWardInfo} = props;
  const {Option} = Select;
  useEffect(() => {
    if (!id) return;
    setWardInfo({
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

export default AppWardSelect;
