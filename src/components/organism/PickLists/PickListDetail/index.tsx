import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row, Table} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from './style.module.scss';
import usePickListDetail from './usePickListDetail';

type PropsTypes = {
  infoDetail: any;
};

const PickListDetail = (props: PropsTypes) => {
  const {infoDetail} = props;
  const {columns, dataSource} = usePickListDetail(infoDetail);

  return (
    <>
      <Row gutter={[16, 16]} className={styles.drap_table_content}>
        <Col xs={24}>
          <Row className='col_item'>
            <Col className='col_left'>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.listName' />
              </AppTypo>
            </Col>
            <Col className='col_right'>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.name ? infoDetail?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
          <Row gutter={[0, 0]} className='col_item'>
            <Col className='col_left'>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.description' />
              </AppTypo>
            </Col>
            <Col className='col_right'>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.description ? infoDetail?.description : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.dataTypeDetail' />
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

export default PickListDetail;
