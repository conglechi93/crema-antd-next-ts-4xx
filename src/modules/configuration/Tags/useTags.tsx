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
import {TagsAction} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';
import TagsViewDetail from '../../../components/organism/Tags/TagsViewDetail';
import AppTitleLable from 'components/atoms/AppTitleLable';

const useTags = () => {
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
              <Menu.Item key={TagsAction.VIEW_DETAIL}>
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item key={TagsAction.EDIT}>
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item key={TagsAction.DELETE}>
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
    const fetchTags = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetTags(searchParams));
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
      setTotal(res?.total ?? 0);
      setDataSource(dataSource);
      setCurrent(res?.currentPage ?? 1);
      setColumns(initialColumns);
      setLoading(false);
    };
    fetchTags();
  }, [searchParams]);

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case TagsAction.VIEW_DETAIL: {
        // view details tags
        const modalInfo = {
          title: (
            <AppTitleLable
              title={'common.viewDetailTags'}
              recordTitle={record?.code}
            />
          ),
          description: <TagsViewDetail record={record} />,
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
      case TagsAction.EDIT: {
        // Edit tags
        const modalInfo = {
          title: (
            <AppTitleLable
              title={'common.editTags'}
              recordTitle={record?.code}
            />
          ),
          description: (
            <TagsAddAndUpdate
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
            const {name, description, color} = form.getFieldsValue();
            const code = record?.code;
            const reqParams = {
              code,
              name,
              description,
              color,
            };
            const res: any = await dispatch(onUpdateTags(reqParams));
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
      case TagsAction.DELETE: {
        // Delete tags
        const modalInfo = {
          title: messages['common.deleteTags'] as string,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa tags{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.save'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setIsOpenModal(false);
          },
          handleSubmit: async () => {
            await dispatch(onDeleteTags(record?.code));
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

  const handleOpenFormModal = () => {
    // Add tags
    const modalInfo = {
      title: messages['common.addTags'] as string,
      description: (
        <TagsAddAndUpdate
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
        const {name, description, color} = form.getFieldsValue();
        const reqParams = {
          name,
          description,
          color,
        };
        const res: any = await dispatch(onCreateTags(reqParams));
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
    handleOpenFormModal,
    handleChangeSearchParams,

    isOpenModal,
    setIsOpenModal,
    modalInfo,
  };
};

export default useTags;
