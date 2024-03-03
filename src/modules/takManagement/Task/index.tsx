'use client';
import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useWork from './useTask';
import AppModal from 'components/molecules/AppModal';
import TaskModal from 'components/organism/Work/TaskModal';
import DashBoard from 'components/organism/Work/DashBoard';
import TaskFilter from 'components/organism/Work/TaskFilter';
import { memo } from 'react';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { onGetProjectList } from 'redux/actions/ProjectManagement';

const Task = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    info,
    isOpen,
    setIsOpen,
    handleOpenFormModal,
    handleChangeSearchParams,

    isOpenModal,
    setIsOpenModal,
    modalInfo,

    isDashboard,
    handleChangeView,

    projectCode,
    projectSearchParams,
    setProjectSearchParams,
    handleChangeProject,
  } = useWork();
  return (
    <>
      {isOpenModal && (
        <AppModal
          title={modalInfo?.title}
          description={modalInfo?.description}
          openModal={isOpenModal}
          setOpenModal={setIsOpenModal}
          handleSubmit={modalInfo?.handleSubmit}
          submitText={modalInfo?.submitText}
          handleClose={modalInfo?.handleClose}
          closeText={modalInfo?.closeText}
          disabled={modalInfo?.disabled}
          onClosable={modalInfo?.onClosable}
          destroyOnClose
          width={modalInfo?.width}
        />
      )}
      {/* <TaskModal info={info} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={6}>
          <AppTypo variant='h3'>
            <IntlMessages id='navbar.taskManagement' />
          </AppTypo>
        </Col>

        <Col xs={18}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col xs={4}>
              <AppSelectLoadMore
                onGetOptions={onGetProjectList}
                searchParams={projectSearchParams}
                setSearchParams={setProjectSearchParams}
                placeholder={messages['common.projectHint'] as string}
                onChange={handleChangeProject}
              />
            </Col>
            <Col flex={'none'}>
              <TaskFilter handleChangeSearchParams={handleChangeSearchParams} />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleOpenFormModal}>
                {messages['common.addNew'] as string}
              </AppButton>
            </Col>
            <Col flex={'88px'}>
              <AppButton
                type='primary'
                onClick={handleChangeView}
                disabled={projectCode ? false : true}
              >
                Chuyển trạng thái
              </AppButton>
            </Col>
          </Row>
        </Col>
      </Row>
      {isDashboard ? (
        <>
          <DashBoard projectCode={projectCode} />
        </>
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AppTableContainer
              isSearchAll={isSearchAll}
              className='table_custom_record'
              total={total}
              columns={columns}
              loading={loading}
              dataSource={dataSource}
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
      )}
    </>
  );
};
export default memo(Task);
