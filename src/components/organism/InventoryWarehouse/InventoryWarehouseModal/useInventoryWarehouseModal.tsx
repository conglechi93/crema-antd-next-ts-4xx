import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {
  onCreateInventoryWareHouse,
  onUpdateInventoryWarehouse,
} from 'redux/actions/InventoryWarehouse';
import {pageSize} from 'shared/constants/AppConst';
import {ActionType} from 'shared/constants/AppVariables';
import {checkValidateForm} from 'utils/FormUtils';
import {loadState, removeState} from 'utils/LocalStore';

const useInventoryWarehouseModal = (
  info: any,
  setDisabled: (disabled: boolean) => void,
  setIsOpen: (disabled: boolean) => void,
) => {
  const {type, draftString, action} = info;
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [inventoryWarehouseFormData, setInventoryWarehouseFormData] =
    useState<any>({});
  const [modalConfig, setModalConfig] = useState<{
    title: React.ReactDOM | string;
    submitText: React.ReactDOM | string;
    closeText: React.ReactDOM | string;
  }>({
    title: '',
    submitText: '',
    closeText: '',
  });

  const [formSearchParams, setFormSearchParams] = useState<{
    page: number;
    pageSize: number;
    isLoadMore: boolean;
  }>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });

  const [projectSearchParams, setProjectSearchParams] = useState<{
    page: number;
    pageSize: number;
    status: string;
    isLoadMore: boolean;
  }>({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    status: '2', // Get happenning project
    isLoadMore: true,
  });

  useEffect(() => {
    const handleConfigModal = async () => {
      switch (type) {
        case ActionType.ADD: {
          const config = {
            title: messages['common.addInventoryWarehouse'] as string,
            submitText: messages['common.save'] as string,
            closeText: messages['common.cancel'] as string,
          };
          setModalConfig(config);
          setDisabled(true);
          break;
        }
        case ActionType.EDIT: {
          const config = {
            title: messages['common.editInventoryWarehouse'] as string,
            submitText: messages['common.save'] as string,
            closeText: messages['common.cancel'] as string,
          };
          setModalConfig(config);
          setDisabled(false);
          break;
        }
      }
      const {draftString} = info;
      const data = loadState(draftString);
      if (data && Object.keys(data).length > 0) {
        form.setFieldsValue({
          code: data?.code,
          name: data?.name,
          project: data?.project
            ? {
                value: data?.project?.code,
                label: data?.project?.name,
              }
            : null,
          form: data?.form
            ? {
                value: data?.form?.code,
                label: data?.form?.name,
              }
            : null,
        });

        const inventoryTableFormData = {
          code: data?.code,
          name: data?.name,
          project: data?.project?.code,
          form: data?.form?.code,
        };
        setInventoryWarehouseFormData(inventoryTableFormData);
      } else {
        form.resetFields();
        setInventoryWarehouseFormData({});
      }
    };
    handleConfigModal();
  }, [info]);

  const handleSubmit = async () => {
    switch (type) {
      case ActionType.ADD: {
        setLoading(true);
        await dispatch(onCreateInventoryWareHouse(inventoryWarehouseFormData));
        handleRemoveState();
        action();
        setLoading(false);
        break;
      }
      case ActionType.EDIT: {
        setLoading(true);
        const data = loadState(draftString);
        const payload = {
          ...inventoryWarehouseFormData,
          code: data?.code,
        };
        await dispatch(onUpdateInventoryWarehouse(payload));
        handleRemoveState();
        action();
        setLoading(false);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleRemoveState = async (): Promise<void> => {
    removeState([draftString]);
    await form.resetFields();
  };
  const handleClose = async () => {
    handleRemoveState();
    setIsOpen(false);
  };

  const optionalFields = [];

  const handleFieldsChange = (e) => {
    const {type} = info;
    if (type === ActionType.VIEW) {
      setDisabled(false);
      return;
    }
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);

    const formInfo = e[0];
    const data = {
      ...inventoryWarehouseFormData,
      [formInfo.name[0]]: formInfo.value,
    };
    setInventoryWarehouseFormData(data);
  };
  return {
    loading,
    form,
    handleSubmit,
    handleClose,
    handleFieldsChange,

    modalConfig,
    handleRemoveState,

    formSearchParams,
    setFormSearchParams,

    projectSearchParams,
    setProjectSearchParams,
  };
};

export default useInventoryWarehouseModal;
