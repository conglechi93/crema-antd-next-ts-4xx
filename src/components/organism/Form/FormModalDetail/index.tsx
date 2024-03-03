import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';

type PropsTypes = {
  recodeDetail: any;
  dataSource: any;
};

const FormModalDetail = (props: PropsTypes) => {
  const {recodeDetail, dataSource} = props;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-lg-semi'>
          <IntlMessages id='common.generalInfomation' />
        </AppTypo>
      </Col>
      <Col xs={24}>
        <Row gutter={[0, 0]} className='col_item'>
          <Col className='col_left'>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.formName' />
            </AppTypo>
          </Col>
          <Col className='col_right'>
            <AppTypo variant='p-md-reg'>{recodeDetail?.name}</AppTypo>
          </Col>
        </Row>
        <Row gutter={[0, 0]} className='col_item'>
          <Col className='col_left'>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.description' />
            </AppTypo>
          </Col>
          <Col className='col_right'>
            <AppTypo variant='p-md-reg'>{recodeDetail?.description}</AppTypo>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FormModalDetail;
