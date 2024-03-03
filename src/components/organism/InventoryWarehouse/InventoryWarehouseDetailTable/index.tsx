import AppTableContainer from '@crema/AppTableContainer';
import { pageSize } from 'shared/constants/AppConst';
import useInventoryWarehouseDetailTable from './useInventoryWarehouseDetailTable';
import AppModal from 'components/molecules/AppModal';
import InventoryModal from '../InventoryModal';
import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import InventoryWarehouseDetailFilter from '../InventoryWarehouseDetailFilter';
import AppNotFound from 'components/molecules/AppNotFound';

type InventoryWarehouseDetailTableProps = {
  currentRecord: any;
  isRefreshChild: boolean;
  setIsRefreshChild: (isRefreshChild: boolean) => void;
  inventoryWarehouseRecord: any;
  setIsRefresh: (isRefresh: any) => void;
};
const InventoryWarehouseDetailTable = (
  props: InventoryWarehouseDetailTableProps,
) => {
  const { messages } = useIntl();
  const {
    currentRecord,
    isRefreshChild,
    setIsRefreshChild,
    inventoryWarehouseRecord,
    setIsRefresh,
  } = props;
  const {
    searchParams,
    total,
    columns,
    isLoading,
    dataSource,
    handleChangeSearchParam,
    currentPage,
    setCurrentPage,
    open,
    setOpen,
    modalData,

    addInventoryInfo,
    isOpenInventoryModal,
    setIsOpenInventoryModal,

    isSearchAll,
  } = useInventoryWarehouseDetailTable(
    isRefreshChild,
    setIsRefreshChild,
    inventoryWarehouseRecord,
    setIsRefresh,
  );

  return (
    <>
      <AppModal
        title={modalData?.title}
        description={modalData?.description}
        openModal={open}
        setOpenModal={setOpen}
        handleClose={modalData?.handleClose}
        handleSubmit={modalData?.handleSubmit}
        submitText={modalData?.submitText}
        closeText={modalData?.closeText}
        width={modalData?.width}
      />

      <InventoryModal
        info={addInventoryInfo}
        isOpen={isOpenInventoryModal}
        setIsOpen={setIsOpenInventoryModal}
      />
      <Row gutter={[0, 0]} style={{ marginBottom: '16px', width: '100%' }}>
        {currentRecord && (
          <Col span={24} className='layout_box'>
            <InventoryWarehouseDetailFilter
              searchParams={searchParams}
              inventoryWarehouseRecord={inventoryWarehouseRecord}
              handleChangeSearchParam={handleChangeSearchParam}
            />
          </Col>
        )}

        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            isShowTitle={true}
            className=''
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.INVENTORY}
            scroll={{ x: 1000, y: 420 }}
            handleChangePage={handleChangeSearchParam}
            pagination={{
              position: ['topRight'],
            }}
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={isLoading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyWarehouse'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyWarehouseDescription'
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
export default InventoryWarehouseDetailTable;
