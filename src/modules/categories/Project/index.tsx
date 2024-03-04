import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useProject from './useFunc';
import AppModal from 'components/molecules/AppModal';
import ProjectFilter from 'components/organism/Project/ProjectFilter';
import ProjectModal from 'components/organism/Project/ProjectModal';
import AppNotFound from 'components/molecules/AppNotFound';

const Project = () => {
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

    appModalOpen,
    setAppModalOpen,
    appModalData,
  } = useProject();
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
      <ProjectModal info={info} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.projectList' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <ProjectFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleOpenFormModal}>
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
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={loading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyProject'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages['common.emptyProjectDescription'] as string)
                        : (messages['common.noResultDescription'] as string)
                    }
                  />
                </>
              ),
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default Project;
