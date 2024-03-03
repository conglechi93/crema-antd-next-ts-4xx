import {AppState} from '@auth0/auth0-react';
import {Tooltip} from 'antd';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
const useTaskDetail = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );

  let initialColumns = [
    {
      title: '',
      width: 150,
      dataIndex: 'label',
      key: '1',
      render: (_: any, record: any) => {
        // console.log('record initialColumns', record);
        return (
          <Tooltip title={record?.label}>
            <div className='ellipsis-text'>{record?.label}</div>
          </Tooltip>
        );
      },
    },
    {
      title: '',
      width: 200,
      dataIndex: 'name',
      key: '2',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.value}>
            <div className='ellipsis-text'>{record?.value}</div>
          </Tooltip>
        );
      },
      editable: true,
    },
  ];
  const [columns, setColumns] = useState<Array<any>>(initialColumns);
  const initialDataSource = [
    {
      label: 'Dự án',
      value: '',
      key: 'project',
    },
    {
      label: 'Trạng thái',
      value: '',
      key: 'status',
    },
    {
      label: 'Công việc cha',
      value: '',
      key: 'parentTask',
    },
    {
      label: 'Ngày bắt đầu',
      value: '',
      key: 'startDate',
    },
    {
      label: 'Ngày kết thức',
      value: '',
      key: 'endDate',
    },
    {
      label: 'Tiến độ',
      value: '',
      key: 'progress',
    },
    {
      label: 'Độ ưu tiên',
      value: '',
      key: 'priority',
    },
    {
      label: 'Loại công việc',
      value: '',
      key: 'jobType',
    },
    {
      label: 'Người đánh giá',
      value: '',
      key: 'reporter',
    },
    {
      label: 'Người thực hiện',
      value: '',
      key: 'assignees',
    },
    {
      label: 'Người giao việc',
      value: '',
      key: 'jobAssigner',
    },
    {
      label: 'Ngày giao',
      value: '',
      key: 'deliveryDate',
    },
  ];
  const [dataSource, setDataSource] = useState<Array<any>>(initialDataSource);
  const [total, setTotal] = useState<number>(0);

  const [project, setProject] = useState<string>('');
  return {columns, setColumns, dataSource, setDataSource, total, setTotal};
};
export default useTaskDetail;
