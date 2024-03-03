import {Col, Row, Spin} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import styles from '../style.module.scss';
import {onGetSalesProgramDetails} from 'redux/actions/SalesPrograms';
import {useDispatch} from 'react-redux';
import AppNotFound from 'components/molecules/AppNotFound';
import {useIntl} from 'react-intl';

type PropsTypes = {
  record: any;
  keyValue: string;
  setIsLoading: any;
  isLoading: boolean;
};

const ContentTab2 = (props: PropsTypes) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {record, keyValue, setIsLoading, isLoading} = props;
  const [dataSaleProgram, setDataSaleProgram] = useState<any>(null);

  useEffect(() => {
    if (keyValue === '2') {
      const fetchSaleProgramDetail = async () => {
        const salesProgramCode = record?.salesProgram.code;
        setIsLoading(true);
        const res: any = await dispatch(
          onGetSalesProgramDetails(salesProgramCode),
        );
        setDataSaleProgram(res);
        setIsLoading(false);
      };
      fetchSaleProgramDetail();
    }
  }, [record, keyValue]);

  return (
    <>
      {isLoading ? (
        <div style={{textAlign: 'center'}}>
          <Spin />
        </div>
      ) : (
        <>
          {!dataSaleProgram ? (
            <AppNotFound
              loading={isLoading}
              isInitialRender={true}
              title={messages['common.emptyData'] as string}
              description={messages['common.emptyDataDescription'] as string}
            />
          ) : (
            <Row gutter={[10, 8]} style={{marginBottom: '10px'}}>
              <Col xs={24} md={12}>
                <Row gutter={[0, 0]} className={styles.col_item}>
                  <Col className={styles.col_left}>
                    <AppTypo variant='p-md-reg'>
                      {messages['common.codeProgram'] as string}
                    </AppTypo>
                  </Col>
                  <Col className={styles.col_right}>
                    <AppTypo variant='p-md-reg'>
                      {dataSaleProgram?.code}
                    </AppTypo>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[0, 0]} className={styles.col_item}>
                  <Col className={styles.col_left}>
                    <AppTypo variant='p-md-reg'>
                      {messages['common.salesProgramName'] as string}
                    </AppTypo>
                  </Col>
                  <Col className={styles.col_right}>
                    <AppTypo variant='p-md-reg'>
                      {dataSaleProgram?.name}
                    </AppTypo>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[0, 0]} className={styles.col_item}>
                  <Col className={styles.col_left}>
                    <AppTypo variant='p-md-reg'>
                      {messages['common.time'] as string}
                    </AppTypo>
                  </Col>
                  <Col className={styles.col_right}>
                    <AppTypo variant='p-md-reg'>{`${dataSaleProgram?.fromDate} - ${dataSaleProgram?.toDate}`}</AppTypo>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[0, 0]} className={styles.col_item}>
                  <Col className={styles.col_left}>
                    <AppTypo variant='p-md-reg'>
                      {messages['common.commission'] as string} (%)
                    </AppTypo>
                  </Col>
                  <Col className={styles.col_right}>
                    <AppTypo variant='p-md-reg'>
                      {dataSaleProgram?.commissionDiscount} %
                    </AppTypo>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[0, 0]} className={styles.col_item}>
                  <Col className={styles.col_left}>
                    <AppTypo variant='p-md-reg'>
                      {messages['common.status'] as string}
                    </AppTypo>
                  </Col>
                  <Col className={styles.col_right}>
                    <AppTypo variant='p-md-reg'>
                      <span
                        style={{color: `#${dataSaleProgram?.status?.color}`}}
                      >
                        {dataSaleProgram?.status?.name}
                      </span>
                    </AppTypo>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ContentTab2;
