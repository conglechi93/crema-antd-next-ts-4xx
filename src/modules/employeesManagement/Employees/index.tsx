import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useFunc from './useFunc';
import AppModal from 'components/molecules/AppModal';
import EmployeesFilter from 'components/organism/Employee/EmployeesFilter';
import EmployeesInfoModal from 'components/organism/Employee/EmployeeInfoModal';
import AddEmployeeModal from 'components/organism/Employee/AddEmployeeModal';
import EditEmployeeModal from 'components/organism/Employee/EditEmployeeModal';
import AppTableContainer from '@crema/AppTableContainer';

const Employees = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    handleAddEmployee,
    handleChangeSearchParams,
    disabled,
    info,

    isOpen,
    setIsOpen,
    modalData,

    employeesRecord,
    employeesInfoModalOpen,
    setEmployeesInfoModalOpen,

    addEmployeeModalOpen,
    setAddEmployeeModalOpen,

    editEmployeeModalOpen,
    setEditEmployeeModalOpen,
  } = useFunc();

  return (
    <>
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
        disabled={disabled}
      />
      <AddEmployeeModal
        info={info}
        isOpen={addEmployeeModalOpen}
        setIsOpen={setAddEmployeeModalOpen}
      />
      <EditEmployeeModal
        info={info}
        isOpen={editEmployeeModalOpen}
        setIsOpen={setEditEmployeeModalOpen}
      />
      <EmployeesInfoModal
        record={employeesRecord}
        isOpen={employeesInfoModalOpen}
        setIsOpen={setEmployeesInfoModalOpen}
      />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='navbar.employeesManagement' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <EmployeesFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleAddEmployee}>
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
          />
        </Col>
      </Row>
    </>
  );
};
export default Employees;
