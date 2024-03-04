import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import usePickLists from './usePickLists';
import { pageSize } from 'shared/constants/AppConst';
import PickListModal from 'components/organism/PickLists/PickListModal';
import AppModal from 'components/molecules/AppModal';
import PickListsFilter from 'components/organism/PickLists/PickListsFilter';
import AppNotFound from 'components/molecules/AppNotFound';

const PickLists = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    pickListModalOpen,
    setPickListModalOpen,

    pickListModalInfo,
    handleOpenPickListModal,
    handleChangeSearchParams,

    appModalOpen,
    setAppModalOpen,
    appModalData,
  } = usePickLists();
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
      <PickListModal
        info={pickListModalInfo}
        isOpen={pickListModalOpen}
        setIsOpen={setPickListModalOpen}
      />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.pickLists' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <PickListsFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleOpenPickListModal}>
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
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={loading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyPickList'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyPickListDescription'
                          ] as string)
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
export default PickLists;
