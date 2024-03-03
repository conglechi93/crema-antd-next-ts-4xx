import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from './style.module.scss';
import useProjectDetail from './useProjectDetail';
import imgExcel from 'assets/image/Excel.png';
import {AppTableContainer} from '@crema';
import AppNotFound from 'components/molecules/AppNotFound';
import {useIntl} from 'react-intl';

type PropsTypes = {
  infoDetail: any;
  dataSource: Array<any>;
};

const ProjectDetail = (props: PropsTypes) => {
  const {messages} = useIntl();
  const {infoDetail, dataSource} = props;
  const {columns, onDownloadProject} = useProjectDetail();

  return (
    <>
      <AppTypo variant='p-lg-semi'>
        <IntlMessages id='common.generalInfomation' />
      </AppTypo>
      <Row
        gutter={[16, 16]}
        className={styles.drap_table_content}
        style={{marginTop: '10px'}}
      >
        <Col xs={24} md={12}>
          <Row gutter={[0, 0]} className={'col_item'}>
            <Col className={'col_left'}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.nameProject' />
              </AppTypo>
            </Col>
            <Col className={'col_right'}>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.name ? infoDetail?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Row gutter={[0, 0]} className={'col_item'}>
            <Col className={'col_left'}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.workFlow' />
              </AppTypo>
            </Col>
            <Col className={'col_right'}>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.workflow?.name ? infoDetail?.workflow?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={12}>
          <Row gutter={[0, 0]} className={'col_item'}>
            <Col className={'col_left'}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.startDate' />
              </AppTypo>
            </Col>
            <Col className={'col_right'}>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.startDate ? infoDetail?.startDate : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[0, 0]} className={'col_item'}>
            <Col className={'col_left'}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.endDate' />
              </AppTypo>
            </Col>
            <Col className={'col_right'}>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.endDate ? infoDetail?.endDate : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[0, 0]} className={'col_item'}>
            <Col xs={24} className={'col_left'}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.description' />
              </AppTypo>
            </Col>
            <Col xs={24} className={'col_right'}>
              <AppTypo variant='p-md-reg'>
                {infoDetail?.description ? infoDetail?.description : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppTypo variant='p-md-reg'>
            <IntlMessages id='common.attachedFiles' />
          </AppTypo>
          {infoDetail?.fileAttachments ? (
            infoDetail?.fileAttachments?.map((item: any) => {
              return (
                <Row
                  gutter={[8, 8]}
                  align={'middle'}
                  style={{marginTop: '10px'}}
                >
                  <Col>
                    <img style={{display: 'flex'}} src={imgExcel.src} alt='' />
                  </Col>
                  <Col>
                    <span
                      onClick={() => onDownloadProject(item)}
                      style={{cursor: 'pointer'}}
                    >
                      {item?.fileName}
                    </span>
                  </Col>
                </Row>
              );
            })
          ) : (
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.notAttachedFiles' />
            </AppTypo>
          )}
        </Col>

        <Col xs={24}>
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <AppTypo variant='p-lg-semi'>
                <IntlMessages id='common.inforPersonnel' />
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
    </>
  );
};

export default ProjectDetail;
