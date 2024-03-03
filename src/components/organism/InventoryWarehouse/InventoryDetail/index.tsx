import {Col, Image, Row} from 'antd';
import AppTag from 'components/atoms/AppTag';
import AppTypo from 'components/atoms/AppTypo';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetInventoryDetailByCode} from 'redux/actions/Inventory';
import styles from './style.module.scss';
import ReactPlayer from 'react-player';
import AppButton from 'components/atoms/AppButton';
import {PropertyType} from 'shared/constants/AppVariables';
import IntlMessages from '@crema/utility/IntlMessages';

type PropsTypes = {
  inventoryRecord: any;
};

const InventoryDetail = (props: PropsTypes) => {
  const {inventoryRecord} = props;
  const dispatch = useDispatch();
  const [inventoryDetail, setInventoryDetail] = useState<any>({});
  useEffect(() => {
    const fetchInventoryDetail = async () => {
      const inventoryCode = inventoryRecord.code;
      const res = await dispatch(
        onGetInventoryDetailByCode(inventoryCode, true),
      );
      setInventoryDetail(res);
    };
    fetchInventoryDetail();
  }, [inventoryRecord]);

  return (
    <div className={styles.detail_inventory}>
      <Row gutter={[12, 12]} align={'middle'} style={{marginBottom: '10px'}}>
        <Col>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.inventoryInfo' />
          </AppTypo>
        </Col>
        <Col>
          <AppTag
            title={inventoryDetail?.status?.name}
            color={`#${inventoryDetail?.status?.color}`}
          />
        </Col>
      </Row>
      {/*  */}
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
                {inventoryDetail?.name ? inventoryDetail?.name : '-'}
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
                {inventoryDetail?.inventoryWarehouse?.project?.name
                  ? inventoryDetail?.inventoryWarehouse?.project?.name
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
                {inventoryDetail?.inventoryWarehouse?.name
                  ? inventoryDetail?.inventoryWarehouse?.name
                  : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        {inventoryDetail?.inventoryDetails?.map((item: any, index: number) => {
          const configPropertyName = item?.configProperty?.name;
          const isList =
            item?.configProperty?.configDataType?.code ===
            PropertyType.TYPE_LIST;
          let configPropertyValue = item?.value;
          if (isList) {
            configPropertyValue = configPropertyValue
              .map((x: any) => x?.name)
              .join(', ');
          }
          return (
            <Col xs={24} md={12} key={index}>
              <Row gutter={[0, 0]} className={styles.col_item}>
                <Col className={styles.col_left}>
                  <AppTypo variant='p-md-reg'>{configPropertyName}</AppTypo>
                </Col>
                <Col className={styles.col_right}>
                  <AppTypo variant='p-md-reg'>
                    {configPropertyValue ? configPropertyValue : '-'}
                  </AppTypo>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
      {/* Image */}
      <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
        <Col>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.image' />
          </AppTypo>
        </Col>
      </Row>
      <div
        className={styles.info_file_attachments}
        style={{marginBottom: '10px'}}
      >
        {inventoryDetail?.fileAttachments ? (
          <Image.PreviewGroup preview={true}>
            {inventoryDetail?.fileAttachments?.map(
              (item: any, index: number) => {
                return <Image key={index} src={item?.url} />;
              },
            )}
          </Image.PreviewGroup>
        ) : (
          <AppTypo variant='p-md-reg'>
            <IntlMessages id='common.notImage' />
          </AppTypo>
        )}
      </div>

      {/* Video */}
      <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
        <Col>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.video' />
          </AppTypo>
        </Col>
      </Row>
      {inventoryDetail?.videoUrl ? (
        <div className={styles.info_video} style={{marginBottom: '10px'}}>
          <Row gutter={[16, 0]} align={'middle'}>
            <Col xs={12} md={5}>
              <ReactPlayer url={inventoryDetail?.videoUrl} />
            </Col>
            <Col xs={12} md={19}>
              <Row gutter={[0, 10]}>
                <Col xs={24}></Col>
                <Col xs={24}>
                  <AppTypo variant='p-md-reg'>
                    {inventoryDetail?.videoUrl}
                  </AppTypo>
                </Col>
                <Col xs={24}>
                  <AppButton href={inventoryDetail?.videoUrl} type='primary'>
                    <IntlMessages id='common.watchVideo' />
                  </AppButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
          <Col xs={24}>
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.notVideo' />
            </AppTypo>
          </Col>
        </Row>
      )}
      {/* Description */}
      {inventoryDetail?.description && (
        <>
          <Row gutter={[12, 12]} style={{marginBottom: '10px'}}>
            <Col>
              <AppTypo variant='p-lg-semi'>
                <IntlMessages id='common.description' />
              </AppTypo>
            </Col>
          </Row>
          <Row className={styles.description}>
            <Col
              xs={24}
              dangerouslySetInnerHTML={{__html: inventoryDetail?.description}}
            ></Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default InventoryDetail;
