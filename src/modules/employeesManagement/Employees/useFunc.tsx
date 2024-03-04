import { AppState } from '@auth0/auth0-react';
import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Form, Menu, Popover, Row, Tooltip } from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelect from 'components/atoms/AppSelect';
import AppTag from 'components/atoms/AppTag';
import AppTypo from 'components/atoms/AppTypo';
import { useEffect, useState } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetEmployeeStatus,
  onGetEmployees,
  onUpdateStatusEmployees,
} from 'redux/actions/Employees';
import { pageSize } from 'shared/constants/AppConst';
import { ActionType, EmployeeStatus } from 'shared/constants/AppVariables';
import { addLeadingZeros } from 'utils/FormUtils';
import ObjectHelper from 'utils/ObjectHelper';

const useProperty = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isSearchAll, setIsSearchAll] = useState(true);
  const [employeesRecord, setEmployeesRecord] = useState<any>();
  const [disabled, setDisabled] = useState(true);
  const [employeesInfoModalOpen, setEmployeesInfoModalOpen] = useState(false);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [editEmployeeModalOpen, setEditEmployeeModalOpen] = useState(false);

  // PickList Modal
  const [info, setInfo] = useState<{
    type: string;
    action: () => void;
    record: any;
  }>({
    type: '',
    action: () => {},
    record: null,
  });

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
  const { categories } = useSelector<AppState, AppState['category']>(
    ({ category }) => category,
  );
  const handleChangeStatus = () => {
    const { status } = form.getFieldsValue();
    if (!status) setDisabled(true);
    else setDisabled(false);
  };

  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case '1': {
        // View detail property
        setEmployeesRecord(record);
        setEmployeesInfoModalOpen(true);
        break;
      }
      case '2': {
        // Edit Employee
        const info = {
          type: ActionType.EDIT,
          action: () => {
            handleChangeSearchParams({
              ...searchParams,
            });
          },
          record: record,
        };
        setInfo(info);
        setEditEmployeeModalOpen(true);
        break;
      }
      case '3': {
        // Update status
        const statusOptions: Array<{ label: string; value: string }> = [];
        const code = record.code;
        const res: any = await dispatch(onGetEmployeeStatus(code));
        if (res?.listUpdateEmplyeeStatus) {
          const listUpdateEmplyeeStatus = res?.listUpdateEmplyeeStatus;
          listUpdateEmplyeeStatus?.map((item: any) => {
            if (item?.code !== 1 && item?.code !== 2) {
              statusOptions.push({
                label: item?.name,
                value: item?.code,
              });
            }
          });
        }

        setModalData({
          title: 'Cập nhật trạng thái nhân sự',
          description: (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <AppTypo variant='p-md-reg'>
                    Vui lòng chọn trạng thái mới cho nhân sự{' '}
                    <strong>{`${record?.name ?? record?.phone}`}</strong> :
                  </AppTypo>
                </Col>
                <Col xs={24}>
                  <AppForm form={form}>
                    <AppFormItem
                      name='status'
                      label='Trạng thái'
                      rules={[
                        {
                          required: true,
                          message: 'Trạng thái bắt buộc chọn!',
                        },
                      ]}
                    >
                      <AppSelect
                        options={statusOptions}
                        placeholder='Chọn trạng thái'
                        onChange={handleChangeStatus}
                      ></AppSelect>
                    </AppFormItem>
                  </AppForm>
                </Col>
              </Row>
            </>
          ),
          submitText: 'Đồng ý',
          handleSubmit: async () => {
            const { status } = form.getFieldsValue();
            const params = {
              status: {
                code: status,
              },
              code: record?.code,
            };
            await dispatch(onUpdateStatusEmployees(params));
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
      title: messages['common.code'],
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
      title: messages['common.name'],
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
      title: messages['common.department'],
      dataIndex: 'department',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const department: Array<any> = record?.workSpaces ?? [];
        const departmentText = department
          .map((item: any) => item?.department?.name)
          .join(', ');
        return (
          <Tooltip title={departmentText}>
            <div className='ellipsis-text'>{departmentText}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '4',
      title: messages['common.labourContract'],
      dataIndex: 'labourContract',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        return (
          <Tooltip title={record?.labourContract?.name}>
            <div className='ellipsis-text'>{record?.labourContract?.name}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '5',
      title: messages['common.position'],
      dataIndex: 'position',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (_: any, record: any) => {
        const position: Array<any> = record?.workSpaces ?? [];
        const positionText = position
          ?.map((item: any) => item?.position?.name)
          .join(', ');
        return (
          <Tooltip title={positionText}>
            <div className='ellipsis-text'>{positionText}</div>
          </Tooltip>
        );
      },
    },
    {
      index: '6',
      title: messages['common.status'],
      dataIndex: 'status',
      width: 120,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <AppTag
            title={record?.status?.name ?? 'Không có'}
            color={`#${record?.status?.color ?? '000'}`}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: '7',
      width: 100,
      render: (_: any, record: any) => {
        const actionsEnable: Array<string> = record?.actionsEnable ?? [];
        let content = (
          <div style={{ display: 'flex' }}>
            <Menu
              className='popover-menu'
              onClick={(e) => {
                e.domEvent.stopPropagation();
                handleAction(e.key, record);
              }}
            >
              <Menu.Item
                key={1}
                disabled={!actionsEnable?.includes(EmployeeStatus.VIEW_DETAIL)}
              >
                <AppControlAction variant='view' />
                <IntlMessages id='common.viewDetail' />
              </Menu.Item>
              <Menu.Item
                key={2}
                disabled={!actionsEnable?.includes(EmployeeStatus.EDIT)}
              >
                <AppControlAction variant='edit' />
                <IntlMessages id='common.edit' />
              </Menu.Item>
              <Menu.Item
                key={3}
                disabled={
                  !actionsEnable?.includes(EmployeeStatus.UPDATE_STATUS)
                }
              >
                <AppControlAction variant='cancel' />
                <IntlMessages id='common.updateStatus' />
              </Menu.Item>
            </Menu>
          </div>
        );
        return (
          <Popover content={content} placement='bottom'>
            <AiOutlineEllipsis
              style={{ cursor: 'pointer', fontSize: '22px', display: 'flex' }}
            />
          </Popover>
        );
      },
    },
  ];
  const [columns, setColumns] = useState<Array<any>>(initialColumns);

  const handleAddEmployee = () => {
    const info = {
      type: ActionType.ADD,
      action: () => {
        setAddEmployeeModalOpen(false);
        handleChangeSearchParams({
          ...searchParams,
        });
      },
      record: null,
    };
    setInfo(info);
    setAddEmployeeModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    searchText: '',
    status: [],
    departments: [],
    positions: [],
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      const isSearchAll = ObjectHelper.isEmpty(searchParams, [
        'page',
        'pageSize',
      ]);
      setIsSearchAll(isSearchAll);
      const res: any = await dispatch(onGetEmployees(searchParams));
      const dateSource: Array<any> = [];
      const elements = res?.elements ?? [];
      elements.forEach((item: any, index: number) => {
        dateSource.push({
          ...item,
          index: index,
          key: item?.code ? item?.code : index,
        });
      });
      setDataSource(dateSource);
      setCurrent(res?.currentPage ?? 1);
      setTotal(res?.total ?? 0);
      setColumns(initialColumns);
      setLoading(false);
    };
    fetchEmployees();
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
    handleAddEmployee,
    handleChangeSearchParams,
    disabled,
    info,

    isOpen,
    setIsOpen,
    modalData,

    employeesRecord,
    employeesInfoModalOpen,
    setEmployeesInfoModalOpen,

    editEmployeeModalOpen,
    setEditEmployeeModalOpen,

    addEmployeeModalOpen,
    setAddEmployeeModalOpen,
  };
};

export default useProperty;
