import AppTableContainer from '@crema/AppTableContainer';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Row } from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppTypo from 'components/atoms/AppTypo';
import { useIntl } from 'react-intl';
import { pageSize } from 'shared/constants/AppConst';
import useForm from './useForm';
import FormModal from 'components/organism/Form/FormModal';
import AppModal from 'components/molecules/AppModal';
import FormFilter from 'components/organism/Form/FormFilter';

const Form = () => {
  const { messages } = useIntl();
  const {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    info,
    isOpen,
    setIsOpen,
    handleOpenFormModal,
    handleChangeSearchParams,

    appModalOpen,
    setAppModalOpen,
    appModalData,
  } = useForm();
  return (
    <>
      <AppModal
        title={appModalData?.title}
        description={appModalData?.description}
        openModal={appModalOpen}
        setOpenModal={setAppModalOpen}
        handleSubmit={appModalData?.handleSubmit}
        submitText={appModalData?.submitText}
        handleClose={appModalData?.handleClose}
        closeText={appModalData?.closeText}
      />
      <FormModal info={info} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Row
        gutter={[16, 16]}
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: '16px' }}
      >
        <Col xs={14}>
          <AppTypo variant='h3'>
            <IntlMessages id='common.formList' />
          </AppTypo>
        </Col>
        <Col xs={10} style={{ textAlign: 'right' }}>
          <Row gutter={[10, 0]} justify={'end'}>
            <Col flex={'none'}>
              <FormFilter handleChangeSearchParams={handleChangeSearchParams} />
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
export default Form;
