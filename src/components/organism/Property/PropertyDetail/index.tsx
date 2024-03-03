import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import AppCheckbox from 'components/atoms/AppCheckbox';
import {AppTableContainer} from '@crema';
import IntlMessages from '@crema/utility/IntlMessages';

type PropsTypes = {
  propertyDetails: any;
};

const PropertyDetail = (props: PropsTypes) => {
  const {propertyDetails} = props;
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  useEffect(() => {
    if (propertyDetails) {
      const newDataSource: Array<any> = [];
      propertyDetails?.configPickList?.configPickListOptions?.forEach(
        (item: any, index: number) => {
          let options = {
            index: index + 1,
            value: item?.name,
          };
          newDataSource?.push(options);
        },
        setDataSource(newDataSource),
      );
    }
  }, [propertyDetails]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      width: 'auto',
    },
  ];

  return (
    <>
      <Row
        gutter={[10, 8]}
        style={{marginBottom: '10px'}}
        className={styles.info_property}
      >
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.generalInfomation' />
          </AppTypo>
        </Col>
        {propertyDetails?.name && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.propertyName' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>{propertyDetails?.name}</AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.configDataType?.name && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.dataTypeList' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.configDataType?.name}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.minLength && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.minValue' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.minLength}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.maxLength && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.maxValue' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.maxLength}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.minValue && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.minValue' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.minValue}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.maxValue && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.maxValue' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.maxValue}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.configPickList?.description && (
          <Col xs={24}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.description' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.configPickList?.description}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        {propertyDetails?.configPickList?.name && (
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.list' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {propertyDetails?.configPickList?.name}
                </AppTypo>
              </Col>
            </Row>
          </Col>
        )}

        <Col xs={24}>
          <Row gutter={[0, 0]}>
            <Col xs={24}>
              <AppCheckbox
                checked={propertyDetails?.isRequired}
                disabled={!propertyDetails?.isRequired}
                label='Bắt buộc'
              ></AppCheckbox>
            </Col>
            <Col xs={24}>
              <AppCheckbox
                disabled={!propertyDetails?.isNotDuplicate}
                checked={propertyDetails?.isNotDuplicate}
                label='Không cho trùng dữ liệu'
              ></AppCheckbox>
            </Col>
          </Row>
        </Col>
      </Row>

      {propertyDetails?.configPickList && (
        <Row
          gutter={[10, 8]}
          style={{marginBottom: '10px'}}
          className={styles.info_property_list}
        >
          <Col xs={24}>
            <AppTypo variant='p-lg-semi'>
              <IntlMessages id='common.dataTypeDetail' />
            </AppTypo>
          </Col>
          <Col xs={24}>
            <div className={styles.table_propery_detail}>
              <AppTableContainer
                className='table_custom_record_none'
                total={0}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PropertyDetail;
