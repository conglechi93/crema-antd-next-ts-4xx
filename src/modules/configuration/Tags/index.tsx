import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useWork from './useTags';
import AppModal from 'components/molecules/AppModal';
import TagsFilter from 'components/organism/Tags/TagsFilter';

const Tags = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    handleOpenFormModal,
    handleChangeSearchParams,

    isOpenModal,
    setIsOpenModal,
    modalInfo,
  } = useWork();
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
            <IntlMessages id='common.tagsDefine' />
          </AppTypo>
        </Col>

        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <TagsFilter handleChangeSearchParams={handleChangeSearchParams} />
            </Col>
            <Col flex={'88px'}>
              <AppButton type='primary' onClick={handleOpenFormModal}>
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
export default Tags;
