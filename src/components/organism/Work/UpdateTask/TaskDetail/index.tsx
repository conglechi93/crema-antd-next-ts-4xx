import useTaskDetail from './useTaskDetail';
import {Col, FormInstance, Row} from 'antd';
import {memo, useEffect, useState} from 'react';
import {AppTableContainer} from '@crema';
import {EditableCell, EditableRow} from 'components/molecules/EditableRow';
import {InlineEditableTextfield} from '@atlaskit/inline-edit';
import AppTypo from 'components/atoms/AppTypo';
import InlineEdit from '@atlaskit/inline-edit';
import InlineEditSelect from 'components/atoms/AppInlineSelect';
import AppForm from 'components/atoms/AppForm';
import styles from './style.module.scss';

type PropsTypes = {
  form: FormInstance;
};
const TaskDetail = (props: PropsTypes) => {
  const {form} = props;
  const {columns, setColumns, dataSource, setDataSource, total, setTotal} =
    useTaskDetail();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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
  useEffect(() => {
    form.setFieldsValue({
      name: '1',
    });
  }, []);
  const [editValue, setEditValue] = useState<any>([]);
  return (
    <>
      <div>Chi tiết công việc</div>
      <AppForm form={form}>
        <Row gutter={16}>
          <Col xs={8} style={{display: 'flex', alignItems: 'center'}}>
            <AppTypo variant='p-lg-semi'>Dự án </AppTypo>
          </Col>
          <Col xs={16}>
            <InlineEditableTextfield
              defaultValue={''}
              onConfirm={(value) => {}}
              placeholder='Chọn dự án'
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={8} style={{display: 'flex', alignItems: 'center'}}>
            <AppTypo variant='p-lg-semi'>Trạng thái</AppTypo>
          </Col>
          <Col xs={16} className={styles.inline_edit}>
            <InlineEditSelect
              editValue={editValue}
              setEditValue={setEditValue}
              options={[
                {
                  label: 'aaaaaa',
                  value: '1',
                },
                {
                  label: 'b',
                  value: '2',
                },
              ]}
            />
          </Col>
        </Row>
      </AppForm>

      {/* <AppTableContainer
        total={total}
        className=''
        columns={columns}
        dataSource={dataSource}
        showHeader={false}
        isShowTitle={false}
        components={components}
      /> */}
    </>
  );
};
export default memo(TaskDetail);
