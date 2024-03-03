import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import useSalesProgram from './useSalesProgram';
import { pageSize } from 'shared/constants/AppConst';
import AppModal from 'components/molecules/AppModal';
import AppButton from 'components/atoms/AppButton';
import { useIntl } from 'react-intl';
import AppResize from 'components/molecules/AppResize';
import SalesProgramModal from 'components/organism/SalesProgram/SalesProgramModal';
import ChooseInventoryModal from 'components/organism/SalesProgram/ChooseInventoryModal';
import SalesProgramFilter from 'components/organism/SalesProgram/SalesProgramFilter';
import SalesProgramDetailTable from 'components/organism/SalesProgram/SalesProgramDetailTable';
import AppNotFound from 'components/molecules/AppNotFound';
import AppTableContainer from '@crema/AppTableContainer';

const SalesProgram = () => {
  const {
    isSearchAll,
    total,
    columns,
    isLoading,
    dataSource,
    currentPage,
    setCurrentPage,

    isOpen,
    setIsOpen,
    modalData,

    addInventoriesToProgramInfo,
    isOpenChooseInventoryModal,
    setIsOpenChooseInventoryModal,

    salesProgramInfo,
    isOpenSalesProgramModal,
    setIsOpenSalesProgramModal,
    handleClickRow,

    modalSaleProgram,

    handleChangeSearchParams,
    handleAddSalesProgram,

    currentRecord,
    isRefreshChild,
    setIsRefreshChild,
    loadingSaleProgramNoti,
  } = useSalesProgram();
  const { messages } = useIntl();

  return (
    <div>
      <AppModal
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title={modalData?.title}
        description={modalData?.description}
        handleSubmit={modalData.handleSubmit}
        submitText={modalData?.submitText}
        handleClose={modalData?.handleClose}
        closeText={modalData?.closeText}
        width={modalData.width || 600}
        loading={loadingSaleProgramNoti}
        destroyOnClose
        onClosable={modalData?.onClosable}
      />
      <SalesProgramModal
        info={salesProgramInfo}
        modalSaleProgram={modalSaleProgram}
        isOpen={isOpenSalesProgramModal}
        setIsOpen={setIsOpenSalesProgramModal}
      />

      <ChooseInventoryModal
        info={addInventoriesToProgramInfo}
        isOpen={isOpenChooseInventoryModal}
        setIsOpen={setIsOpenChooseInventoryModal}
      />
      <Row
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.salesProgram' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <SalesProgramFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleAddSalesProgram}>
                {messages['common.addNew'] as string}
              </AppButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppResize
            hiddenSecondChild={!total && isSearchAll}
            firstChild={
              <AppTableContainer
                isSearchAll={isSearchAll}
                currentRecord={currentRecord}
                className=''
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                current={currentPage}
                setCurrent={setCurrentPage}
                total={total}
                pageSize={pageSize.SALES_PROGRAMS}
                scroll={{ x: 1000, y: 420 }}
                handleClickRow={handleClickRow}
                handleChangePage={handleChangeSearchParams}
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
                            ? (messages['common.emptySaleProgram'] as string)
                            : (messages['common.noResult'] as string)
                        }
                        description={
                          isSearchAll
                            ? (messages[
                                'common.emptySaleProgramDescription'
                              ] as string)
                            : (messages['common.noResultDescription'] as string)
                        }
                      />
                    </>
                  ),
                }}
              />
            }
            secondChild={
              <SalesProgramDetailTable
                isRefreshChild={isRefreshChild}
                setIsRefreshChild={setIsRefreshChild}
                record={currentRecord}
              />
            }
          ></AppResize>
        </Col>
      </Row>
    </div>
  );
};
export default SalesProgram;
