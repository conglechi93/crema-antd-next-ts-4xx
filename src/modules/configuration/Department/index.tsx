import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import useFunc from './useFunc';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import AppButton from 'components/atoms/AppButton';
import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { pageSize } from 'shared/constants/AppConst';
import AppResize from 'components/molecules/AppResize';
import DepartmentModal from 'components/organism/Department/DepartmentModal';
import DepartmentDetailTable from 'components/organism/Department/DepartmentDetailTable';
import DepartmentFilter from 'components/organism/Department/DepartmentFilter';
import AddEmployeeModal from 'components/organism/Department/AddEmployeeModal';
import AppNotFound from 'components/molecules/AppNotFound';

const Department = () => {
  const { messages } = useIntl();

  const {
    isSearchAll,
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

    addDepartment,

    isOpen,
    setIsOpen,
    modalData,

    handleChangeSearchParams,

    modalInfomation,
    isOpenDepartmentModal,
    setIsOpenDepartmentModal,

    addEmployeeOpen,
    setAddEmployeeOpen,

    handleClickRow,
  } = useFunc();
  return (
    <div>
      <DepartmentModal
        info={modalInfomation}
        isOpen={isOpenDepartmentModal}
        setIsOpen={setIsOpenDepartmentModal}
      />
      <AddEmployeeModal
        info={modalInfomation}
        isOpen={addEmployeeOpen}
        setIsOpen={setAddEmployeeOpen}
      />
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
      <Row
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.departmentDefine' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <DepartmentFilter
                searchParams={searchParams}
                onSubmitForm={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={addDepartment}>
                {messages['common.addItem'] as string}
              </AppButton>
            </Col>
          </Row>
        </Col>
      </Row>

      <AppResize
        hiddenSecondChild={!total && isSearchAll}
        firstChild={
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
                        ? (messages['common.emptyDepartment'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyDepartmentDescription'
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
          <DepartmentDetailTable
            isRefreshChild={isRefreshChild}
            setIsRefreshChild={setIsRefreshChild}
            departmentRecord={currentRecord}
            setIsRefresh={setIsRefresh}
          />
        }
      />
    </div>
  );
};
export default Department;
