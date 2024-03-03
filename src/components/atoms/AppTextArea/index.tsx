import React from 'react';
import {Input} from 'antd';
import {TextAreaProps} from 'antd/lib/input';
const AppTextArea = (props: TextAreaProps) => {
  return <Input.TextArea {...props} rows={4} />;
};

export default AppTextArea;
