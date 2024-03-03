import {DndContext} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {Table} from 'antd';
import React, {memo} from 'react';
import styles from './style.module.scss';
import AppNotFound from 'components/molecules/AppNotFound';
import {useIntl} from 'react-intl';
import useAppDragTable from './useAppDragTable';

type PropsTypes = {
  dataSource: any;
  setDataSource: (dataSource: any) => void;
};

const AppDragTable = (props: PropsTypes) => {
  const {messages} = useIntl();
  const {dataSource, setDataSource} = props;
  const {sensors, onDragEnd, components, columns} = useAppDragTable(
    dataSource,
    setDataSource,
  );
  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          id='app-drag-table'
          className={styles.table_picklist}
          bordered
          components={components}
          rowKey='key'
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          locale={{
            emptyText: (
              <>
                <AppNotFound
                  loading={false}
                  isInitialRender={true}
                  title={messages['common.emptyData'] as string}
                  description={messages['common.noResultDescription'] as string}
                />
              </>
            ),
          }}
        />
      </SortableContext>
    </DndContext>
  );
};

export default memo(AppDragTable);
