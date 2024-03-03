import AppTableContainer from '@crema/AppTableContainer';
import useMergeCheckboxTable from './useFunc';
import { Checkbox, Col, Form, InputRef, Row, Table } from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import AppButton from 'components/atoms/AppButton';
import IntlMessages from '@crema/utility/IntlMessages';
import React, { useContext, useRef, useState } from 'react';
import { FormInstance } from 'antd/lib';
import { useIntl } from 'react-intl';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
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
  dataIndex: any;
  record: any;
  handleSave: (record: any, checked: boolean, dataIndex: number) => void;
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
  const { messages } = useIntl();
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;
  const inputRef = useRef<InputRef>(null);

  const toggleEdit = () => {
    setEditing(!editing);
    const checked = record?.checked ? false : true;
    form.setFieldsValue({
      [dataIndex]: checked,
    });
    save({ ...record }, checked);
  };

  const save = async (value: any, checked: boolean) => {
    try {
      const newValues = {
        [dataIndex]: value,
      };
      const row = {
        ...record,
        ...newValues,
      };
      handleSave(row, checked, dataIndex);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} valuePropName='checked'>
        <Checkbox
          onChange={(e) => {
            const checked = e.target.checked;
            form.setFieldsValue({
              [dataIndex]: checked,
            });
            save({ ...record }, checked);
          }}
        >
          {record[`${dataIndex}`]?.label}
        </Checkbox>
      </Form.Item>
    ) : (
      <div className='editable-cell-value-wrap-checkbox' onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type MergeCheckboxTableProps = {
  columns: Array<any>;
  dataSource: Array<any>;
  setDataSource: (dataSource: any) => void;
  handleSave: (row: any, checked: boolean, dataIndex: number) => void;
};
const MergeCheckboxTable = (props: MergeCheckboxTableProps) => {
  const { columns, dataSource, setDataSource, handleSave } = props;
  const { handleAddPosition } = useMergeCheckboxTable(
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
    if (!col.editable) {
      return col;
    }
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
          <Col xs={12} style={{ textAlign: 'right' }}>
            <AppButton type='primary' onClick={handleAddPosition}>
              <IntlMessages id='common.add' />
            </AppButton>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <AppTableContainer
          className=''
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

export default MergeCheckboxTable;
