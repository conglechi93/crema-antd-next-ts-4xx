import IntlMessages from '@crema/utility/IntlMessages';
import {Tooltip} from 'antd';
import AppTag from 'components/atoms/AppTag';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onDeleteInventory} from 'redux/actions/Inventory';
import {pageSize} from 'shared/constants/AppConst';
import {addLeadingZeros} from 'utils/FormUtils';
import {createInventoryDataSource} from 'utils/LocalStore';
import ObjectHelper from 'utils/ObjectHelper';
import {ActionType, DraftStrings} from 'shared/constants/AppVariables';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {onGetEmployees} from 'redux/actions/Employees';

const useFunc = (
  isRefreshChild: boolean,
  setIsRefreshChild: (boolean) => void,
  departmentRecord: any,
  setIsRefresh: (boolean) => void,
) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [addInventoryInfo, setAddInventoryInfo] = useState({});
  const [isOpenInventoryModal, setIsOpenInventoryModal] = useState(false);
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    searchText: string;
    departments: string[];
    status: string;
  }>({
    page: 1,
    pageSize: pageSize.INVENTORY,
    searchText: '',
    departments: [],
    status: '1',
  });
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: any;
    description?: any;
    submitText?: any;
    handleSubmit: () => void;
    closeText?: any;
    handleClose?: () => void;
    width: number;
  }>({
    title: '',
    description: '',
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {},
    width: 480,
  });

  useEffect(() => {
    if (departmentRecord) {
      const departmentCode = departmentRecord?.code;
      setSearchParams({
        page: 1,
        pageSize: pageSize.DEFAULT,
        searchText: '',
        departments: departmentCode ? [departmentCode] : [],
        status: '1',
      });
    } else {
      setTotal(0);
      setDataSource([]);
    }
  }, [departmentRecord]);

  useEffect(() => {
    const fetchInventories = async () => {
      if (!departmentRecord) return;
      setIsLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'departments',
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetEmployees(searchParams));
      const elements: Array<any> = res?.elements || [];
      let dataSource: any = [];
      elements.forEach((item: any, index: number) => {
        dataSource.push({
          ...item,
          index: index,
          id: item?.id,
          code: item?.code,
          key: item?.code ? item?.code : index,
        });
      });
      setDataSource(dataSource);
      setTotal(res?.total || 0);
      setIsLoading(false);
      setCurrentPage(res?.currentPage || 1);
      setIsRefreshChild(false);
    };
    fetchInventories();
  }, [searchParams, isRefreshChild]);

  const handleAction = (key: string, record: any) => {
    switch (key) {
      case '1': {
        // View inventory detail
        setModalData({
          title: (
            <AppTitleLable
              title={'common.inventoryInfo'}
              recordTitle={record?.name}
            />
          ),
          description: <></>,
          submitText: <IntlMessages id='common.close' />,
          handleSubmit: () => {
            setOpen(false);
          },
          width: 1200,
        });
        setOpen(true);
        break;
      }
      case '2': {
        // Edit inventory
        const info = {
          draftString: DraftStrings.inventory,
          type: ActionType.EDIT,
          action: () => {
            setIsOpenInventoryModal(false);
            handleChangeSearchParam({
              searchParams,
            });
            setIsRefresh((pre) => !pre);
          },
          record: record,
        };
        setAddInventoryInfo(info);
        setModalData({
          title: (
            <AppTitleLable
              title={'common.editInventory'}
              recordTitle={record?.name}
            />
          ),
          handleSubmit: () => {},
          width: 1200,
        });
        const data = {
          ...departmentRecord,
          inventoryCode: record?.code,
        };
        createInventoryDataSource(data, DraftStrings.inventory);
        setIsOpenInventoryModal(true);
        break;
      }
      case '3': {
        // Delete inventory
        setModalData({
          title: messages['common.notification'] as string,
          description: (
            <p>
              Bạn có chắc chắn muốn xóa mặt hàng{' '}
              <strong>{`${record?.code} - ${record?.name} `}</strong>
              không?
            </p>
          ),
          submitText: messages['common.agree'] as string,
          closeText: messages['common.cancel'] as string,
          handleSubmit: async () => {
            const res: any = await dispatch(onDeleteInventory(record?.code));
            if (res) {
              setOpen(false);
              setIsRefresh((pre) => !pre);
              handleChangeSearchParam({
                ...searchParams,
              });
            }
          },
          handleClose: () => {
            setOpen(false);
          },
          width: 480,
        });
        setOpen(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  let columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 50,
      render: (text, record) => {
        let index =
          (searchParams.page - 1) * pageSize.INVENTORY + record.index + 1;
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
      title: <IntlMessages id='common.code' />,
      width: 60,
      dataIndex: 'code',
      key: '1',
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.code}>
            <div className='ellipsis-text'>{record?.code}</div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.fullName' />,
      width: 200,
      dataIndex: 'name',
      key: '2',
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
      title: <IntlMessages id='common.position' />,
      width: 200,
      dataIndex: 'workSpaces',
      key: '3',
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip
            title={record?.workSpaces
              ?.map((item: any) => item?.position?.name)
              .join(', ')}
          >
            <div className='ellipsis-text'>
              {record?.workSpaces
                ?.map((item: any) => item?.position?.name)
                .join(', ')}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      key: '4',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <AppTag
            title={record?.status?.name}
            color={`#${record?.status?.color}`}
          />
        );
      },
    },
    // {
    //   title: 'Thao tác',
    //   key: 'action',
    //   width: 70,
    //   render: (_: any, record: any) => {
    //     let content = (
    //       <div style={{display: 'flex'}}>
    //         <Menu
    //           className='popover-menu'
    //           onClick={(e) => {
    //             e.domEvent.stopPropagation();
    //             handleAction(e.key, record);
    //           }}
    //         >
    //           <Menu.Item key={1}>
    //             <AppControlAction variant='view' />
    //             <IntlMessages id='common.viewDetail' />
    //           </Menu.Item>
    //           <Menu.Item key={2}>
    //             <AppControlAction variant='edit' />
    //             <IntlMessages id='common.edit' />
    //           </Menu.Item>
    //           <Menu.Item key={3}>
    //             <AppControlAction variant='delete' />
    //             <IntlMessages id='common.delete' />
    //           </Menu.Item>
    //         </Menu>
    //       </div>
    //     );
    //     return (
    //       <Popover content={content} placement='topLeft'>
    //         <AiOutlineEllipsis
    //           style={{cursor: 'pointer', fontSize: '22px', display: 'flex'}}
    //         />
    //       </Popover>
    //     );
    //   },
    // },
  ];

  const handleChangeSearchParam = (values: any) => {
    setSearchParams({
      ...searchParams,
      ...values,
    });
  };
  return {
    isSearchAll,
    total,
    columns,
    isLoading,
    dataSource,
    handleChangeSearchParam,
    currentPage,
    setCurrentPage,
    open,
    setOpen,
    modalData,
    setModalData,
    addInventoryInfo,
    isOpenInventoryModal,
    setIsOpenInventoryModal,
  };
};
export default useFunc;
