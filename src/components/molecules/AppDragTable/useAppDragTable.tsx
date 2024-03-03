import {Form, Input, InputRef, Popconfirm, Table, message} from 'antd';
import {FormInstance} from 'antd/lib';
import AppControlAction from 'components/atoms/AppControlAction';
import AppFormItem from 'components/atoms/AppFormItem';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {arrayMove, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const useAppDragTable = (
  dataSource: any,
  setDataSource: (dataSource: any) => void,
) => {
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
  interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
  }

  interface EditableRowProps {
    index: number;
    style?: any;
  }
  const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [formTable] = Form.useForm();
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        },
      ),
      transition,
      cursor: 'move',
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <Form form={formTable} component={false}>
        <EditableContext.Provider value={formTable}>
          <tr
            {...props}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
          />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({...record, ...values});
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <AppFormItem style={{margin: 0}} name='value'>
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            placeholder='Nhập giá trị...'
          />
        </AppFormItem>
      ) : (
        <div className='editable-cell-value-wrap' onClick={toggleEdit}>
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const Row = (props: any) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        },
      ),
      transition,
      cursor: 'move',
      display: 'flex',
      alignItems: 'center',
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };
  const defaultColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Tên',
      dataIndex: 'value',
      width: 'auto',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'action',
      width: 30,
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <a onClick={() => handleDelete(record.key)}>
            <AppControlAction variant='delete' />
          </a>
        ) : null,
    },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );
  const onDragEnd = ({active, over}) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        const newArr: Array<any> = [];
        const arrayMoveResult = arrayMove(prev, activeIndex, overIndex);
        arrayMoveResult.forEach((item: any, index) => {
          newArr.push({...item, index: index + 1});
        });
        return newArr;
      });
    }
  };

  const handleDelete = (key: any) => {
    let newData = dataSource.filter((item: any) => item.key !== key);
    newData.map((item: any, index: any) => {});
    newData = newData.map((item, index) => {
      return {
        ...item,
        key: index + 1,
        index: index + 1,
      };
    });
    setDataSource(newData);
    message.success('Xóa thành công!');
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return {
    sensors,
    onDragEnd,
    components,
    dataSource,
    setDataSource,
    columns,
    Row,
  };
};

export default useAppDragTable;
