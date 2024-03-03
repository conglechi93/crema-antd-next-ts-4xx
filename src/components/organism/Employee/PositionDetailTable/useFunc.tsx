import {Button, Menu, Popconfirm, Tooltip} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppControlAction from 'components/atoms/AppControlAction';
import {useState} from 'react';
import {useIntl} from 'react-intl';

const usePositionDetailTable = (
  dataSource: Array<any>,
  setDataSource: (dataSource: Array<any>) => void,
) => {
  const {messages} = useIntl();
  const [count, setCount] = useState(dataSource.length);

  const columns = [
    {
      index: '1',
      title: messages['common.department'] as string,
      dataIndex: 'department',
      width: '45%',
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render(_: any, record: any) {
        return (
          <Tooltip title={record?.department?.label ?? ''}>
            <div className='ellipsis-text'>
              {record?.department?.label ?? ''}
            </div>
          </Tooltip>
        );
      },
    },
    {
      index: '2',
      title: messages['common.position'] as string,
      dataIndex: 'position',
      width: '45%',
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render(_: any, record: any) {
        return (
          <Tooltip title={record?.position?.label ?? ''}>
            <div className='ellipsis-text'>{record?.position?.label ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: messages['common.delete'] as string,
      dataIndex: 'action',
      render: (_, record: {key: React.Key}) => (
        <Button onClick={() => handleDelete(record.key)}>
          <AppControlAction variant='delete' />
        </Button>
      ),
    },
  ];

  const handleAddPosition = () => {
    const newData: any = {
      key: count + 1,
      department: '',
      position: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
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
  return {
    columns,
    handleAddPosition,
    handleSave,
  };
};

export default usePositionDetailTable;
