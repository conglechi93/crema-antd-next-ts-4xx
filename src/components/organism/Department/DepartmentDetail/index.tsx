import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
type PropsTypes = {
  recordDetail: any;
};
const DepartmentModalDetail = (props: PropsTypes) => {
  const {recordDetail} = props;
  const managerWorkSpace = recordDetail?.managerWorkSpace;
  const {employee, position} = managerWorkSpace || {};
  return (
    <Row gutter={[10, 8]} style={{marginBottom: '10px'}}>
      <Col xs={24}>
        <AppTypo variant='p-lg-semi'>
          <IntlMessages id='common.generalInfomation' />
        </AppTypo>
      </Col>
      <Col xs={24} md={12}>
        <Row gutter={[0, 0]} className={'col_item'}>
          <Col className={'col_left'}>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.departmentName' />
            </AppTypo>
          </Col>
          <Col className={'col_right'}>
            <AppTypo variant='p-md-reg'>
              {recordDetail?.name ? recordDetail?.name : '-'}
            </AppTypo>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={12}>
        <Row gutter={[0, 0]} className='col_item'>
          <Col className={'col_left'}>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.managementPersonnel' />
            </AppTypo>
          </Col>
          <Col className={'col_right'}>
            <AppTypo variant='p-md-reg'>
              {employee?.name ? employee?.name : '-'}
            </AppTypo>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={12}>
        <Row gutter={[0, 0]} className={'col_item'}>
          <Col className={'col_left'}>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.position' />
            </AppTypo>
          </Col>
          <Col className={'col_right'}>
            <AppTypo variant='p-md-reg'>
              {position?.name ? position?.name : '-'}
            </AppTypo>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row gutter={[0, 0]} className={'col_item'}>
          <Col className={'col_left'}>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.description' />
            </AppTypo>
          </Col>
          <Col className={'col_right'}>
            <AppTypo variant='p-md-reg'>
              {recordDetail?.description ? recordDetail?.description : '-'}
            </AppTypo>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DepartmentModalDetail;
