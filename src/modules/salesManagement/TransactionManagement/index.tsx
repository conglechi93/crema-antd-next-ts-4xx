import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import SalesTransactionFilter from 'components/organism/SalesTransaction/SalesTransactionFilter';
import useSalesProgram from './useTransactionManagement';
import { pageSize } from 'shared/constants/AppConst';
import AppModal from 'components/molecules/AppModal';
import { useIntl } from 'react-intl';
import ConfirmTransaction from 'components/organism/SalesProgram/ConfirmTransaction';
import AppNotFound from 'components/molecules/AppNotFound';

const TransactionManagement = () => {
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
    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
    handleChangeSearchParams,
    loadingSaleTransaction,
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
        width={modalData.width || 768}
        styles={{
          body: {
            height: modalData.height,
          },
        }}
        loading={loadingSaleTransaction}
      />
      <ConfirmTransaction
        info={info}
        setInfo={setInfo}
        isOpen={isOpenConfirmTransaction}
        setIsOpen={setIsOpenConfirmTransaction}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row gutter={[10, 0]} justify={'space-between'} align={'middle'}>
            <Col xs={20}>
              <AppTypo variant='h3'>
                <IntlMessages id='common.transactionManagement' />
              </AppTypo>
            </Col>
            <Col xs={4} style={{ textAlign: 'right' }}>
              <SalesTransactionFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className='table_custom_record'
            dataSource={dataSource}
            columns={columns}
            loading={isLoading}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.SALES_TRANSACTIONS}
            scroll={{ x: 1000, y: 600 }}
            handleChangePage={handleChangeSearchParams}
            pagination={{
              position: ['bottomRight'],
            }}
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={isLoading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyTransaction'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyTransactionDescription'
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
    </div>
  );
};
export default TransactionManagement;
