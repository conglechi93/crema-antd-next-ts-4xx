import {AppTableContainer} from '@crema';
import usePositionDetailTable from './useFunc';
import {Col, Form, Input, InputRef, Popconfirm, Row, Select, Table} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppButton from 'components/atoms/AppButton';
import IntlMessages from '@crema/utility/IntlMessages';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {FormInstance} from 'antd/lib';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {pageSize} from 'shared/constants/AppConst';
import {onGetDepartments} from 'redux/actions/Departments';
import {onGetRoles} from 'redux/actions/Roles';
import {useIntl} from 'react-intl';
interface Item {
  key: string;
  department: string;
  position: string;
}
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  index: any;
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  index,
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const {messages} = useIntl();
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;
  const inputRef = useRef<InputRef>(null);
  const [departmentSearch, setDepartmentSearch] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  // useEffect(() => {
  //   if (editing) {
  //     inputRef.current!.focus();
  //   }
  // }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex] ? record[dataIndex] : undefined,
    });
  };

  const save = async (options: any) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      const newValues = {
        [dataIndex]: options,
      };
      handleSave({...record, ...newValues});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{margin: 0}} name={dataIndex}>
        <AppSelectLoadMore
          onChange={(e, options) => {
            save(options);
          }}
          onBlur={toggleEdit}
          searchParams={departmentSearch}
          setSearchParams={setDepartmentSearch}
          onGetOptions={dataIndex == 'position' ? onGetRoles : onGetDepartments}
          placeholder={
            dataIndex == 'position'
              ? (messages['common.positionHint'] as string)
              : (messages['common.departmentHint'] as string)
          }
        />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{paddingRight: 24}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type PositionDetailTableProps = {
  dataSource: Array<any>;
  setDataSource: (dataSource: any) => void;
};
const PositionDetailTable = (props: PositionDetailTableProps) => {
  const {dataSource, setDataSource} = props;
  const {columns, handleAddPosition, handleSave} = usePositionDetailTable(
    dataSource,
    setDataSource,
  );

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columnsTable = columns?.map((col: any, index: any) => {
    // if (!col.editable) {
    //   return col;
    // }
    return {
      ...col,
      onCell: (record: any) => ({
        index,
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Row gutter={[16, 8]}>
      <Col xs={24}>
        <Row justify={'space-between'} align={'middle'}>
          <Col xs={12}>
            <AppTypo variant='p-lg-semi'>
              <IntlMessages id='common.positionDetail' />
            </AppTypo>
          </Col>
          <Col xs={12} style={{textAlign: 'right'}}>
            <AppButton type='primary' onClick={handleAddPosition}>
              <IntlMessages id='common.add' />
            </AppButton>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <AppTableContainer
          className='table_picklist'
          columns={columnsTable}
          total={0}
          isShowTitle={false}
          dataSource={dataSource}
          components={components}
          // locale={{emptyText: <></>}}
        />
      </Col>
    </Row>
  );
};

export default PositionDetailTable;
