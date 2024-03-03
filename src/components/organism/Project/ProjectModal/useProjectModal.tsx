import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {ActionType} from 'shared/constants/AppVariables';
import AppTitleLable from 'components/atoms/AppTitleLable';
import {ModalInfoProps} from 'components/molecules/AppModalV2';
import {Form} from 'antd';
import {
  onCreateProject,
  onGetProjectDetail,
  onUpdateProject,
} from 'redux/actions/ProjectManagement';
import {useDispatch} from 'react-redux';
import {dateTimeFormat} from 'shared/constants/AppConst';
import {checkValidateForm} from 'utils/FormUtils';
import dayjs from 'dayjs';
import {createImageJson} from 'utils/FileHelper';

const useProjectModal = (info: any, setIsOpen: (isOpen: boolean) => void) => {
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
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [projectDetail, setProjectDetail] = useState<any>(null);

  const handleSetModalInfo = (type: string) => {
    const types = {
      [ActionType.ADD]: {
        title: messages['common.addProject'] as string,
        submitText: messages['common.save'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.EDIT]: {
        title: (
          <AppTitleLable
            title={'common.editProject'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.edit'] as string,
        closeText: messages['common.cancel'] as string,
      },
      [ActionType.VIEW]: {
        title: (
          <AppTitleLable
            title={'common.viewDetailProject'}
            recordTitle={record?.code}
          />
        ),
        submitText: messages['common.close'] as string,
        closeText: '',
      },
    };
    setModalInfo(types[type]);
  };

  const handleSetValueForm = (record: any) => {
    if (!record) return;
    const fetchProjectDetails = async (projectCode: string) => {
      if (!projectCode) return;
      const res: any = (await dispatch(onGetProjectDetail(projectCode))) ?? {};
      let dataSource: any = [];
      if (res) {
        const fileAttachmentIds: Array<any> = [];
        if (type === ActionType.EDIT) {
          const newFileList: Array<any> = [];
          const fileAttachment: Array<any> = res?.fileAttachments ?? [];
          fileAttachment.map((item: any) => {
            const {id, url, fileName, extension, type} = item;
            newFileList?.push(
              createImageJson(id, url, fileName, extension, type),
            );
            fileAttachmentIds?.push({
              id: id,
            });
          });
          setFileList(newFileList);
        }
        res?.projectMembers?.forEach((item: any, index: any) => {
          dataSource.push({
            key: index,
            index: index,
            employee: item?.employee
              ? {
                  label: item?.employee?.name,
                  value: item?.employee?.code,
                }
              : null,
            position: item?.role
              ? {
                  label: item?.role?.name,
                  value: item?.role?.code,
                }
              : null,
            id: index + 1,
          });
        });
        setDataSource(dataSource);
        setProjectDetail(res);
        form.setFieldsValue({
          name: res?.name,
          workflow: res?.workflow?.code,
          description: res?.description,
          startDate: res?.startDate
            ? dayjs(res?.startDate, dateTimeFormat[1])
            : undefined,
          endDate: res?.endDate
            ? dayjs(res?.endDate, dateTimeFormat[1])
            : undefined,
          attachedFiles: fileAttachmentIds,
        });
      }
    };
    const projectCode = record?.code;
    fetchProjectDetails(projectCode);
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
        const {name, workflow, attachedFiles, startDate, endDate, description} =
          form.getFieldsValue();
        const workflowCode = workflow;
        const projectMembers: Array<any> = [];
        dataSource?.map((item: any) => {
          projectMembers.push({
            employee: item?.employee
              ? {
                  code: item?.employee?.value,
                }
              : null,
            role: item?.position
              ? {
                  code: item?.position?.value,
                }
              : null,
          });
        });

        const payload = {
          name: name,
          workflow: {
            code: workflowCode,
          },
          startDate: startDate ? startDate?.format(dateTimeFormat[1]) : null,
          endDate: endDate ? endDate?.format(dateTimeFormat[1]) : null,
          description: description,
          projectMembers: projectMembers,
          fileAttachments: attachedFiles,
        };
        const res: any = await dispatch(onCreateProject(payload));
        if (res) {
          action();
          handleRemoveState();
        }
        setLoading(false);
        break;
      }
      case ActionType.EDIT: {
        setLoading(true);
        const codeProject = record?.code;
        const {name, workflow, attachedFiles, startDate, endDate, description} =
          form.getFieldsValue();
        const workflowCode = workflow;
        const projectMembers: Array<any> = [];
        dataSource?.map((item: any) => {
          projectMembers.push({
            employee: item?.employee
              ? {
                  code: item?.employee?.value,
                }
              : null,
            role: item?.position
              ? {
                  code: item?.position?.value,
                }
              : null,
          });
        });

        const payload = {
          code: codeProject,
          name: name,
          workflow: {
            code: workflowCode,
          },
          startDate: startDate ? startDate?.format(dateTimeFormat[1]) : null,
          endDate: endDate ? endDate?.format(dateTimeFormat[1]) : null,
          description: description,
          projectMembers: projectMembers,
          fileAttachments: attachedFiles,
        };
        const res: any = await dispatch(onUpdateProject(payload));
        if (res) {
          action();
          handleRemoveState();
        }
        console.log('res', res);
        setLoading(false);
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
    setFileList([]);
    setIsOpen(false);
  };

  const handleCheckFormData = () => {
    const optionalFields = ['description', 'attachedFiles'];
    const isValid = checkValidateForm(form, optionalFields);
    if (!isValid) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  return {
    projectDetail,
    modalInfo,
    form,
    dataSource,
    setDataSource,
    handleSubmit,
    handleClose,
    loading,
    disabled,
    handleCheckFormData,
    fileList,
    setFileList,
  };
};

export default useProjectModal;
