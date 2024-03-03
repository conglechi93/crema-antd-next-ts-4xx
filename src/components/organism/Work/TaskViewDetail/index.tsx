import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React, {memo} from 'react';
import AppBreadcrumb from 'components/molecules/AppBreadcrumb';
import AppCollapse from 'components/molecules/AppCollapse';
import {useIntl} from 'react-intl';
import useWorkViewDetail from './useTaskViewDetail';
import GeneralInformation from './GeneralInformation';

type PropsTypes = {
  detailInfo: any;
  fetchTaskDetails: (code: string) => Promise<void>;
};

const TaskViewDetail = (props: PropsTypes) => {
  const {detailInfo, fetchTaskDetails} = props;
  const {messages} = useIntl();

  const {form, itemsCollapse, itemsBreadcrumb} = useWorkViewDetail(
    detailInfo,
    fetchTaskDetails,
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={17}>
          <Row gutter={[10, 0]}>
            <Col xs={24}>
              <AppBreadcrumb separator='>' items={itemsBreadcrumb} />
            </Col>
            <Col xs={24}>
              <Row gutter={[8, 0]} align={'middle'}>
                <Col xs={20}>
                  <AppTypo variant='p-lg-semi'>{detailInfo?.name}</AppTypo>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <AppCollapse items={itemsCollapse} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={7}>
          <GeneralInformation detailInfo={detailInfo} />
        </Col>
      </Row>
    </>
  );
};

export default memo(TaskViewDetail);
