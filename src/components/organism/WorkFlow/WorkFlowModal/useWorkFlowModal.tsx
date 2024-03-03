import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {ActionType} from 'shared/constants/AppVariables';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {ModalInfoProps} from 'components/molecules/AppModalV2';
import WorkFlowAddAndUpdate from '../WorkFlowAddAndUpdate';
import WorkFlowDetail from '../WorkFlowDetail';
import {Form} from 'antd';
import {checkValidateForm} from 'utils/FormUtils';
import {
  onCreateWorkflow,
  onGetWorkflowDetail,
  onUpdateWorkflow,
} from 'redux/actions/Workflow';
import {useDispatch} from 'react-redux';

const useWorkFlowModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
  const dispatch = useDispatch();
  const {type, record, action} = info;
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    title: <></>,
    description: <></>,
    submitText: '',
    handleSubmit: () => {},
    closeText: '',
    handleClose: () => {
      setIsOpen(false);
    },
    width: 512,
    submit: false,
    loading: false,
    onClosable: () => {
      setIsOpen(false);
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSetModalInfo = (type: string) => {
    const types = {
      [ActionType.ADD]: {
        title: messages['common.addWorkFlow'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
        description: (
          <WorkFlowAddAndUpdate
            form={form}
            dataSource={dataSource}
            setDataSource={setDataSource}
            info={info}
            setIsOpen={setIsOpen}
            handleFieldsChange={handleCheckFormData}
          />
        ),
        width: 1200,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable
            title={'common.editWorkFlow'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
        description: (
          <WorkFlowAddAndUpdate
            form={form}
            dataSource={dataSource}
            setDataSource={setDataSource}
            info={info}
            setIsOpen={setIsOpen}
            handleFieldsChange={handleCheckFormData}
          />
        ),
        width: 1200,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailWorkFlow'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
        description: <WorkFlowDetail infoDetail={record} />,
        width: 1200,
      },
    };
    setModalInfo(types[type]);
  };

  const handleSetValueForm = (record: any) => {
    if (!record) return;
    const fetchWorkFlowDetails = async (workflowCode: string) => {
      if (!workflowCode) return;
      const res: any =
        (await dispatch(onGetWorkflowDetail(workflowCode))) ?? {};
      let dataSource: any = [];
      if (res) {
        res?.workflowDetails?.forEach((item: any, index: any) => {
          dataSource.push({
            ...item,
            key: index + 1,
            index: index + 1,
            value: item ? item?.name : null,
            id: index + 1,
          });
        });
        setDataSource(dataSource);
        form.setFieldsValue({
          name: res?.name,
          description: res?.description,
        });
      }
    };
    const workflowCode = record?.code;
    fetchWorkFlowDetails(workflowCode);
  };

  useEffect(() => {
    if (info) {
      const {type, record} = info;
      handleSetModalInfo(type);
      handleSetValueForm(record);
      if (type === ActionType.VIEW) setDisabled(false);
      if (type === ActionType.EDIT) setDisabled(false);
    }
  }, [info]);

  const handleSubmit = async (): Promise<void> => {
    switch (type) {
      case ActionType.ADD: {
        const {name, description} = form.getFieldsValue();
        const workflowDetails: Array<any> = [];
        dataSource?.map((item: any) => {
          workflowDetails?.push({
            name: item ? item?.value : null,
          });
        });
        const payload = {
          name: name,
          description: description,
          workflowDetails: workflowDetails,
        };
        await dispatch(onCreateWorkflow(payload));
        action();
        handleRemoveState();
        break;
      }
      case ActionType.EDIT: {
        const {name, description} = form.getFieldsValue();
        const updateWorkflowDetails: Array<any> = [];
        dataSource?.map((item: any) => {
          updateWorkflowDetails?.push({
            code: item ? item?.code : null,
            name: item ? item?.value : null,
          });
        });
        const payload = {
          code: record?.code,
          name: name,
          description: description,
          updateWorkflowDetails: updateWorkflowDetails,
        };
        console.log('payload', payload);

        await dispatch(onUpdateWorkflow(payload));
        action();
        handleRemoveState();
        break;
      }
      case ActionType.VIEW: {
        handleRemoveState();
        break;
      }
    }
  };
  const handleClose = (): void => {
    handleRemoveState();
  };
  const handleRemoveState = (): void => {
    form.resetFields();
    setDataSource([]);
    setIsOpen(false);
  };

  const handleCheckFormData = () => {
    const optionalFields = ['description'];
    const isValid = checkValidateForm(form, optionalFields);
    if (!isValid) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  return {
    modalInfo,
    form,
    dataSource,
    setDataSource,

    handleCheckFormData,
    disabled,
    loading,
    handleClose,
    handleSubmit,
  };
};

export default useWorkFlowModal;
