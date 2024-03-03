import {AppTableContainer} from '@crema';
import {pageSize} from 'shared/constants/AppConst';
import {useIntl} from 'react-intl';
import {Col, Row} from 'antd';
import SalesProgramDetailFilter from '../SalesProgramDetailFilter';
import AppModal from 'components/molecules/AppModal';
import useSalesProgramDetailTable from './useSalesProgramDetailTable';
import ConfirmTransaction from '../ConfirmTransaction';
import AppNotFound from 'components/molecules/AppNotFound';
type SalesProgramDetailTableProps = {
  record: any;
  isRefreshChild: boolean;
  setIsRefreshChild: (value: boolean) => void;
};
const SalesProgramDetailTable = (props: SalesProgramDetailTableProps) => {
  const {record, isRefreshChild, setIsRefreshChild} = props;
  const {
    isSearchAll,
    total,
    columns,
    loading,
    dataSource,
    handleChangeSearchParams,
    currentPage,
    setCurrentPage,
    open,
    setOpen,
    modalData,
    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
  } = useSalesProgramDetailTable(record, isRefreshChild, setIsRefreshChild);
  const {messages} = useIntl();

  return (
    <>
      <ConfirmTransaction
        info={info}
        setInfo={setInfo}
        isOpen={isOpenConfirmTransaction}
        setIsOpen={setIsOpenConfirmTransaction}
      />
      <AppModal
        title={modalData.title}
        openModal={open}
        description={modalData?.description}
        submitText={modalData.submitText}
        closeText={modalData.closeText}
        setOpenModal={setOpen}
        handleSubmit={modalData.handleSubmit}
        handleClose={modalData.handleClose}
        width={modalData.width}
        destroyOnClose
        styles={{
          body: {
            height: modalData.height,
          },
        }}
      />
      <Row gutter={[0, 0]} style={{width: '100%'}}>
        {record && (
          <Col span={24} className='layout_box'>
            <SalesProgramDetailFilter
              currentRecord={record}
              handleChangeSearchParams={handleChangeSearchParams}
            />
          </Col>
        )}
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className=''
            currentRecord={record}
            isShowTitle={true}
            loading={loading}
            total={total}
            dataSource={dataSource}
            columns={columns}
            current={currentPage}
            setCurrent={setCurrentPage}
            pageSize={pageSize.SALES_PROGRAMS}
            scroll={{x: 1000, y: 420}}
            handleChangePage={handleChangeSearchParams}
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
                        ? (messages['common.emptyWarehouse'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptySaleProgramDescriptionDetail'
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
export default SalesProgramDetailTable;
