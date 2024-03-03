import {Button, Menu, Popconfirm, Tooltip} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppControlAction from 'components/atoms/AppControlAction';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {pageSize} from 'shared/constants/AppConst';
import {addLeadingZeros} from 'utils/FormUtils';

const useEmployeeSelectTable = (
  dataSource: Array<any>,
  setDataSource: (dataSource: Array<any>) => void,
) => {
  const {messages} = useIntl();
  const [count, setCount] = useState(0);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text: any, record: any, index: number) => {
        return <div>{record?.key + 1}</div>;
      },
      width: '10%',
    },
    {
      index: '1',
      title: messages['common.employee'] as string,
      dataIndex: 'employee',
      width: '40%',
      ellipsis: {
        showTitle: false,
      },
      editable: true,
      render(_: any, record: any) {
        return (
          <Tooltip title={record?.employee?.label ?? ''}>
            <div className='ellipsis-text'>{record?.employee?.label ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '2',
      title: messages['common.position'] as string,
      dataIndex: 'position',
      width: '40%',
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

  useEffect(() => {
    setCount(dataSource.length);
  }, [dataSource]);

  const handleAddPosition = () => {
    const newData: any = {
      key: count,
      employee: '',
      position: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDelete = (key: React.Key) => {
    let newData = dataSource.filter((item) => item.key !== key);
    newData = newData.map((item, index) => {
      return {
        ...item,
        key: index,
        index: index,
      };
    });
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

export default useEmployeeSelectTable;
