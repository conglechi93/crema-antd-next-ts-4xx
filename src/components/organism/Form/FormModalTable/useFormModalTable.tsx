import IntlMessages from '@crema/utility/IntlMessages';
import {Tooltip} from 'antd';
import {useState} from 'react';

const useFormModalTable = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text, record) => {
        return <div>{record.index + 1}</div>;
      },
      width: 50,
    },
    {
      index: '1',
      title: <IntlMessages id='common.propertyCode' />,
      width: 120,
      dataIndex: 'code',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.code}>
            <div className='ellipsis-text'>{record?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '2',
      title: <IntlMessages id='common.propertyName' />,
      width: 120,
      dataIndex: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.name}>
            <div className='ellipsis-text'>{record?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '3',
      title: <IntlMessages id='common.propertyType' />,
      dataIndex: 'type',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.configDataType?.name ?? 'Không có thông tin'}>
            <div className='ellipsis-text'>
              {record?.configDataType?.name ?? 'Không có thông tin'}
            </div>
          </Tooltip>
        );
      },
    },
  ];
  return {columns};
};

export default useFormModalTable;
