import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useWorkFlow from './useWorkFlow';
import AppModal from 'components/molecules/AppModal';
import WorkFlowModal from 'components/organism/WorkFlow/WorkFlowModal';
import WorkFlowFilter from 'components/organism/WorkFlow/WorkFlowFilter';

const WorkFlow = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    workFlowModalOpen,
    setWorkFlowModalOpen,
    info,
    handleOpenPropertyModal,
    handleChangeSearchParams,
    appModalOpen,
    appModalData,
    setAppModalOpen,
  } = useWorkFlow();
  return (
    <>
      <AppModal
        title={appModalData?.title}
        description={appModalData?.description}
        openModal={appModalOpen}
        setOpenModal={setAppModalOpen}
        handleSubmit={appModalData?.handleSubmit}
        submitText={appModalData?.submitText}
        handleClose={appModalData?.handleClose}
        closeText={appModalData?.closeText}
      />
      <WorkFlowModal
        info={info}
        isOpen={workFlowModalOpen}
        setIsOpen={setWorkFlowModalOpen}
      />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.workFlowDefine' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <WorkFlowFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleOpenPropertyModal}>
                {messages['common.addNew'] as string}
              </AppButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            total={total}
            className='table_custom_record'
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            current={current}
            setCurrent={setCurrent}
            pageSize={pageSize.DEFAULT}
            scroll={{ x: 1000, y: 420 }}
            handleChangePage={handleChangeSearchParams}
            pagination={{
              position: ['bottomRight'],
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default WorkFlow;
