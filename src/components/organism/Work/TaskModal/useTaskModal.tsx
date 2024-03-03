import { debounce } from 'lodash';
import { Form } from 'antd';
import AppTitleLable from 'components/atoms/AppTitleLable';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import {
  onCreateTask,
  onGetTasksDetail,
  onUpdateTask,
} from 'redux/actions/Task';
import { dateTimeFormat } from 'shared/constants/AppConst';
import { ActionType } from 'shared/constants/AppVariables';
import { checkValidateForm } from 'utils/FormUtils';

const useTaskModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { type, record, action } = info;
  const { messages } = useIntl();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [detailInfo, setDetailInfo] = useState<any>(null);
  const [fileAttachments, setFileAttachments] = useState<any[]>([]);

  const handleSubmit = async () => {
    switch (type) {
      case ActionType.ADD: {
        const {
          name,
          project,
          progress,
          workflowStatus,
          parentTask,
          startDate,
          endDate,
          jobType,
          priority,
          reporters,
          assignees,
        } = form.getFieldsValue();
        const reqParams = {
          name,
          project: project ? { code: project.toString() } : null,
          progress: progress,
          workflowStatus: workflowStatus
            ? { code: workflowStatus.toString() }
            : null,
          parentTask: parentTask ? { code: parentTask.toString() } : null,
          startDate: startDate ? startDate?.format(dateTimeFormat[1]) : null,
          endDate: endDate ? endDate?.format(dateTimeFormat[1]) : null,
          jobType: jobType ? { code: jobType.toString() } : null,
          priority: priority ? { code: priority.toString() } : null,
          reporters: reporters
            ? reporters?.map((code: string) => {
                return { code: code };
              })
            : [],
          assignees: assignees
            ? assignees.map((code: string) => {
                return { code: code };
              })
            : [],
          description: description,
          fileAttachments: fileAttachments ?? [],
        };
        const res: any = await dispatch(onCreateTask(reqParams));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.EDIT: {
        const {
          name,
          project,
          progress,
          workflowStatus,
          parentTask,
          startDate,
          endDate,
          jobType,
          priority,
          reporters,
          assignees,
        } = form.getFieldsValue();
        const reqParams = {
          code: record.code,
          name,
          project: project ? { code: project.toString() } : null,
          progress: progress,
          workflowStatus: workflowStatus
            ? { code: workflowStatus.toString() }
            : null,
          parentTask: parentTask ? { code: parentTask.toString() } : null,
          startDate: startDate ? startDate?.format(dateTimeFormat[1]) : null,
          endDate: endDate ? endDate?.format(dateTimeFormat[1]) : null,
          jobType: jobType ? { code: jobType.toString() } : null,
          priority: priority ? { code: priority.toString() } : null,
          reporters: reporters
            ? reporters?.map((code: string) => {
                return { code: code };
              })
            : [],
          assignees: assignees
            ? assignees.map((code: string) => {
                return { code: code };
              })
            : [],
          description: description,
          fileAttachments: fileAttachments ?? [],
        };
        const res: any = await dispatch(onUpdateTask(reqParams));
        if (res) {
          action();
          handleRemoveState();
        }
        break;
      }
      case ActionType.VIEW: {
        handleRemoveState();
        break;
      }
    }
  };
  const handleRemoveState = (): void => {
    form.resetFields();
    setIsOpen(false);
    setFileAttachments([]);
    setDescription('');
  };
  const [modalInfo, setModalInfo] = useState<{
    title: React.ReactNode | string;
    submitText: React.ReactNode | string;
    closeText: React.ReactNode | string;
    handleSubmit: () => Promise<void>;
    handleClose: () => void;
    onClosable: () => void;
  }>({
    title: <></>,
    submitText: <></>,
    closeText: <></>,
    handleSubmit: handleSubmit,
    handleClose: handleRemoveState,
    onClosable: handleRemoveState,
  });

  const handleSetAppModalConfig = (type: string, record: any) => {
    if (!type) return;
    switch (type) {
      case ActionType.VIEW: {
        setModalInfo((pre) => ({
          ...pre,
          title: (
            <AppTitleLable
              title={messages['common.taskInfo'] as string}
              recordTitle={record?.code}
            />
          ),
          submitText: messages['common.close'] as string,
          closeText: '',
        }));
        break;
      }
      case ActionType.ADD: {
        setModalInfo((pre) => ({
          ...pre,
          title: messages['common.addTask'] as string,
          submitText: messages['common.save'] as string,
          closeText: messages['common.cancel'] as string,
        }));
        break;
      }
      case ActionType.EDIT: {
        setModalInfo((pre) => ({
          ...pre,
          title: (
            <AppTitleLable
              title={'common.editWork'}
              recordTitle={record?.code}
            />
          ),
          submitText: messages['common.save'] as string,
          closeText: messages['common.cancel'] as string,
        }));
        break;
      }
    }
  };
  const fetchTaskDetails = async (code: string) => {
    if (!code) {
      setDetailInfo(null);
      return;
    }
    const res: any = await dispatch(onGetTasksDetail(code));
    setDetailInfo(res);
    setDescription(res?.description);
    handleSetAppModalConfig(type, res);
  };
  useEffect(() => {
    const { record } = info;
    const code = record?.code;
    fetchTaskDetails(code);
  }, [info]);

  useEffect(() => {
    const { type, record } = info;
    handleSetAppModalConfig(type, record);
  }, [info]);

  const handleFieldsChangeDebound = () => {
    const optionalFields = [];
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(!isValid);
    setDisabled(false);
  };

  const handleFieldsChange = useCallback(
    debounce(() => handleFieldsChangeDebound(), 200),
    [],
  );

  return {
    form,
    modalInfo,

    disabled,
    handleFieldsChange,
    description,
    setDescription,
    handleSubmit,
    handleRemoveState,
    detailInfo,
    fetchTaskDetails,
    fileAttachments,
    setFileAttachments,
  };
};

export default useTaskModal;
