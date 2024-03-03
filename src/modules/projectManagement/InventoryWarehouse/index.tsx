import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import useInventoryWarehouse from './useInventoryWarehouse';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import AppButton from 'components/atoms/AppButton';
import IntlMessages from '@crema/utility/IntlMessages';
import { pageSize } from 'shared/constants/AppConst';
import AppResize from 'components/molecules/AppResize';
import InventoryWarehouseModal from 'components/organism/InventoryWarehouse/InventoryWarehouseModal';
import InventoryModal from 'components/organism/InventoryWarehouse/InventoryModal';
import ImportInventoryModal from 'components/organism/InventoryWarehouse/ImportInventoryModal';
import InventoryWarehouseFilter from 'components/organism/InventoryWarehouse/InventoryWarehouseFilter';
import InventoryWarehouseDetailTable from 'components/organism/InventoryWarehouse/InventoryWarehouseDetailTable';
import AppNotFound from 'components/molecules/AppNotFound';
import AppTableContainer from '@crema/AppTableContainer';

const InventoryWarehouse = () => {
  const { messages } = useIntl();

  const {
    searchParams,
    total,
    columns,
    loading,
    dataSource,
    currentPage,
    setIsRefresh,
    setCurrentPage,
    currentRecord,
    isRefreshChild,
    setIsRefreshChild,
    addItem,
    isOpen,
    setIsOpen,
    modalData,
    handleChangeSearchParams,
    isOpenInventoryModal,
    isOpenImportInventoryModal,
    setIsOpenImportInventoryModal,
    setIsOpenInventoryModal,
    modalInfomation,
    isOpenInventoryWarehouseModal,
    setIsOpenInventoryWarehouseModal,
    handleClickRow,
    isSearchAll,
    contentLoading,
  } = useInventoryWarehouse();

  const renderInventoryWarehouseModal = () => (
    <InventoryWarehouseModal
      info={modalInfomation}
      isOpen={isOpenInventoryWarehouseModal}
      setIsOpen={setIsOpenInventoryWarehouseModal}
      contentLoading={contentLoading}
    />
  );

  const renderInventoryModal = () => (
    <InventoryModal
      info={modalInfomation}
      isOpen={isOpenInventoryModal}
      setIsOpen={setIsOpenInventoryModal}
    />
  );

  const renderImportInventoryModal = () => (
    <ImportInventoryModal
      info={modalInfomation}
      isOpen={isOpenImportInventoryModal}
      setIsOpen={setIsOpenImportInventoryModal}
    />
  );

  const renderAppModal = () => (
    <AppModal
      openModal={isOpen}
      setOpenModal={setIsOpen}
      title={modalData?.title}
      description={modalData?.description}
      handleSubmit={modalData?.handleSubmit}
      submitText={modalData?.submitText}
      handleClose={modalData?.handleClose}
      closeText={modalData?.closeText}
      width={modalData.width}
    />
  );

  const renderInventoryWarehouseFilter = () => (
    <InventoryWarehouseFilter
      searchParams={searchParams}
      onSubmitForm={handleChangeSearchParams}
    />
  );

  const renderAppButton = () => (
    <AppButton type='primary' onClick={addItem}>
      {messages['common.addItem'] as string}
    </AppButton>
  );

  const renderAppTypo = () => (
    <AppTypo variant='h3'>
      <IntlMessages id='common.inventoryWarehouse' />
    </AppTypo>
  );

  const renderAppTableContainer = () => (
    <AppTableContainer
      isSearchAll={isSearchAll}
      currentRecord={currentRecord}
      className=''
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      current={currentPage}
      setCurrent={setCurrentPage}
      total={total}
      pageSize={pageSize.DEFAULT}
      handleChangePage={handleChangeSearchParams}
      handleClickRow={handleClickRow}
      scroll={{ x: 1000, y: 420 }}
      pagination={{
        position: ['topRight'],
      }}
      locale={{
        emptyText: (
          <>
            <AppNotFound
              loading={loading}
              isInitialRender={isSearchAll}
              title={
                isSearchAll
                  ? (messages['common.emptyInventory'] as string)
                  : (messages['common.noResult'] as string)
              }
              description={
                isSearchAll
                  ? (messages['common.emptyInventoryDescription'] as string)
                  : (messages['common.noResultDescription'] as string)
              }
            />
          </>
        ),
      }}
    />
  );

  const renderInventoryWarehouseDetailTable = () => (
    <InventoryWarehouseDetailTable
      currentRecord={currentRecord}
      isRefreshChild={isRefreshChild}
      setIsRefreshChild={setIsRefreshChild}
      inventoryWarehouseRecord={currentRecord}
      setIsRefresh={setIsRefresh}
    />
  );

  return (
    <div>
      {renderInventoryWarehouseModal()}
      {renderInventoryModal()}
      {renderImportInventoryModal()}
      {renderAppModal()}
      <Row
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        {renderAppTypo()}
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>{renderInventoryWarehouseFilter()}</Col>
            <Col flex={'88px'}>{renderAppButton()}</Col>
          </Row>
        </Col>
      </Row>
      <AppResize
        hiddenSecondChild={!total && isSearchAll}
        firstChild={renderAppTableContainer()}
        secondChild={renderInventoryWarehouseDetailTable()}
      />
    </div>
  );
};
export default InventoryWarehouse;
