import React from 'react';
import useTab3 from './useTab3';
import {AppTableContainer} from '@crema';
import {pageSize} from 'shared/constants/AppConst';
type PropsTypes = {
  activeValue: string;
  isLoading: boolean;
  setIsLoading: any;
  record: any;
};
const ContentTab3 = (props: PropsTypes) => {
  const {activeValue, isLoading, setIsLoading, record} = props;
  const {
    isSearchAll,
    total,
    columns,
    dataSource,
    currentPage,
    setCurrentPage,
    isOpen,
    setIsOpen,
    modalData,
    info,
    setInfo,
    isOpenConfirmTransaction,
    setIsOpenConfirmTransaction,
    handleChangeSearchParams,
  } = useTab3(activeValue, setIsLoading, isLoading, record);
  return (
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
      scroll={{x: 1000, y: 250}}
      pagination={{
        position: ['topRight'],
      }}
    />
  );
};

export default ContentTab3;
