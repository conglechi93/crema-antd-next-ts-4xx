import AppTableContainer from '@crema/AppTableContainer';
import { Col, Row, Skeleton } from 'antd';
import { pageSize } from 'shared/constants/AppConst';
import AppModal from 'components/molecules/AppModal';
import { useIntl } from 'react-intl';
import useTransactionDetail from './useTransactionDetail';
import TransactionDetailFilter from './transactionDetailFilter';
import ConfirmTransaction from 'components/organism/SalesProgram/ConfirmTransaction';

type PropsTypes = {
  record: any;
  keyValue: string;
  setIsLoading: any;
  isLoading: boolean;
};

const ContentTab3 = (props: PropsTypes) => {
  const { record, keyValue, setIsLoading, isLoading } = props;

  const {
    isSearchAll,
    total,
    columns,
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
  } = useTransactionDetail(record, keyValue, setIsLoading, isLoading);
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
        width={modalData.width}
      />
      <ConfirmTransaction
        info={info}
        setInfo={setInfo}
        isOpen={isOpenConfirmTransaction}
        setIsOpen={setIsOpenConfirmTransaction}
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className='bottom_right_table'
            title={() => {
              if (dataSource) {
                return (
                  <Row gutter={[16, 0]} align={'middle'}>
                    <Col>
                      <TransactionDetailFilter
                        handleChangeSearchParams={handleChangeSearchParams}
                      />
                    </Col>
                    <Col>{`Có ${total} kết quả`}</Col>
                  </Row>
                );
              }
              return null;
            }}
            dataSource={dataSource}
            columns={columns}
            loading={isLoading}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.SALES_TRANSACTIONS}
            scroll={{ x: 1000, y: 250 }}
            pagination={{
              position: ['topRight'],
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default ContentTab3;
