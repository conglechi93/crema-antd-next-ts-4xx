import {Col, Row} from 'antd';
import React from 'react';
import AppTypo from '../AppTypo';
import IntlMessages from '@crema/utility/IntlMessages';
import labelImg from 'assets/icon/documents_label.png';

type AppTitleLableProps = {
  recordTitle?: string;
  title: React.ReactNode | string;
};

const AppTitleLable = (props: AppTitleLableProps) => {
  const {title, recordTitle} = props;
  return (
    <Row gutter={[12, 12]} align={'middle'}>
      {recordTitle && (
        <Col>
          <div className='modal_label_title'>
            <img src={labelImg.src} alt='' />
            <label>{recordTitle}</label>
          </div>
        </Col>
      )}
      <Col>
        <AppTypo variant='p-xl-semi'>
          <IntlMessages id={title} />
        </AppTypo>
      </Col>
    </Row>
  );
};

export default AppTitleLable;
