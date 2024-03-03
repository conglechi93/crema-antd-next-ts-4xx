import {Col, Image, Row, Spin} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import styles from '../style.module.scss';
import ReactPlayer from 'react-player';
import AppButton from 'components/atoms/AppButton';
import {onGetInventoryDetailByCode} from 'redux/actions/Inventory';
import {useDispatch} from 'react-redux';
import IntlMessages from '@crema/utility/IntlMessages';

type PropsTypes = {
  record: any;
  keyValue: string;
  setIsLoading: any;
  isLoading: boolean;
};

const ContentTab1 = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const {record, keyValue, setIsLoading, isLoading} = props;
  const [transactionDetail, setTransactionDetail] = useState<any>({});

  useEffect(() => {
    if (keyValue === '1') {
      setIsLoading(true);
      const fetchInventoryDetail = async () => {
        const transactionCode = record?.inventory?.code;
        const res: any = await dispatch(
          onGetInventoryDetailByCode(transactionCode, true),
        );
        if (res) {
          setIsLoading(false);
          setTransactionDetail(res);
        }
      };
      fetchInventoryDetail();
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
          <Row gutter={[10, 8]} style={{marginBottom: '10px'}}>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.inventoryName' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {transactionDetail?.name ? transactionDetail?.name : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.nameProject' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {transactionDetail?.inventoryWarehouse?.project?.name
                      ? transactionDetail?.inventoryWarehouse?.project?.name
                      : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>
                    <IntlMessages id='common.inventoryWarehouseName' />
                  </AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {transactionDetail?.inventoryWarehouse?.name
                      ? transactionDetail?.inventoryWarehouse?.name
                      : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
            {transactionDetail?.inventoryDetails?.map(
              (item: any, index: number) => {
                const configPickList = item?.configProperty?.configPickList
                  ? true
                  : false;
                return (
                  <Col xs={24} md={12} key={index}>
                    <Row gutter={[0, 0]} className={styles.col_item}>
                      <Col className={styles.col_left}>
                        <AppTypo variant='p-md-reg'>
                          {item?.configProperty?.name
                            ? item?.configProperty?.name
                            : '-'}
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

          {/* Image */}
          {transactionDetail?.fileAttachments && (
            <>
              <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
                <Col>
                  <AppTypo variant='p-lg-semi'>Hình ảnh</AppTypo>
                </Col>
              </Row>
              <div
                className={styles.info_file_attachments}
                style={{marginBottom: '10px'}}
              >
                <Image.PreviewGroup preview={true}>
                  {transactionDetail?.fileAttachments?.map(
                    (item: any, index: number) => {
                      return <Image key={index} src={item?.url} />;
                    },
                  )}
                </Image.PreviewGroup>
              </div>
            </>
          )}
          {/* Video */}
          {transactionDetail?.videoUrl && (
            <>
              <div className={styles.info_video} style={{marginBottom: '10px'}}>
                <Row gutter={[16, 0]} align={'middle'}>
                  <Col xs={12} md={5}>
                    <ReactPlayer url={transactionDetail?.videoUrl} />
                  </Col>
                  <Col xs={12} md={19}>
                    <Row gutter={[0, 10]}>
                      <Col xs={24}>
                        <AppTypo variant='p-lg-semi'>Video</AppTypo>
                      </Col>
                      <Col xs={24}>
                        <AppTypo variant='p-md-reg'>
                          {transactionDetail?.videoUrl}
                        </AppTypo>
                      </Col>
                      <Col xs={24}>
                        <AppButton
                          href={transactionDetail?.videoUrl}
                          type='primary'
                        >
                          Xem video
                        </AppButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </>
          )}
          {/* Description */}
          {transactionDetail?.description && (
            <>
              <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
                <Col>
                  <AppTypo variant='p-lg-semi'>Mô tả</AppTypo>
                </Col>
              </Row>
              <Row className={styles.description}>
                <Col
                  xs={24}
                  dangerouslySetInnerHTML={{
                    __html: transactionDetail?.description,
                  }}
                ></Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ContentTab1;
