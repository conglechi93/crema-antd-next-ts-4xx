import IntlMessages from '@crema/utility/IntlMessages';
import {Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onDeleteProperty, onGetPropertyList} from 'redux/actions/Property';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useProperty = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);

  // App Modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: '',
    description: <></>,
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 512,
  });

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View detail property
        const info = {
          draftString: DraftStrings.property,
          type: ActionType.VIEW,
          action: () => {
            setPropertyModalOpen(false);
          },
          record: record,
        };
        setInfo(info);
        setPropertyModalOpen(true);
        break;
      }
      case '2': {
        // Edit property
        const info = {
          draftString: DraftStrings.property,
          type: ActionType.EDIT,
          action: () => {
            setPropertyModalOpen(false);
            handleChangeSearchParams({
              ...searchParams,
            });
          },
          record: record,
        };
        setInfo(info);
        setPropertyModalOpen(true);
        break;
      }
      case '3': {
        // Delete property
        setModalData({
          title: 'Thông báo',
          description: (
            <>
              <p>
                {'Bạn có chắc chắn muốn xóa thuộc tính '}
                <strong>{`${record?.code} - ${record?.name}`}</strong>{' '}
                {'này không?'}
              </p>
            </>
          ),
          submitText: 'Đồng ý',
          handleSubmit: async () => {
            await dispatch(onDeleteProperty(record.code));
            setIsOpen(false);
            handleChangeSearchParams({
              ...searchParams,
            });
          },
          closeText: 'Hủy',
          handleClose: () => {
            setIsOpen(false);
          },
          width: 512,
        });
        setIsOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
      render: (text, record) => {
        let index =
          (searchParams?.page - 1) * pageSize.DEFAULT + record.index + 1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
    },
    {
      index: '1',
      title: 'Mã',
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
      title: 'Tên',
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
      title: 'Mô tả',
      dataIndex: 'description',
      width: 120,
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
      index: '4',
      title: 'Loại dữ liệu',
      dataIndex: 'configDataType',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.configDataType?.name}>
            <div className='ellipsis-text'>{record?.configDataType?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '5',
      title: messages['common.status'] as string,
      dataIndex: 'configDataType',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <AppTag
            title={record?.usedStatus?.name ?? 'Trống'}
            color={`#${record?.usedStatus?.color ?? 'bdbdbd'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: '5',
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
              <Menu.Item key={1}>
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item
                key={2}
                disabled={
                  record?.usedStatus?.code == '2' || record?.isSystem == true
                }
              >
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item
                key={3}
                disabled={
                  record?.usedStatus?.code == '2' || record?.isSystem == true
                }
              >
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

  // PickList Modal
  const [info, setInfo] = useState<{
    draftString: string;
    type: string;
    action: () => void;
    record: any;
  }>({
    draftString: '',
    type: '',
    action: () => {},
    record: null,
  });
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const handleOpenPropertyModal = () => {
    const info = {
      draftString: DraftStrings.property,
      type: ActionType.ADD,
      action: () => {
        setPropertyModalOpen(false);
        handleChangeSearchParams({...searchParams});
      },
      record: null,
    };
    setInfo(info);
    setPropertyModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    dataTypeCode: [],
  });

  useEffect(() => {
    const fetchPickLists = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetPropertyList(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        dateSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setColumns(initialColumns);
      setDataSource(dateSource);
      setCurrent(res?.currentPage ?? 1);
      setTotal(res?.total ?? 0);
      setLoading(false);
    };
    fetchPickLists();
  }, [searchParams]);

  const handleChangeSearchParams = (params: any) => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  };
  return {
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    propertyModalOpen,
    setPropertyModalOpen,
    info,
    setInfo,
    handleOpenPropertyModal,
    handleChangeSearchParams,

    isOpen,
    setIsOpen,
    modalData,
  };
};

export default useProperty;
