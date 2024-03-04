import IntlMessages from '@crema/utility/IntlMessages';
import { Form, Image, Menu, Popover } from 'antd';
import AppControlAction from 'components/atoms/AppControlAction';
import DashBoardIcon from 'assets/icon/Button_option.svg';
import AssignTags from '../AssignTags';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import {
  onAddCustomerEmployeeInCharge,
  onAddMultipleTags,
  onDownloadCustomers,
} from 'redux/actions/Customer';
import AssignStaffInCharge from '../AssignEmployee';
import { CustomerListAction } from 'modules/customerManagement/CustomerList/useFunc';
import ImportCustomer from '../ImportCustomer';
import { useState } from 'react';
import { ModalInfoProps } from 'components/molecules/AppModalV2';
import { FormInstance } from 'antd/lib';
import MergeCustomer from '../MergeCustomer';
type CustomerDashboardProps = {
  form: FormInstance;
  selectedRowKeys: Array<any>;
  actionDisabled: boolean;
  setIsOpen: (open: boolean) => void;
  handleChangeModalInfo: (data: ModalInfoProps) => void;
  setIsRefresh: (isRefresh: any) => void;
  searchParams: any;
};
const CustomerDashboard = (props: CustomerDashboardProps) => {
  const dispatch = useDispatch();
  const {
    form,
    selectedRowKeys,
    actionDisabled,
    setIsOpen,
    handleChangeModalInfo,
    setIsRefresh,
    searchParams,
  } = props;
  const { messages } = useIntl();
  const [mergeCustomerOpen, setMergeCustomerOpen] = useState(false);
  const [importCustomerOpen, setImportCustomerOpen] = useState(false);
  const handleAction = async (key: any, record: any) => {
    switch (key) {
      case CustomerListAction.ASSIGN_STAFF_IN_CHARGE: {
        handleChangeModalInfo({
          title: messages['common.assignStaffToBeInCharge'] as string,
          description: (
            <AssignStaffInCharge
              form={form}
              handleChangeModalInfo={handleChangeModalInfo}
            />
          ),
          submitText: messages['common.agree'] as string,
          handleSubmit: async () => {
            const { employees } = form.getFieldsValue();
            const payload = {
              customers: selectedRowKeys?.map((key) => {
                return {
                  code: key,
                };
              }),
              employee: employees,
            };
            handleChangeModalInfo({
              submit: true,
            });
            const res: any = await dispatch(
              onAddCustomerEmployeeInCharge(payload),
            );
            handleChangeModalInfo({
              submit: false,
            });
            if (res) {
              form.resetFields();
              setIsOpen(false);
            }
            setIsRefresh((pre) => !pre);
          },
          closeText: messages['common.cancel'] as string,
          disabled: true,
          width: 480,
        });
        setIsOpen(true);
        break;
      }
      case CustomerListAction.IMPORT_CUSTOMER: {
        setImportCustomerOpen(true);
        break;
      }
      case CustomerListAction.ASSIGN_TAGS: {
        handleChangeModalInfo({
          title: messages['common.assignTags'] as string,
          description: (
            <AssignTags
              form={form}
              handleChangeModalInfo={handleChangeModalInfo}
            />
          ),
          submitText: messages['common.agree'] as string,
          handleSubmit: async () => {
            const { tags } = form.getFieldsValue();
            const payload = {
              customers: selectedRowKeys.map((key) => {
                return {
                  code: key,
                };
              }),
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
            setIsRefresh((pre) => !pre);
          },
          closeText: messages['common.cancel'] as string,
          disabled: true,
        });
        setIsOpen(true);
        break;
      }
      case CustomerListAction.MERGE: {
        setMergeCustomerOpen(true);
        break;
      }

      case CustomerListAction.DOWLOAD_CUSTOMER_LIST: {
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
  let content = (
    <div style={{ display: 'flex' }}>
      <Menu
        className='popover-menu'
        onClick={(e) => {
          e.domEvent.stopPropagation();
          const record = '';
          handleAction(e.key, record);
        }}
      >
        <Menu.Item
          key={CustomerListAction.ASSIGN_STAFF_IN_CHARGE}
          disabled={actionDisabled}
        >
          <AppControlAction variant='edit' />
          <IntlMessages id='common.assignStaffToBeInCharge' />
        </Menu.Item>
        <Menu.Item key={CustomerListAction.IMPORT_CUSTOMER}>
          <AppControlAction variant='upload' />
          <IntlMessages id='common.importCustomer' />
        </Menu.Item>
        <Menu.Item key={CustomerListAction.DOWLOAD_CUSTOMER_LIST}>
          <AppControlAction variant='download' />
          <IntlMessages id='common.downloadCustomerList' />
        </Menu.Item>
        <Menu.Item key={CustomerListAction.MERGE}>
          <AppControlAction variant='merge' />
          <IntlMessages id='common.mergeData' />
        </Menu.Item>
        <Menu.Item
          key={CustomerListAction.ASSIGN_TAGS}
          disabled={actionDisabled}
        >
          <AppControlAction variant='tags' />
          <IntlMessages id='common.assignTags' />
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <>
      <MergeCustomer
        isOpen={mergeCustomerOpen}
        setIsOpen={setMergeCustomerOpen}
      />
      <ImportCustomer
        isOpen={importCustomerOpen}
        setIsOpen={setImportCustomerOpen}
        setIsRefresh={setIsRefresh}
      />
      <Popover content={content} placement='bottom'>
        <Image
          src={DashBoardIcon.src}
          alt=''
          style={{ width: '36px', height: '36px', cursor: 'pointer' }}
          preview={false}
        />
      </Popover>
    </>
  );
};

export default CustomerDashboard;
