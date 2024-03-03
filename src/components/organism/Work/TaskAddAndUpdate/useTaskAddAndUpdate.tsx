import {FormInstance} from 'antd';
import {useEffect} from 'react';
import {createImageJson} from 'utils/FileHelper';

const useTaskAddAndUpdate = (
  form: FormInstance,
  record: any,
  setFileAttachments: (fileAttachments: any[]) => void,
) => {
  useEffect(() => {
    if (!record) return;
    form.setFieldsValue({
      name: record?.name ?? '',
    });
    const files: Array<any> = [];
    const fileAttachments: Array<any> = record?.fileAttachments ?? [];
    fileAttachments?.map((item: any) => {
      const {id, url, fileName, extention, type} = item;
      const newFile =
        createImageJson(id, url, fileName, extention, type) ?? null;
      if (newFile) files.push(newFile);
    });
    setFileAttachments(files);
  }, [record]);

  return {};
};
export default useTaskAddAndUpdate;
