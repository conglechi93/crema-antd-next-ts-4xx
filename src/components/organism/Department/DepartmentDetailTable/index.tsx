import {AppTableContainer} from '@crema';
import {pageSize} from 'shared/constants/AppConst';
import useDepartmentDetailTable from './useFunc';
import AppModal from 'components/molecules/AppModal';
import {Col, Row} from 'antd';
import AppNotFound from 'components/molecules/AppNotFound';
import {useIntl} from 'react-intl';

type DepartmentDetailTableProps = {
  isRefreshChild: boolean;
  setIsRefreshChild: (isRefreshChild: boolean) => void;
  departmentRecord: any;
  setIsRefresh: (isRefresh: any) => void;
};
const DepartmentDetailTable = (props: DepartmentDetailTableProps) => {
  const {isRefreshChild, setIsRefreshChild, departmentRecord, setIsRefresh} =
    props;
  const {
    isSearchAll,
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
  } = useDepartmentDetailTable(
    isRefreshChild,
    setIsRefreshChild,
    departmentRecord,
    setIsRefresh,
  );
  const {messages} = useIntl();

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
      <Row gutter={[0, 0]} style={{marginBottom: '16px', width: '100%'}}>
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className=''
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.INVENTORY}
            scroll={{x: 1000, y: 420}}
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
                        ? (messages['common.emptyEmployee'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyEmployeeDescription'
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
export default DepartmentDetailTable;
