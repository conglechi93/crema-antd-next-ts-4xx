import IntlMessages from '@crema/utility/IntlMessages';
import {Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onDeletePickList, onGetPickLists} from 'redux/actions/PickList';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import {addLeadingZeros} from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const usePickLists = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
  });
  // App Modal
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appModalData, setAppModalData] = useState<any>({
    title: '',
    description: '',
    submitText: '',
    closeText: '',
    handleClose: () => {},
    handleSubmit: () => {},
  });
  // PickList Modal
  const [pickListModalInfo, setPickListModalInfo] = useState<{
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

  const [pickListModalOpen, setPickListModalOpen] = useState(false);
  const handleOpenPickListModal = () => {
    const info = {
      draftString: DraftStrings.pickList,
      type: ActionType.ADD,
      action: () => {
        setPickListModalOpen(false);
        setIsRefresh((pre) => !pre);
      },
      record: null,
    };
    setPickListModalInfo(info);
    setPickListModalOpen(true);
  };
  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View detail pick list
        const info = {
          draftString: DraftStrings.pickList,
          type: ActionType.VIEW,
          action: () => {
            setPickListModalOpen(false);
            setIsRefresh((pre) => !pre);
          },
          record: record,
        };
        setPickListModalInfo(info);
        setPickListModalOpen(true);
        break;
      }
      case '2': {
        // Edit pick list
        const info = {
          draftString: DraftStrings.pickList,
          type: ActionType.EDIT,
          action: () => {
            setPickListModalOpen(false);
            setIsRefresh((pre) => !pre);
          },
          record: record,
        };
        setPickListModalInfo(info);
        setPickListModalOpen(true);
        break;
      }
      case '3': {
        // Delete pick list
        const appModalData = {
          title: 'Thông báo',
          description: (
            <p>
              Bạn có chắc chắn muốn xóa DSDL{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>không?
            </p>
          ),
          submitText: messages['common.agree'],
          closeText: messages['common.cancel'],
          handleClose: () => {
            setAppModalOpen(false);
          },
          handleSubmit: async () => {
            const pickListCode = record.code;
            await dispatch(onDeletePickList(pickListCode));
            setAppModalOpen(false);
            setIsRefresh((pre) => !pre);
          },
        };
        setAppModalData(appModalData);
        setAppModalOpen(true);

        break;
      }
    }
  };

  const initialColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      textAlign: 'center',
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.DEFAULT + record.index + 1;
        return (
          <div>
            {addLeadingZeros(
              index,
              index.toString().length + (2 - index.toString().length),
            )}
          </div>
        );
      },
      width: 50,
    },
    {
      index: '1',
      title: <IntlMessages id='common.code' />,
      width: 50,
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
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '4',
      width: 100,
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
              {!record?.isSystem && (
                <>
                  <Menu.Item key={2}>
                    <AppControlAction variant='edit' />{' '}
                    <IntlMessages id='common.edit' />
                  </Menu.Item>
                  <Menu.Item key={3}>
                    <AppControlAction variant='delete' />
                    <IntlMessages id='common.delete' />
                  </Menu.Item>
                </>
              )}
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
  const [columns, setColumns] = useState<Array<any>>(initialColumns);

  useEffect(() => {
    const fetchPickLists = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetPickLists(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements?.forEach((item: any, index: number) => {
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
  }, [searchParams, isRefresh]);

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
    pickListModalOpen,
    setPickListModalOpen,

    pickListModalInfo,
    handleOpenPickListModal,
    handleChangeSearchParams,

    appModalOpen,
    setAppModalOpen,
    appModalData,
  };
};

export default usePickLists;
