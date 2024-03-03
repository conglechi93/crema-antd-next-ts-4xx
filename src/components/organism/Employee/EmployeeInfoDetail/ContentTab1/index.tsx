import {Avatar, Col, Row, Spin} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import styles from '../style.module.scss';
import IntlMessages from '@crema/utility/IntlMessages';
import {onGetDetailEmployee} from 'redux/actions/Employees';
import {useDispatch} from 'react-redux';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import {AppTableContainer} from '@crema';
import AppNotFound from 'components/molecules/AppNotFound';
import {useIntl} from 'react-intl';

type PropsTypes = {
  record: any;
  activeValue: string;
  setIsLoading: any;
  isLoading: boolean;
};

const ContentTab1 = (props: PropsTypes) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {record, activeValue, isLoading, setIsLoading} = props;
  const [dataEmployeeInfo, setDataEmployeeInfo] = useState<any>(null);
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    if (activeValue === '1') {
      let dataSource: any = [];
      const fetchEmployeeDetails = async (employeeCode: string) => {
        if (!employeeCode) return;
        setIsLoading(true);
        const res: any =
          (await dispatch(onGetDetailEmployee(employeeCode))) ?? {};
        setIsLoading(false);
        const info: any = res;
        res?.workSpaces?.forEach((item: any, index: any) => {
          dataSource.push({
            ...item,
            key: index + 1,
            index: index + 1,
            department: item?.department?.name,
            position: item?.position?.name,
            id: index + 1,
          });
        });
        setDataSource(dataSource);
        if (info) setDataEmployeeInfo(info);
      };
      const employeeCode = record?.code;
      fetchEmployeeDetails(employeeCode);
    }
  }, [record, activeValue]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      width: '50%',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      width: '50%',
    },
  ];

  return (
    <>
      {isLoading ? (
        <div style={{textAlign: 'center'}}>
          <Spin />
        </div>
      ) : (
        <Row gutter={[10, 8]} style={{marginBottom: '10px'}}>
          <Col xs={24}>
            <Avatar
              size={64}
              icon={
                <img
                  src={
                    dataEmployeeInfo?.fileAttachments &&
                    dataEmployeeInfo?.fileAttachments?.length > 0
                      ? dataEmployeeInfo?.fileAttachments[0]?.url
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
                  {dataEmployeeInfo?.name ? dataEmployeeInfo?.name : '-'}
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
                  {dataEmployeeInfo?.phone ? dataEmployeeInfo?.phone : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.email' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.email ? dataEmployeeInfo?.email : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>Giới tính</AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.gender?.name
                    ? dataEmployeeInfo?.gender?.name
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.dateOfBirth' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.birthday
                    ? dataEmployeeInfo?.birthday
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.laborContract' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.labourContract?.name
                    ? dataEmployeeInfo?.labourContract?.name
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.province' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.province?.name
                    ? dataEmployeeInfo?.province?.name
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.district' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.district?.name
                    ? dataEmployeeInfo?.district?.name
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.wards' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.wards?.name
                    ? dataEmployeeInfo?.wards?.name
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.address' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.street ? dataEmployeeInfo?.street : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={12}>
            <Row gutter={[0, 0]} className={styles.col_item}>
              <Col className={styles.col_left}>
                <AppTypo variant='p-md-reg'>
                  <IntlMessages id='common.lastAccessTime' />
                </AppTypo>
              </Col>
              <Col className={styles.col_right}>
                <AppTypo variant='p-md-reg'>
                  {dataEmployeeInfo?.lastAccessTime
                    ? dataEmployeeInfo?.lastAccessTime
                    : '-'}
                </AppTypo>
              </Col>
            </Row>
          </Col>
          <Col xs={24} style={{marginTop: '6px'}}>
            <Row gutter={[0, 16]}>
              <Col xs={24}>
                <AppTypo variant='p-lg-semi'>
                  <IntlMessages id='common.positionDetail' />
                </AppTypo>
              </Col>
              <Col xs={24}>
                <AppTableContainer
                  className='table_picklist'
                  total={0}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  locale={{
                    emptyText: (
                      <>
                        <AppNotFound
                          loading={false}
                          isInitialRender={true}
                          title={messages['common.emptyData'] as string}
                          description={
                            messages['common.emptyDataDescription'] as string
                          }
                        />
                      </>
                    ),
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ContentTab1;
