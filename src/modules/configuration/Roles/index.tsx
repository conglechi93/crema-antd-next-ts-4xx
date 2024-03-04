import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useProperty from './useFunc';
import AppModal from 'components/molecules/AppModal';
import RolesFilter from 'components/organism/Roles/RolesFilter';
import { ActionType } from 'shared/constants/AppVariables';
import RolesModal from 'components/organism/Roles/RolesModal';
import AppNotFound from 'components/molecules/AppNotFound';

const Roles = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    rolesModalOpen,
    setRolesModalOpen,
    info,
    setInfo,
    handleOpenRolesModal,
    handleChangeSearchParams,
    isOpen,
    setIsOpen,
    modalData,
  } = useProperty();
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
      />
      <RolesModal
        info={info}
        isOpen={rolesModalOpen}
        setIsOpen={setRolesModalOpen}
      />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.rolesDefine' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <RolesFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton
                type='primary'
                onClick={() => {
                  handleOpenRolesModal(ActionType.ADD, null);
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
            locale={{
              emptyText: (
                <>
                  <AppNotFound
                    loading={loading}
                    isInitialRender={isSearchAll}
                    title={
                      isSearchAll
                        ? (messages['common.emptyRole'] as string)
                        : (messages['common.noResult'] as string)
                    }
                    description={
                      isSearchAll
                        ? (messages['common.emptyRoleDescription'] as string)
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
export default Roles;
