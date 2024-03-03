import IntlMessages from '@crema/utility/IntlMessages';
import {Form, Menu, Popover, Tooltip} from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppTag from 'components/atoms/AppTag';
import {ModalInfoProps} from 'components/molecules/AppModalV2';
import AssignStaffInCharge from 'components/organism/Customer/AssignEmployee';
import AssignTags from 'components/organism/Customer/AssignTags';
import UpdateCustomerStatus from 'components/organism/Customer/UpdateCustomerStatus';
import {ChooseInventoryType} from 'components/organism/SalesProgram/ChooseInventoryModal';
import {useEffect, useState} from 'react';
import {AiOutlineEllipsis} from 'react-icons/ai';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onAddCustomerEmployeeInCharge,
  onAddMultipleTags,
  onDeleteCustomer,
  onDownloadCustomers,
  onGetCustomerList,
  onUpdateCustomerStatus,
} from 'redux/actions/Customer';
import {pageSize} from 'shared/constants/AppConst';
import {
  ActionType,
  CustomerAction,
  DraftStrings,
} from 'shared/constants/AppVariables';
import ObjectHelper from 'utils/ObjectHelper';

export enum CustomerListAction {
  VIEW_DETAIL = 'VIEW_DETAIL',
  EDIT = 'EDIT',
  ASSIGN_STAFF_IN_CHARGE = 'ASSIGN_STAFF_IN_CHARGE',
  DOWNLOAD_INFO = 'DOWNLOAD_INFO',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  ADD_INVENTORY_INTERESTED = 'ADD_INVENTORY_INTERESTED',
  UPDATE_STATUS = 'UPDATE_STATUS',
  ASSIGN_TAGS = 'ASSIGN_TAGS',
  IMPORT_CUSTOMER = 'IMPORT_CUSTOMER',
  MERGE = 'MERGE',
  DOWLOAD_CUSTOMER_LIST = 'DOWLOAD_CUSTOMER_LIST',
}
const useCustomerList = () => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);

  const [chooseInventoryInfo, setChooseInventoryInfo] = useState<{
    type: ChooseInventoryType | undefined;
    action: () => void;
    record: any;
  }>({
    type: undefined,
    action: () => {},
    record: null,
  });
  const [chooseInventoryOpen, setChooseInventoryOpen] = useState(false);

  const [actionDisabled, setActionDisabled] = useState(true);
  // App Modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    title: <></>,
    description: <></>,
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {
      form.resetFields();
      setIsOpen(false);
    },
    width: 512,
    submit: false,
    loading: false,
    onClosable: () => {
      form.resetFields();
      setIsOpen(false);
    },
  });

  // PickList Modal
  const [info, setInfo] = useState<{
    type: ActionType | undefined;
    action: () => void;
    record: any;
  }>({
    type: undefined,
    action: () => {},
    record: null,
  });
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  const handleChangeModalInfo = (info: ModalInfoProps) => {
    setModalInfo((pre) => {
      return {
        ...pre,
        ...info,
      };
    });
  };

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case CustomerAction.VIEW_DETAIL: {
        // View detail customer
        handleOpenCustomerModal(ActionType.VIEW, record);
        setCustomerModalOpen(true);
        break;
      }
      case CustomerAction.EDIT: {
        // Edit customer
        handleOpenCustomerModal(ActionType.EDIT, record);
        setCustomerModalOpen(true);
        break;
      }
      case CustomerAction.ATTACH_STAFF: {
        // Assign Staff In Charge
        handleChangeModalInfo({
          title: messages['common.notification'] as string,
          description: (
            <AssignStaffInCharge
              form={form}
              handleChangeModalInfo={handleChangeModalInfo}
            />
          ),
          submitText: messages['common.agree'] as string,
          handleSubmit: async () => {
            const code = record?.code;
            const customers = [
              {
                code: code,
              },
            ];
            const {employees} = form.getFieldsValue();
            const payload = {
              customers: customers,
              employee: employees,
            };
            const res: any = await dispatch(
              onAddCustomerEmployeeInCharge(payload),
            );
            if (res) {
              setIsOpen(false);
              form.resetFields();
              handleChangeSearchParams({...searchParams});
            }
          },
          closeText: messages['common.cancel'] as string,
          width: 512,
        });
        setIsOpen(true);
        break;
      }
      case CustomerAction.UPDATE_STATUS: {
        // Assign Staff In Charge
        handleChangeModalInfo({
          title: messages['common.notification'] as string,
          description: (
            <UpdateCustomerStatus form={form} setModalInfo={setModalInfo} />
          ),
          submitText: messages['common.agree'] as string,
          handleSubmit: async () => {
            const code = record?.code;
            const {status} = form.getFieldsValue();
            const payload = {
              code: code,
              status: status,
            };
            const res: any = await dispatch(onUpdateCustomerStatus(payload));
            if (res) {
              setIsOpen(false);
              form.resetFields();
              handleChangeSearchParams({...searchParams});
            }
          },
          closeText: messages['common.cancel'] as string,
          width: 512,
          disabled: true,
        });
        setIsOpen(true);
        break;
      }
      case CustomerAction.DELETE: {
        // Delete customer
        handleChangeModalInfo({
          title: messages['common.notification'] as string,
          description: (
            <>
              <p>
                {'Bạn có chắc chắn muốn xóa khách hàng '}
                <strong>{`${record?.code} - ${record?.name}`}</strong>{' '}
                {'này không?'}
              </p>
            </>
          ),
          submitText: messages['common.agree'],
          handleSubmit: async () => {
            await dispatch(onDeleteCustomer(record.code));
            setIsOpen(false);
            handleChangeSearchParams({
              ...searchParams,
            });
          },
          closeText: messages['common.cancel'],
          width: 512,
        });
        setIsOpen(true);
        break;
      }
      case CustomerAction.ADD_INVENTORY_INTERESTED: {
        // Add inventory interest
        const info = {
          type: ChooseInventoryType.ADD_INVETORY_INTEREST,
          action: () => {
            form.resetFields();
            handleChangeSearchParams({...searchParams});
          },
          record: record,
        };
        setChooseInventoryInfo(info);
        setChooseInventoryOpen(true);
        break;
      }
      case CustomerAction.ATTACH_TAGS: {
        const currentTags: Array<any> = record?.tags ?? [];
        handleChangeModalInfo({
          title: messages['common.assignTags'],
          description: (
            <AssignTags
              form={form}
              handleChangeModalInfo={handleChangeModalInfo}
              currentTags={currentTags}
            />
          ),
          submitText: messages['common.agree'],
          handleSubmit: async () => {
            const customers = [
              {
                code: record?.code,
              },
            ];
            const {tags} = form.getFieldsValue();
            const payload = {
              customers,
              tags: tags,
            };
            handleChangeModalInfo({
              submit: true,
            });
            const res: any = await dispatch(onAddMultipleTags(payload));
            handleChangeModalInfo({
              submit: false,
            });
            if (res) {
              form.resetFields();
              setIsOpen(false);
            }
            handleChangeSearchParams({...searchParams});
          },
          closeText: messages['common.cancel'],
          disabled: true,
        });
        setIsOpen(true);
        break;
      }
      case CustomerAction.DOWNLOAD_INFO: {
        const code = record.code;
        const searchParams = {
          searchText: code,
        };
        const now = new Date().toISOString().slice(0, 10);
        const res = await onDownloadCustomers(searchParams);

        if (res) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Biểu mẫu VARS Connect - ${now}.xlsx`);
          document.body.appendChild(link);
          link.click();
        }

        break;
      }
      default:
        break;
    }
  };

  const initialColumns = [
    {
      index: '1',
      title: messages['common.code'],
      width: 100,
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
      title: messages['common.fullName'],
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
      title: messages['common.phoneShort'],
      dataIndex: 'phone',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.phone ?? ''}>
            <div className='ellipsis-text'>{record?.phone ?? ''}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '4',
      title: messages['common.customerGroup'],
      dataIndex: 'customerGroup',
      width: 145,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const customerGroup = record?.customerGroup?.name ?? '';
        return (
          <Tooltip title={customerGroup}>
            <div className='ellipsis-text'>{customerGroup}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '5',
      title: messages['common.customerSource'],
      dataIndex: 'customerResources',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const customerResources = record?.customerSource?.name ?? '';
        return (
          <Tooltip title={customerResources}>
            <div className='ellipsis-text'>{customerResources}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '6',
      title: messages['common.notes'],
      dataIndex: 'notes',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const description = record?.description ?? '';
        const descriptionHtml = (
          <p
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></p>
        );
        return (
          <Tooltip title={descriptionHtml}>
            <div
              className='ellipsis-text'
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          </Tooltip>
        );
      },
    },
    {
      index: '7',
      title: messages['common.status'],
      dataIndex: 'status',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <AppTag
            title={record?.status?.name ?? 'Trống'}
            color={`#${record?.status?.color ?? 'bdbdbd'}`}
          />
        );
      },
    },
    {
      index: '8',
      title: messages['common.tags'],
      dataIndex: 'tags',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const tags = record?.tags?.map((item: any) => item?.name).join(', ');
        return (
          <Tooltip title={tags}>
            <div className='ellipsis-text'>{tags}</div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Thao tác',
      key: '9',
      width: 100,
      render: (_: any, record: any) => {
        if (record?.actionsEnable?.length === 0) return <> </>;
        const actionsEnable: Array<string> = record?.actionsEnable ?? [];
        let content = (
          <div style={{display: 'flex'}}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              {actionsEnable.includes(CustomerAction.VIEW_DETAIL) && (
                <Menu.Item key={CustomerAction.VIEW_DETAIL}>
                  <AppControlAction variant='view' />
                  <IntlMessages id='common.viewDetail' />
                </Menu.Item>
              )}
              {actionsEnable.includes(CustomerAction.EDIT) && (
                <Menu.Item key={CustomerAction.EDIT}>
                  <AppControlAction variant='edit' />
                  <IntlMessages id='common.edit' />
                </Menu.Item>
              )}
              {actionsEnable.includes(CustomerAction.ATTACH_STAFF) && (
                <Menu.Item key={CustomerAction.ATTACH_STAFF}>
                  <AppControlAction variant='edit' />
                  <IntlMessages id='common.assignStaffToBeInCharge' />
                </Menu.Item>
              )}
              {actionsEnable.includes(CustomerAction.DELETE) && (
                <Menu.Item key={CustomerAction.DELETE}>
                  <AppControlAction variant='delete' />
                  <IntlMessages id='common.deleteCustomer' />
                </Menu.Item>
              )}
              {actionsEnable.includes(
                CustomerAction.ADD_INVENTORY_INTERESTED,
              ) && (
                <Menu.Item key={CustomerAction.ADD_INVENTORY_INTERESTED}>
                  <AppControlAction variant='add' />
                  <IntlMessages id='common.addRealEstateOfInterest' />
                </Menu.Item>
              )}
              {actionsEnable.includes(CustomerAction.UPDATE_STATUS) && (
                <Menu.Item key={CustomerAction.UPDATE_STATUS}>
                  <AppControlAction variant='edit' />
                  <IntlMessages id='common.updateStatus' />
                </Menu.Item>
              )}
              {actionsEnable.includes(CustomerAction.ATTACH_TAGS) && (
                <Menu.Item key={CustomerAction.ATTACH_TAGS}>
                  <AppControlAction variant='tags' />
                  <IntlMessages id='common.assignTags' />
                </Menu.Item>
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
  const [columns, setColumns] = useState<any>(initialColumns);

  const handleOpenCustomerModal = (type: ActionType, record: any) => {
    const info = {
      draftString: DraftStrings.customer,
      type: type,
      action: () => {
        handleChangeSearchParams({...searchParams});
      },
      record: record,
    };
    setInfo(info);
    setCustomerModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    staffInCharges: '',
    status: [],
    customerGroup: [],
    customerSource: [],
    tags: [],
  });

  useEffect(() => {
    const fetchPickLists = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetCustomerList(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements?.forEach((item: any, index: number) => {
        dateSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
          id: item?.code,
        });
      });
      setDataSource(dateSource);
      setColumns(initialColumns);
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

  const handleSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
    setActionDisabled(selectedRowKeys.length < 2);
  };
  return {
    form,
    isSearchAll,
    loading,
    total,
    columns,
    dataSource,
    current,
    setCurrent,
    customerModalOpen,
    setCustomerModalOpen,
    info,
    handleOpenCustomerModal,
    handleChangeSearchParams,
    isOpen,
    setIsOpen,
    modalInfo,
    actionDisabled,
    handleSelectChange,
    selectedRowKeys,

    chooseInventoryInfo,
    chooseInventoryOpen,
    setChooseInventoryOpen,
    handleChangeModalInfo,

    setIsRefresh,
    searchParams,
  };
};

export default useCustomerList;
