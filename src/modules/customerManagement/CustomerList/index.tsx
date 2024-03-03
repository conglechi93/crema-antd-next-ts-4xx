import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useCustomerList from './useFunc';
import { ActionType } from 'shared/constants/AppVariables';
import CustomerFilter from 'components/organism/Customer/CustomerFilter';
import CustomerDashboard from 'components/organism/Customer/CustomerDashboard';
import AppModalV2 from 'components/molecules/AppModalV2';
import ChooseInventoryModal from 'components/organism/SalesProgram/ChooseInventoryModal';
import CustomerModal from 'components/organism/Customer/CustomerModal';
import AppNotFound from 'components/molecules/AppNotFound';

const CustomerList = () => {
  const { messages } = useIntl();
  const {
    form,
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    customerModalOpen,
    setCustomerModalOpen,
    info,
    handleOpenCustomerModal,
    handleChangeSearchParams,
    isOpen,
    setIsOpen,
    modalInfo,
    actionDisabled,
    handleSelectChange,
    selectedRowKeys,

    chooseInventoryInfo,
    chooseInventoryOpen,
    setChooseInventoryOpen,
    handleChangeModalInfo,

    setIsRefresh,
    searchParams,
  } = useCustomerList();
  return (
    <>
      <AppModalV2 modalInfo={modalInfo} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChooseInventoryModal
        info={chooseInventoryInfo}
        isOpen={chooseInventoryOpen}
        setIsOpen={setChooseInventoryOpen}
      />
      <CustomerModal
        info={info}
        isOpen={customerModalOpen}
        setIsOpen={setCustomerModalOpen}
      />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.customerList' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 10]} justify={'end'} align={'middle'}>
            <Col flex={'none'}>
              <CustomerDashboard
                form={form}
                selectedRowKeys={selectedRowKeys}
                actionDisabled={actionDisabled}
                setIsOpen={setIsOpen}
                handleChangeModalInfo={handleChangeModalInfo}
                setIsRefresh={setIsRefresh}
                searchParams={searchParams}
              />
            </Col>
            <Col flex={'none'}>
              <CustomerFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton
                type='primary'
                onClick={() => {
                  handleOpenCustomerModal(ActionType.ADD, null);
                }}
              >
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
            selectionType='checkbox'
            handleSelectChange={handleSelectChange}
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={loading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyCustomer'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages[
                            'common.emptyCustomerDescription'
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
export default CustomerList;
