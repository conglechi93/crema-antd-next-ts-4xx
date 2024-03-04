import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useJobTypes from './useJobTypes';
import AppModal from 'components/molecules/AppModal';
import JopTypesFilter from 'components/organism/JobTypes/JobTypesFilter';

const JobTypes = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    handleAddJobType,
    handleChangeSearchParams,

    isOpenModal,
    setIsOpenModal,
    modalInfo,
  } = useJobTypes();
  return (
    <>
      {isOpenModal && (
        <AppModal
          title={modalInfo?.title}
          description={modalInfo?.description}
          openModal={isOpenModal}
          setOpenModal={setIsOpenModal}
          handleSubmit={modalInfo?.handleSubmit}
          submitText={modalInfo?.submitText}
          handleClose={modalInfo?.handleClose}
          closeText={modalInfo?.closeText}
          disabled={modalInfo?.disabled}
          onClosable={modalInfo?.onCloseble}
          destroyOnClose
          width={modalInfo?.width}
        />
      )}
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.jobTypeDefine' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <JopTypesFilter
                handleChangeSearchParams={handleChangeSearchParams}
              />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleAddJobType}>
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
            className='table_custom_record'
            total={total}
            columns={columns}
            loading={loading}
            dataSource={dataSource}
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
export default JobTypes;
