import IntlMessages from '@crema/utility/IntlMessages';
import {Form, Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import TagsAddAndUpdate from 'components/organism/Tags/TagsAddAndUpdate';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onCreateTags,
  onDeleteTags,
  onGetTags,
  onUpdateTags,
} from 'redux/actions/Tag';
import {pageSize} from 'shared/constants/AppConst';
import {JobTypeAction} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import TagsViewDetail from '../../../components/organism/Tags/TagsViewDetail';
import {
  onCreateJobType,
  onDeleteJobType,
  onGetJobTypes,
  onUpdateJobType,
} from 'redux/actions/JobType';
import JobTypesAddAndUpdate from 'components/organism/JobTypes/JobTypeAddAndUpdate';
import JobTypeViewDetail from 'components/organism/JobTypes/JobTypeViewDetail';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useJobTypes = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  // App Modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [modalInfo, setModalInfo] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
    onClosable: () => {
      setIsOpenModal(false);
      form.resetFields();
    },
    disabled: true,
  });

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    status: '',
  });

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      width: 50,
    },
    {
      index: '1',
      title: <IntlMessages id='common.code' />,
      width: 60,
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
      title: <IntlMessages id='common.name' />,
      width: 140,
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
      title: <IntlMessages id='common.description' />,
      width: 140,
      dataIndex: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.description}>
            <div className='ellipsis-text'>{record?.description}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '4',
      width: 120,
      render: (text, record) => {
        return (
          <AppTag
            title={`${record?.usedStatus?.name ?? 'Trống'}`}
            color={`#${record?.usedStatus?.color ?? '#000000'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => {
        let content = (
          <div style={{display: 'flex'}}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              <Menu.Item key={JobTypeAction.VIEW_DETAIL}>
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item key={JobTypeAction.EDIT}>
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={JobTypeAction.DELETE}>
                <AppControlAction variant='delete' />
                <IntlMessages id='common.delete' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='bottom'>
            <AiOutlineEllipsis
              style={{cursor: 'pointer', fontSize: '22px', display: 'flex'}}
            />
          </Popover>
        );
      },
    },
  ];
  const [columns, setColumns] = useState<any>(initialColumns);

  useEffect(() => {
    const fetchJobTypes = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await onGetJobTypes(searchParams);
      console.log('searchParams', searchParams);
      const dataSource: Array<any> = [];
      const elements = res?.elements ?? [];
      const current = res?.currentPage ?? 1;
      elements?.forEach((item: any, index: number) => {
        let STT = (current - 1) * pageSize.DEFAULT + index + 1;
        dataSource?.push({
          ...item,
          index: addLeadingZeros(
            STT,
            STT.toString().length + (2 - STT.toString().length),
          ),
          key: item?.code ? item?.code : index,
        });
      });
      setCurrent(current);
      setTotal(res?.total ?? 0);
      setDataSource(dataSource);
      setColumns(initialColumns);
      setLoading(false);
    };
    fetchJobTypes();
  }, [searchParams]);

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case JobTypeAction.VIEW_DETAIL: {
        // view details tags
        const modalInfo = {
          title: (
            <AppTitleLable
              title={'common.viewDetailJobType'}
              recordTitle={record?.code}
            />
          ),
          description: <JobTypeViewDetail record={record} />,
          submitText: messages['common.close'],
          closeText: '',
          handleClose: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          onCloseble: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            setIsOpenModal(false);
          },
          width: '1200px',
          disabled: false,
        };
        setModalInfo(modalInfo);
        setIsOpenModal(true);
        break;
      }
      case JobTypeAction.EDIT: {
        // Edit job type
        const modalInfo = {
          title: (
            <AppTitleLable
              title={'common.editJobType'}
              recordTitle={record?.code}
            />
          ),
          description: (
            <JobTypesAddAndUpdate
              form={form}
              record={record}
              setModalInfo={setModalInfo}
            />
          ),
          submitText: messages['common.save'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          onCloseble: () => {
            form.resetFields();
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            const {name, description} = form.getFieldsValue();
            const code = record?.code;
            const reqParams = {
              code,
              name,
              description,
            };
            const res: any = await dispatch(onUpdateJobType(reqParams));
            if (res) {
              form.resetFields();
              setIsOpenModal(false);
              handleChangeSearchParams({...searchParams});
            }
          },
          width: '1200px',
          disabled: false,
        };
        setModalInfo(modalInfo);
        setIsOpenModal(true);
        break;
      }
      case JobTypeAction.DELETE: {
        // Delete Job Type
        const modalInfo = {
          title: messages['common.deleteJobType'] as string,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa loại công việc{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            await dispatch(onDeleteJobType(record?.code));
            setIsOpenModal(false);
            handleChangeSearchParams({...searchParams});
          },
          disabled: false,
        };
        setModalInfo(modalInfo);
        setIsOpenModal(true);
        break;
      }
    }
  };

  const handleAddJobType = () => {
    // Add Job Type
    const modalInfo = {
      title: messages['common.addJobType'] as string,
      description: (
        <JobTypesAddAndUpdate
          form={form}
          record={null}
          setModalInfo={setModalInfo}
        />
      ),
      submitText: messages['common.save'],
      closeText: messages['common.cancel'],
      handleClose: () => {
        form.resetFields();
        setIsOpenModal(false);
      },
      onCloseble: () => {
        form.resetFields();
        setIsOpenModal(false);
      },
      handleSubmit: async () => {
        const {name, description} = form.getFieldsValue();
        const reqParams = {
          name,
          description,
        };
        const res: any = await dispatch(onCreateJobType(reqParams));
        if (res) {
          form.resetFields();
          setIsOpenModal(false);
          handleChangeSearchParams({...searchParams});
        }
      },
      width: '1200px',
      disabled: true,
    };
    setModalInfo(modalInfo);
    setIsOpenModal(true);
  };

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };
  return {
    isSearchAll,
    total,
    loading,
    columns,
    dataSource,
    current,
    setCurrent,
    handleAddJobType,
    handleChangeSearchParams,

    isOpenModal,
    setIsOpenModal,
    modalInfo,
  };
};

export default useJobTypes;
