import {useDispatch} from 'react-redux';
import {onExportFormByFormCode} from 'redux/actions/Form';
import {useState} from 'react';
import {onUploadCustomersFile} from 'redux/actions/Customer';
import {createImageJson} from 'utils/FileHelper';

const useStep1 = (
  setDisabled: (value: boolean) => void,
  setFormId: (value: string) => void,
) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [disableDragger, setDisableDragger] = useState(false);

  const handleExportExcel = async (): Promise<void> => {
    const formCode = 'BM2';
    if (!formCode) return;
    const res = await onExportFormByFormCode(formCode);
    if (res) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BieuMauVarsConnect.xlsx`);
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const res: any = await dispatch(onUploadCustomersFile(file));
    const {code} = res;
    if (code) {
      const newFileList: any = [file];
      setFileList(newFileList);

      setFormId(code);
      onSuccess('ok');
      setDisabled(false);
      setDisableDragger(true);
    } else {
      onError('error');
      setDisabled(true);
      setDisableDragger(false);
    }
  };

  const handleRemoveFile = (file: any) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item: any) => item.uid !== file.uid),
    );
    setDisableDragger(false);
    setDisabled(true);
    setFormId('');
  };

  const handleChangeFile = (info: any) => {
    // setFileList(info.fileList);
  };

  return {
    handleRemoveFile,
    handleExportExcel,
    handleCustomRequest,
    handleChangeFile,
    fileList,
    disableDragger,
  };
};

export default useStep1;
