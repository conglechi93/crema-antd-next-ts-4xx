import React, {ChangeEvent} from 'react';
import {Select} from 'antd';
import styles from './style.module.scss';
import {SelectProps} from 'antd/lib';

const {Option} = Select;
const AppSelect = (props: SelectProps) => {
  const {onChange, options} = props;
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ): void => {
    if (onChange) {
      onChange(e, option);
    }
  };

  return (
    <Select
      style={{width: '100%'}}
      allowClear
      showSearch
      className={styles.app_select}
      filterOption={(input: any, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      maxTagCount={'responsive'}
      // filterSort={(optionA: any, optionB: any) => {
      //   return (optionA?.label ?? '')
      //     .toLowerCase()
      //     .localeCompare((optionB?.label ?? '').toLowerCase());
      // }}
      onChange={handleChange}
      {...props}
    >
      {options?.map((option) => {
        return (
          <Option
            key={option.value}
            value={option.value}
            label={option.label}
            id={option.id}
          >
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default AppSelect;
