import {useState} from 'react';
import {AttachmentType} from 'shared/constants/AppVariables';
import {onUploadFile} from 'redux/actions/UploadCommon';
import {useDispatch} from 'react-redux';
import {FormInstance} from 'antd/lib';
import {pageSize} from 'shared/constants/AppConst';
import {createImageJson} from 'utils/FileHelper';

const useProjectAndUpdate = (
  form: FormInstance,
  info: any,
  fileList: any,
  setFileList: any,
) => {
  const dispatch = useDispatch();
  const [workflowCode, setWorkflowCode] = useState<Array<any>>([]);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });
  const [disableDragger, setDisableDragger] = useState(false);

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const type = AttachmentType.FILE_PROJECT;
    const res: any = await dispatch(onUploadFile(file, type));

    const {id} = res;
    if (id) {
      const {id, url, fileName, extention, type} = res;
      const newFile =
        createImageJson(id, url, fileName, extention, type) ?? null;
      const newFileList = [...fileList];
      if (newFile) newFileList?.push(newFile);
      setFileList(newFileList);
      const {attachedFiles} = form.getFieldsValue();
      const files: Array<any> = [
        ...(attachedFiles ?? []),
        {
          id: id,
        },
      ];
      form.setFieldValue('attachedFiles', files);

      onSuccess('ok');
      // setDisableDragger(true);
    } else {
      onError('error');
      // setDisableDragger(false);
    }
  };

  const handleRemoveFile = (file: any) => {
    setFileList((prevFileList) =>
      prevFileList?.filter((item: any) => item.uid !== file.uid),
    );
    setDisableDragger(false);
  };

  const handleChangeFile = (info: any) => {
    setFileList(info.fileList);
  };

  const handleChoosePickList = async (e: any) => {
    const workflowCode = e;
    setWorkflowCode(workflowCode);
  };
  return {
    handleRemoveFile,
    handleCustomRequest,
    handleChangeFile,
    fileList,
    searchParams,
    setSearchParams,
    disableDragger,
    handleChoosePickList,
    workflowCode,
    setWorkflowCode,
  };
};

export default useProjectAndUpdate;
