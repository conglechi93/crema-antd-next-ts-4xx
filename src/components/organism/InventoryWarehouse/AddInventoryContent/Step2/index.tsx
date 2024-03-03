import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTypo from 'components/atoms/AppTypo';
import AppDropZones from 'components/molecules/AppDropZones';
import {AttachmentType} from 'shared/constants/AppVariables';
import {Col, Form, Row} from 'antd';
import {useState} from 'react';
import useStep2 from './useStep2';
import styles from './style.module.scss';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import Validators from 'shared/validators';
import ModalUploadUrl from '../ModalUploadUrl';
import IntlMessages from '@crema/utility/IntlMessages';
type PropsTypes = {
  info: any;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
  setDisabled: (value: boolean) => void;
  current: number;
};
const Step2 = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [form] = Form.useForm();
  const {info, setDisabled, handleSetFormData, current} = props;
  const [imageIds, setImageIds] = useState<any>([]);
  const [modalAddUrl, setModalAddUrl] = useState(false);
  const [isValidAddUrl, setIsValidAddUrl] = useState(false);
  const [modalAddUrlData, setModalAddUrlData] = useState({
    title: '',
    description: <></>,
    submitText: '',
    closeText: '',
  });

  const {
    thumbnailImages,
    setThumbnailImages,
    inventoryImages,
    setInventoryImages,
    handleChangeFormData,
    handleMoreCustomRequest,
  } = useStep2(info, form, handleSetFormData, setDisabled, current);
  // const handleModalUrl = () => {
  //   const modalUrl = {
  //     title: messages['common.addToUrl'] as string,
  //     description: (
  //       <>
  //         <AppFormItem
  //           name='addUrl'
  //           label={messages['common.enterUrl'] as string}
  //           rules={[
  //             {
  //               required: true,
  //               message: messages['common.ruleEnterUrl'] as string,
  //             },
  //           ]}
  //         >
  //           <AppInput type='text' placeholder='http://' />
  //         </AppFormItem>
  //       </>
  //     ),
  //     closeText: messages['common.cancel'] as string,
  //     submitText: messages['common.save'] as string,
  //   };
  //   setModalAddUrlData(modalUrl);
  //   setModalAddUrl(true);
  // };

  return (
    <div>
      <AppForm form={form} onFieldsChange={handleChangeFormData}>
        <Row gutter={[10, 10]} className={styles.app_step_2}>
          <Col span={24}>
            <AppTypo variant='p-md-med'>Hình ảnh</AppTypo>
            <ul style={{paddingLeft: '20px'}}>
              <AppTypo variant='li'>
                {messages['common.validUploadImage2'] as string}
              </AppTypo>
              <AppTypo variant='li'>
                {messages['common.validUploadImage1'] as string}
              </AppTypo>
              <AppTypo variant='li'>
                {messages['common.supportFile'] as string}
              </AppTypo>
            </ul>
          </Col>
          <Col xs={24} md={6} className={styles.drop_zone_top}>
            <AppDropZones
              fileList={thumbnailImages}
              setFileList={setThumbnailImages}
              imageIds={imageIds}
              setImageIds={setImageIds}
              attachmentType={AttachmentType.THUMBNAIL_INVENTORY}
              maxLength={1}
              maxCount={1}
              multiple={false}
              handleMoreCustomRequest={handleMoreCustomRequest}
              placeholder={
                messages['common.noteDragFileImageInventory'] as string
              }
            />
          </Col>
          <Col xs={24} md={18} className={styles.drop_zone_bottom}>
            <AppDropZones
              fileList={inventoryImages}
              setFileList={setInventoryImages}
              imageIds={imageIds}
              setImageIds={setImageIds}
              attachmentType={AttachmentType.IMG_INVENTORY}
              maxCount={20}
              multiple={true}
              handleMoreCustomRequest={handleMoreCustomRequest}
              placeholder={messages['common.noteDragFileInventory'] as string}
            />
          </Col>
          <Col xs={24}>
            <AppFormItem
              name='videoUrl'
              label='Video'
              extra={<IntlMessages id='common.enterLinkSocal' />}
              rules={[
                {
                  validator: (_, v) => {
                    if (v) return Validators.URL(v);
                  },
                  message: messages['validator.videoUrl'] as string,
                },
              ]}
            >
              <AppInput type='text' placeholder='Nhập link video' />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>

      {/* Modal Uoload Url */}
      <ModalUploadUrl
        modalAddUrl={modalAddUrl}
        setModalAddUrl={setModalAddUrl}
        isValidAddUrl={isValidAddUrl}
        modalAddUrlData={modalAddUrlData}
      />
    </div>
  );
};

export default Step2;
