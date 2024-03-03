import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Skeleton, Table } from 'antd';
import styles from './style.module.scss';
import { TableProps } from 'antd/lib';
import { Resizable } from 'react-resizable';
import type { ColumnsType } from 'antd/es/table';
import type { ResizeCallbackData } from 'react-resizable';
import AppNotFound from 'components/molecules/AppNotFound';
import { useIntl } from 'react-intl';
import { RowSelectionType, TableRowSelection } from 'antd/es/table/interface';
interface DataType {
  key: React.Key;
  date: string;
  amount: number;
  type: string;
  note: string;
}

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (
      e: React.SyntheticEvent<Element>,
      data: ResizeCallbackData,
    ) => void;
    width: number;
  },
) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

interface AppTableContainerProps {
  isSearchAll?: boolean;
  currentRecord?: any;
  columns: any;
  loading?: boolean;
  hoverColor?: boolean;
  className: string;
  current?: number | undefined;
  setCurrent?: (current: number) => void;
  pageSize?: number;
  total: number;
  setPageSize?: (pageSize: number) => void;
  [x: string]: any;
  handleChangePage?: (values: any, resetRecord?: boolean) => void;
  handleClickRow?: (record: any) => void;
  locale?: any;
  isShowTitle?: boolean;
  handleSelectChange?: (
    selectedRowKeys: React.Key[],
    selectedRows?: any,
  ) => void;
  selectedRow?: Array<any>;
  selectionType?: RowSelectionType;
}

const AppTableContainer = (props: AppTableContainerProps & TableProps<any>) => {
  const { messages } = useIntl();
  const {
    dataSource,
    isSearchAll = false,
    currentRecord = {},
    columns,
    loading = false,
    current,
    setCurrent,
    pageSize,
    setPageSize,
    total,
    className,
    handleChangePage,
    handleClickRow,
    isShowTitle = true,
    pagination,
    handleSelectChange,
    selectedRow,
    selectionType = undefined,
  } = props;
  const [columnsData, setColumnsData] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  useEffect(() => {
    setColumnsData(columns);
  }, [columns]);

  const handleChange = (page: any) => {
    if (setCurrent) {
      setCurrent(page ?? 1);
      handleChangePage?.(
        {
          page: page ?? 1,
        },
        false,
      );
    }
    if (setPageSize) {
      setPageSize(page.pageSize ?? 5);
    }
  };

  const rowClassName = (record: any, index: number) => {
    if (currentRecord && selectedRowKeys.includes(record.code)) {
      return 'selected-row';
    } else {
      return '';
    }
  };

  const handleResize: Function =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columnsData];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width > 50 ? size.width : 50,
      };
      setColumnsData(newColumns);
    };

  const mergeColumns: any = columnsData?.map((col, index) => {
    return {
      onHeaderCell: (column: ColumnsType<DataType>[number]) => ({
        width: column.width,
        onResize: handleResize(index) as React.ReactEventHandler<any>,
      }),
      ...col,
    };
  });

  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows?: any) => {
    handleSelectChange?.(selectedRowKeys, selectedRows);
  };

  const rowSelection: TableRowSelection<any> = {
    type: selectionType,
    preserveSelectedRowKeys: true,
    selectedRowKeys: selectedRow?.map((item: any) => item?.code),
    onChange: onSelectChange,
  };

  return (
    <Table
      bordered
      components={{
        header: {
          cell: ResizableTitle,
        },
        ...props.components,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            handleClickRow?.(record);
            const selectedKey = record.code;
            const newSelectedRowKeys = [selectedKey];
            setSelectedRowKeys(newSelectedRowKeys);
          },
        };
      }}
      rowSelection={selectionType ? rowSelection : undefined}
      rowClassName={rowClassName}
      rowKey='id'
      loading={loading}
      title={() => {
        if (isShowTitle && dataSource) {
          return loading ? (
            <Skeleton.Input
              size='small'
              active
              style={{
                padding: 2,
              }}
            />
          ) : (
            <span>{`Có ${total ?? 0} kết quả`}</span>
          );
        }
        return null;
      }}
      locale={{
        emptyText: (
          <>
            <AppNotFound
              loading={loading}
              isInitialRender={isSearchAll}
              title={
                isSearchAll
                  ? (messages['common.emptyData'] as string)
                  : (messages['common.noResult'] as string)
              }
              description={
                isSearchAll
                  ? (messages['common.emptyDataDescription'] as string)
                  : (messages['common.noResultDescription'] as string)
              }
            />
          </>
        ),
      }}
      {...props}
      pagination={
        pagination
          ? {
              total,
              current,
              pageSize,
              className: styles.pagination_table,
              showSizeChanger: false,
              onChange: handleChange,
              position: ['topRight'],
              ...pagination,
            }
          : false
      }
      className={clsx({
        [styles[className]]: true,
        [styles.table]: true,
        [styles.hidden_title]: !isShowTitle,
        [styles.empty]: dataSource?.length === 0,
      })}
      columns={mergeColumns}
      // scroll={{x: 1000, y: 'calc(100vh - 300px)'}}
    />
  );
};

export default AppTableContainer;
