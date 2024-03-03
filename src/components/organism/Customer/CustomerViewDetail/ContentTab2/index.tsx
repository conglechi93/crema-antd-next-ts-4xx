import { Col, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { pageSize } from 'shared/constants/AppConst';
import AppTableContainer from '@crema/AppTableContainer';
import useFunc from './useFunc';
import AppModal from 'components/molecules/AppModal';
import FilterTab2 from './Fillter';
import AppDrawer from 'components/molecules/AppDrawer';
import AppTitleLable from 'components/atoms/AppTitleLable';
import CustomerContentTabDetail from '../CustomerContentTabDetail';
type PropsTypes = {
  record: any;
  activeValue: string;
};
const ContentTab2 = (props: PropsTypes) => {
  const { record, activeValue } = props;
  const {
    isSearchAll,
    total,
    columns,
    loading,
    dataSource,
    currentPage,
    setCurrentPage,
    handleChangeSearchParams,

    modalData,
    setOpen,
    open,
    openDrawer,
    setOpenDrawer,
    infoInventory,
  } = useFunc(record, activeValue);

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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className='table_custom_record_info'
            title={() => {
              return (
                <Row gutter={[16, 0]} align={'middle'}>
                  <Col>
                    <FilterTab2
                      handleChangeSearchParams={handleChangeSearchParams}
                    />
                  </Col>
                  <Col>{`Có ${total} kết quả`}</Col>
                </Row>
              );
            }}
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.SALES_TRANSACTIONS}
            handleChangePage={handleChangeSearchParams}
            scroll={{ x: 1000, y: 250 }}
            pagination={{
              position: ['topRight'],
            }}
          />
        </Col>
      </Row>

      {openDrawer && (
        <AppDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          title={
            <AppTitleLable
              title={'common.inventoryInfo'}
              recordTitle={infoInventory?.code}
            />
          }
          children={
            <CustomerContentTabDetail recordCode={infoInventory?.code} />
          }
          width='500'
        />
      )}
    </>
  );
};

export default ContentTab2;
