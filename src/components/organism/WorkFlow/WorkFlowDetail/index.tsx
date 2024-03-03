import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row, Table} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from './style.module.scss';
import useWorkFlowDetail from './useWorkFlowDetail';

type PropsTypes = {
  infoDetail: any;
};

const WorkFlowDetail = (props: PropsTypes) => {
  const {infoDetail} = props;
  const {columns, dataSource, dataWorkflowInfo} = useWorkFlowDetail(infoDetail);

  return (
    <>
      <Row gutter={[16, 16]} className={styles.drap_table_content}>
        <Col xs={24}>
          <Row className='col_item'>
            <Col className='col_left'>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.workflowName' />
              </AppTypo>
            </Col>
            <Col className='col_right'>
              <AppTypo variant='p-md-reg'>
                {dataWorkflowInfo?.name ? dataWorkflowInfo?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
          <Row gutter={[0, 8]} className='col_item'>
            <Col xs={24} className='col_left'>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.description' />
              </AppTypo>
            </Col>
            <Col xs={24} className='col_right'>
              <AppTypo variant='p-md-reg'>
                {dataWorkflowInfo?.description
                  ? dataWorkflowInfo?.description
                  : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.stageInformation' />
          </AppTypo>
        </Col>

        <Col xs={24}>
          <Table
            className={styles.table_picklist}
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default WorkFlowDetail;
