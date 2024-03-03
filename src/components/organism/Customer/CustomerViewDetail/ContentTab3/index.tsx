import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { pageSize } from 'shared/constants/AppConst';
import AppTableContainer from '@crema/AppTableContainer';
import useFunc from './useFunc';
import FilterTab3 from './Fillter';
type PropsTypes = {
  record: any;
  activeValue: string;
};
const ContentTab3 = (props: PropsTypes) => {
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
  } = useFunc(record, activeValue);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <AppTableContainer
          isSearchAll={isSearchAll}
          className='table_custom_record_info'
          title={() => {
            if (dataSource) {
              return loading ? (
                <Skeleton.Input
                  size='small'
                  active
                  style={{
                    padding: 2,
                  }}
                />
              ) : (
                <Row gutter={[16, 0]} align={'middle'}>
                  <Col>
                    <FilterTab3
                      handleChangeSearchParams={handleChangeSearchParams}
                    />
                  </Col>
                  <Col>{`Có ${total} kết quả`}</Col>
                </Row>
              );
            }
            return null;
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
  );
};

export default ContentTab3;
