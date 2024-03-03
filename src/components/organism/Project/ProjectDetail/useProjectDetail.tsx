import {Tooltip} from 'antd';
import {onDownloadFile} from 'redux/actions/Files';

const useProjectDetail = () => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Nhân sư',
      dataIndex: 'employee',
      width: '50%',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.employee?.label ?? ''}>
            <div className='ellipsis-text'>{record?.employee?.label ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      width: '50%',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.position?.label ?? ''}>
            <div className='ellipsis-text'>{record?.position?.label ?? ''}</div>
          </Tooltip>
        );
      },
    },
  ];
  const onDownloadProject = async (item: any) => {
    const fileId = item?.id;
    const res = await onDownloadFile(fileId);
    if (res) {
      const fileName = item?.fileName;
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();
    }
  };

  return {
    columns,
    onDownloadProject,
  };
};

export default useProjectDetail;
