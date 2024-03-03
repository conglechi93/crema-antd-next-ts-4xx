import {Avatar, Col, Row, Spin} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import styles from '../style.module.scss';
import IntlMessages from '@crema/utility/IntlMessages';
import {onGetDetailEmployee} from 'redux/actions/Employees';
import {useDispatch} from 'react-redux';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import {onGetCustomerDetailByCode} from 'redux/actions/Customer';
import imgExcel from 'assets/image/Excel.png';

type PropsTypes = {
  record: any;
  activeValue: string;
  setIsLoading: any;
  isLoading: boolean;
};

const ContentTab1 = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const {record, activeValue, isLoading, setIsLoading} = props;
  const [dataCustomerInfo, setDataCustomerInfo] = useState<any>(null);

  useEffect(() => {
    if (activeValue === '1') {
      const fetchCustomerDetails = async (customerCode: string) => {
        if (!customerCode) return;
        setIsLoading(true);
        const res: any =
          (await dispatch(onGetCustomerDetailByCode(customerCode, true))) ?? {};

        setIsLoading(false);
        if (res) setDataCustomerInfo(res);
      };
      const customerCode = record?.code;
      fetchCustomerDetails(customerCode);
    }
  }, [record, activeValue]);

  return (
    <>
      {isLoading ? (
        <div style={{textAlign: 'center'}}>
          <Spin />
        </div>
      ) : (
        <>
          <Row gutter={[10, 8]} style={{marginBottom: '10px', width: '100%'}}>
            <Col xs={24}>
              <Avatar
                size={64}
                icon={
                  <img
                    src={
                      dataCustomerInfo?.avatar
                        ? dataCustomerInfo?.avatar?.url
                        : EmptyAvatar.src
                    }
                    alt=''
                  />
                }
              />
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.fullName' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo?.name ? dataCustomerInfo?.name : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.phone' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo?.phone ? dataCustomerInfo?.phone : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.customerGroup' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo?.customerGroup
                      ? dataCustomerInfo?.customerGroup?.name
                      : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.customerSource' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo?.customerSource
                      ? dataCustomerInfo?.customerSource?.name
                      : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.tags' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  {dataCustomerInfo && (
                    <AppTypo variant='p-md-reg'>
                      {dataCustomerInfo?.tags
                        ?.map((item: any) => item.name)
                        .join(', ')}
                    </AppTypo>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.status' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo?.status
                      ? dataCustomerInfo?.status?.name
                      : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.staffInCharge' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {dataCustomerInfo && (
                      <AppTypo variant='p-md-reg'>
                        {dataCustomerInfo?.staffInCharges
                          ?.map((item: any) => item.name)
                          .join(', ')}
                      </AppTypo>
                    )}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            {dataCustomerInfo &&
              dataCustomerInfo?.customerDetails?.map(
                (item: any, index: any) => {
                  const configPickList = item?.configProperty?.configPickList
                    ? true
                    : false;
                  return (
                    <Col xs={24} md={12} key={index}>
                      <Row gutter={[0, 0]} className={styles.col_item}>
                        <Col className={styles.col_left}>
                          <AppTypo variant='p-md-reg'>
                            <IntlMessages
                              id={item?.configProperty?.description}
                            />
                          </AppTypo>
                        </Col>
                        <Col className={styles.col_right}>
                          <AppTypo variant='p-md-reg'>
                            {configPickList
                              ? item?.value
                                  ?.map((item: any) => item.name)
                                  .join(', ')
                              : item?.value
                              ? item?.value
                              : '-'}
                          </AppTypo>
                        </Col>
                      </Row>
                    </Col>
                  );
                },
              )}
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <Row gutter={[10, 10]}>
                <Col xs={24}>
                  <AppTypo variant='p-lg-semi'>
                    <IntlMessages id='common.attachedFiles' />
                  </AppTypo>
                </Col>
                <Col xs={24}>
                  {dataCustomerInfo?.fileAttachments ? (
                    dataCustomerInfo?.fileAttachments?.map(
                      (item: any, index: any) => {
                        return (
                          <a href={item?.url} download key={index}>
                            <Row gutter={[8, 8]} align={'middle'}>
                              <Col>
                                <img
                                  style={{display: 'block'}}
                                  src={imgExcel.src}
                                  alt=''
                                />
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                  }}
                                >
                                  <AppTypo variant='p-md-reg'>
                                    {item.fileName}
                                  </AppTypo>
                                </div>
                              </Col>
                            </Row>
                          </a>
                        );
                      },
                    )
                  ) : (
                    <AppTypo variant='p-md-reg'>Chưa có file đính kèm</AppTypo>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row gutter={[10, 10]}>
                <Col xs={24}>
                  <AppTypo variant='p-lg-semi'>
                    <IntlMessages id='common.notes' />
                  </AppTypo>
                </Col>
                <Col xs={24}>
                  {dataCustomerInfo?.description ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataCustomerInfo?.description,
                      }}
                    ></p>
                  ) : (
                    <p>Chưa có ghi chú</p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ContentTab1;
