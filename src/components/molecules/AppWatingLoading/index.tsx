import {Row} from 'antd';
import React from 'react';
type AppWatingLoadingProp = {
  content?: React.ReactNode;
};
const AppWatingLoading = (props: AppWatingLoadingProp) => {
  const {content} = props;
  return <Row gutter={[0, 24]}>{content}</Row>;
};

export default AppWatingLoading;
