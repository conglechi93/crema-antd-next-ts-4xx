import React from 'react';
import {Input} from 'antd';
import styles from './style.module.scss';
import {InputProps} from 'antd/lib';

type InputCustomProps = {
  type: 'text' | 'password';
};
const AppInput = (props: InputProps & InputCustomProps) => {
  const {type, defaultValue, disabled} = props;
  return type == 'text' ? (
    <Input
      defaultValue={defaultValue}
      disabled={disabled}
      className={styles.app_input}
      autoComplete='none'
      {...props}
    />
  ) : (
    <Input.Password {...props} className={styles.app_input} />
  );
};

export default AppInput;
