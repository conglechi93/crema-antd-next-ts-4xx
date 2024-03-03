import AppTypo from 'components/atoms/AppTypo';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import styles from './style.module.scss';
import UploadIcon from 'assets/icon/download.png';
import {useIntl} from 'react-intl';
import {DraggerProps} from 'antd/es/upload';

type PropsTypes = {
  handleRemoveFile?: (e: any) => void;
  handleCustomRequest: (info: any) => void;
  // handleChangeFile?: (e: any) => void;
  disabled?: boolean;
  maxCount?: number;
  fileList: Array<any>;
};
const AppDraggerUpload = (props: PropsTypes & DraggerProps) => {
  const {messages} = useIntl();
  const {
    handleRemoveFile,
    handleCustomRequest,
    // handleChangeFile,
    disabled,
    maxCount,
    fileList,
  } = props;

  return (
    <>
      <Dragger
        className={styles.app_dragger}
        maxCount={maxCount}
        onRemove={handleRemoveFile}
        customRequest={handleCustomRequest}
        // onChange={handleChangeFile}
        disabled={disabled}
        multiple
        fileList={fileList}
      >
        <img src={UploadIcon.src} alt='' />
        <AppTypo variant='p-md-reg'>
          {messages['common.noteDragFile'] as string}
        </AppTypo>
      </Dragger>
    </>
  );
};

export default AppDraggerUpload;
