import AppTypo from 'components/atoms/AppTypo';
import {Spin, Upload} from 'antd';
import type {UploadChangeParam} from 'antd/es/upload';
import type {UploadFile, UploadProps} from 'antd/es/upload/interface';
import {onRemoveFile, onUploadFile} from 'redux/actions/UploadCommon';
import {createImageJson, getFileExtension} from 'utils/FileHelper';
import styles from './style.module.scss';
import {useIntl} from 'react-intl';
import UploadIcon from 'assets/icon/download.png';
import RenderItemImage from '../RenderItemImage';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

interface AppDropZonesProps {
  placeholder?: string;
  fileList: Array<any>;
  setFileList: (fileList: any) => void;
  attachmentType: string;
  imageIds: Array<string>;
  setImageIds: (imageIds: any) => void;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  warningText?: string;
  multiple?: boolean;
  handleMoreCustomRequest?: (any) => void;
}

const AppDropZones = (props: AppDropZonesProps & UploadProps) => {
  const {
    placeholder,
    attachmentType,
    fileList,
    setFileList,
    imageIds,
    setImageIds,
    minLength = 1,
    maxLength = 20,
    required,
    multiple,
    handleMoreCustomRequest,
  } = props;
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);
    }
    const responses = info.fileList.map((file) => file.response || file);
    setFileList(responses.length > 0 ? responses : info.fileList);
  };

  const handleRemove = async (file: UploadFile) => {
    const {response} = file;
    const id: string = response?.uid;
    const res = await onRemoveFile(id);
    if (res) {
      const newImageIds = imageIds.filter((item) => item !== id);
      setImageIds(newImageIds);
    }
  };

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const res: any = await dispatch(onUploadFile(file, attachmentType));
    if (res) {
      const {id, fileName, mimeType, url} = res;
      const extention = getFileExtension(fileName);
      const typeUpload = attachmentType;
      const newFile = createImageJson(id, url, fileName, extention, typeUpload);
      const newImageIds = [...imageIds, id];
      handleMoreCustomRequest?.(newFile);
      setImageIds(newImageIds);
      onSuccess(newFile);
    } else {
      const error = new Error('Some error');
      onError({error});
    }
  };

  return (
    <>
      <Upload
        className={styles.app_drop_zone}
        {...props}
        listType='picture-card'
        showUploadList={{showPreviewIcon: false}}
        onChange={handleChange}
        onRemove={handleRemove}
        customRequest={handleCustomRequest}
        multiple={multiple}
        itemRender={(originNode, file: any, fileList, action) => {
          return <RenderItemImage file={file} action={action} />;
        }}
      >
        {loading ? (
          <Spin />
        ) : (
          <>
            {fileList.length <= maxLength && (
              <>
                <div>
                  <img src={UploadIcon.src} alt='' />
                  <AppTypo variant='p-md-reg'>{placeholder}</AppTypo>
                </div>
              </>
            )}
          </>
        )}
      </Upload>
      {required && fileList.length < minLength && (
        <p>{`Bạn cần tải lên ít nhất ${minLength} ảnh`}</p>
      )}
    </>
  );
};

export default AppDropZones;
