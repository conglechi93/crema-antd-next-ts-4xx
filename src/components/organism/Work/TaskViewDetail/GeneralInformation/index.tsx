import IntlMessages from '@crema/utility/IntlMessages';
import {Col, Row} from 'antd';
import AppProgressPercent from 'components/atoms/AppProgressPercent';
import AppTypo from 'components/atoms/AppTypo';
import React, {memo} from 'react';
import useGeneralInformation from './useFunc';
import AppInlineSelect from 'components/atoms/AppInlineSelect';

type PropsTypes = {
  detailInfo: any;
};

const GeneralInformation = (props: PropsTypes) => {
  const {detailInfo} = props;
  const {
    project,
    handleChangeProject,
    workflowStatus,
    workflowValue,
    setWorkflowValue,
    priorityOptions,
    priorityValue,
    setPriorityValue,
    reporters,
    reporterValue,
    setReporterValue,
    assignees,
    assigneeValue,
    setAssigneeValue,
  } = useGeneralInformation(detailInfo);

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            <IntlMessages id='common.titleDetailWork' />
          </AppTypo>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.project' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.project?.name ? detailInfo?.project?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        {/* <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.nameProject' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppInlineTextField
                defaultValue={project}
                onConfirm={handleChangeProject}
                placeholder='Chọn dự án'
              />
            </Col>
          </Row>
        </Col> */}
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.status' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppInlineSelect
                isMulti={false}
                options={workflowStatus}
                editValue={workflowValue}
                setEditValue={setWorkflowValue}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.parentTask' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.parent?.name ? detailInfo?.parent?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.startDate' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.startDate ? detailInfo?.startDate : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.endDate' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.endDate ? detailInfo?.endDate : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.progress' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppProgressPercent percent={detailInfo?.progress} />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.priority' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppInlineSelect
                isMulti={false}
                options={priorityOptions}
                editValue={priorityValue}
                setEditValue={setPriorityValue}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.jobType' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.jobType?.name ? detailInfo?.jobType?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.reporters' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppInlineSelect
                isMulti={true}
                options={reporters}
                editValue={reporterValue}
                setEditValue={setReporterValue}
              />
            </Col>
          </Row>
        </Col>{' '}
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.assignees' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppInlineSelect
                isMulti={true}
                options={assignees}
                editValue={assigneeValue}
                setEditValue={setAssigneeValue}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.jobAssigner' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.createdBy ? detailInfo?.createdBy?.name : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row className='col_item'>
            <Col xs={10}>
              <AppTypo variant='p-md-reg'>
                <IntlMessages id='common.deliveryDate' />
              </AppTypo>
            </Col>
            <Col xs={14}>
              <AppTypo variant='p-md-reg'>
                {detailInfo?.createdDate ? detailInfo?.createdDate : '-'}
              </AppTypo>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default memo(GeneralInformation);
