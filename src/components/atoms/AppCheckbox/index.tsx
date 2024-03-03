import React from 'react';
import {Checkbox} from 'antd';
import {CheckboxProps} from 'antd/lib';

type AppCheckboxProps = CheckboxProps & {
  label?: string | React.ReactNode;
};

const AppCheckbox: React.FC<AppCheckboxProps> = (props: AppCheckboxProps) => {
  const {label} = props;
  return <Checkbox {...props}>{label}</Checkbox>;
};

export default AppCheckbox;
