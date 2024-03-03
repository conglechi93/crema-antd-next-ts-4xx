import AppTableContainer from '@crema/AppTableContainer';
import React from 'react';
import useTab1 from './useTab1';
import { Col, Row } from 'antd';
import { pageSize } from 'shared/constants/AppConst';
import ContentTabFilter from './contentTabFilter';
import AppModal from 'components/molecules/AppModal';

type PropsTypes = {
  record: any;
  activeValue: string;
  isLoading: boolean;
  setIsLoading: any;
  fetchTaskDetails: (code: string) => Promise<void>;
  workFlowStatus: Array<any>;
};

const ContentTab1 = (props: PropsTypes) => {
  const {
    record,
    activeValue,
    isLoading,
    setIsLoading,
    fetchTaskDetails,
    workFlowStatus,
  } = props;
  const {
    isSearchAll,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    handleChangeSearchParams,
    isOpen,
    setIsOpen,
    modalInfo,
  } = useTab1(record, activeValue, setIsLoading, isLoading, fetchTaskDetails);
  return (
    <>
      {isOpen && (
        <AppModal
          title={modalInfo?.title}
          description={modalInfo?.description}
          openModal={isOpen}
          setOpenModal={setIsOpen}
          handleSubmit={modalInfo?.handleSubmit}
          submitText={modalInfo?.submitText}
          handleClose={modalInfo?.handleClose}
          closeText={modalInfo?.closeText}
          disabled={modalInfo?.disabled}
          onClosable={modalInfo?.onClosable}
          destroyOnClose
          width={modalInfo?.width}
        />
      )}
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24}>
          <ContentTabFilter
            workFlowStatus={workFlowStatus}
            handleChangeSearchParams={handleChangeSearchParams}
          />
        </Col>
        <Col xs={24}>
          <AppTableContainer
            isSearchAll={isSearchAll}
            className='bottom_right_table'
            dataSource={dataSource}
            columns={columns}
            loading={isLoading}
            current={currentPage}
            setCurrent={setCurrentPage}
            total={total}
            pageSize={pageSize.SALES_TRANSACTIONS}
            scroll={{ x: 1000, y: 250 }}
            pagination={{
              position: ['topRight'],
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ContentTab1;
