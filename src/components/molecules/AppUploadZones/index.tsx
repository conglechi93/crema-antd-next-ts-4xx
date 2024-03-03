import AppTypo from 'components/atoms/AppTypo';
import {Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import type {UploadFile, UploadProps} from 'antd/es/upload/interface';
import {onRemoveFile} from 'redux/actions/UploadCommon';

interface AppUploadZonesProps {
  fileList: Array<any>;
  setFileList: (fileList: any) => void;
  type: string;
  imageIds: Array<string>;
  setImageIds: (imageIds: any) => void;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  warningText?: string;
  maxCount?: number;
  multiple?: boolean;
}

const AppUploadZones = (props: AppUploadZonesProps) => {
  const {
    type,
    fileList,
    setFileList,
    imageIds,
    setImageIds,
    minLength = 1,
    maxLength = 20,
    required,
    maxCount,
    multiple,
  } = props;

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    const responses = info.fileList.map((file) => file.response || file);
    setFileList(responses.length > 0 ? responses : info.fileList);
  };

  const handleRemove = async (file: UploadFile) => {
    const {response} = file;
    const id: string = response?.id;
    const res = await onRemoveFile(id);
    if (res) {
      const newImageIds = imageIds.filter((item) => item !== id);
      setImageIds(newImageIds);
    }
  };

  return (
    <div className=''>
      <Upload
        listType='picture-card'
        fileList={fileList}
        showUploadList={{showPreviewIcon: false}}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={maxCount}
        multiple={multiple}
      ></Upload>
      {required && fileList.length < minLength && (
        <p>{`Bạn cần tải lên ít nhất ${minLength} ảnh`}</p>
      )}
    </div>
  );
};

export default AppUploadZones;
