import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {Avatar, Button, Col, List, Row, Upload} from 'antd';
import {FormInstance} from 'antd/lib';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppSelect from 'components/atoms/AppSelect';
import AppTextArea from 'components/atoms/AppTextArea';
import RenderAtorms from 'components/molecules/RenderAtorms';
import {useIntl} from 'react-intl';
import useCustomerAddAndUpdate from './useFunc';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {onGetEmployees} from 'redux/actions/Employees';
import Validators from 'shared/validators';
import {onGetTags} from 'redux/actions/Tag';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import ImgCrop from 'antd-img-crop';
import camera from 'assets/image/camera_upload.png';
import styles from './style.module.scss';
import AppDraggerUpload from 'components/molecules/AppDraggerUpload';
import AppTypo from 'components/atoms/AppTypo';
import {useDispatch} from 'react-redux';
import imgExcel from 'assets/image/Excel.png';
import imgCheck from 'assets/image/Check.png';
import {ActionType} from 'shared/constants/AppVariables';

type PropsTypes = {
  form: FormInstance;
  handleFieldsChange: (e: any) => void;
  propertyList: Array<any>;
  provinceInfo: {code: string; formCode: string};
  setProvinceInfo: (value: any) => void;
  districtInfo: {code: string; formCode: string};
  setDistrictInfo: (value: any) => void;
  wardInfo: {code: string; formCode: string};
  setWardInfo: (value: any) => void;
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void;
  info: any;

  thumbnailAvatar: any;
  setThumbnailAvatar: any;
  fileList: any;
  setFileList: any;
};
const CustomerAddAndUpdate = (props: PropsTypes) => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {
    form,
    handleFieldsChange,
    propertyList,
    provinceInfo,
    setProvinceInfo,
    districtInfo,
    setDistrictInfo,
    wardInfo,
    setWardInfo,
    handleSetFormData,
    info,
    thumbnailAvatar,
    setThumbnailAvatar,
    fileList,
    setFileList,
  } = props;
  const {
    customerGroupShopOptions,
    customerSourceShopOptions,
    customerStatusShopOptions,

    employeeSearchParams,
    setEmployeeSearchParams,

    tagSearchParams,
    setTagSearchParams,

    handleChangeFile,
    handleRemoveFile,
    handleCustomRequest,
    onUploadAvatar,
  } = useCustomerAddAndUpdate(
    info,
    handleSetFormData,
    thumbnailAvatar,
    setThumbnailAvatar,
    fileList,
    setFileList,
  );
  return (
    <AppForm form={form} onFieldsChange={handleFieldsChange}>
      <Row gutter={[16, 16]} align={'middle'}>
        <Col xs={24} className={styles.col_upload}>
          <AppFormItem
            name='avatar'
            label={messages['common.representativeImage'] as string}
          >
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <AppTypo variant='p-md-reg'>
                  Chỉ tải ảnh PNG, JPG, hoặc JPEG với dung lượng tối đa 2MB
                </AppTypo>
              </Col>
              <Col xs={24}>
                <Avatar
                  size={64}
                  icon={
                    <img
                      src={
                        thumbnailAvatar ? thumbnailAvatar?.url : EmptyAvatar.src
                      }
                      alt='Tải ảnh lên'
                    />
                  }
                />
                <ImgCrop
                  rotationSlider
                  quality={1}
                  modalTitle='Chỉnh sửa'
                  modalClassName='avatar-img-crop'
                  onModalOk={onUploadAvatar}
                  showReset
                  resetText='Đặt lại'
                  modalOk='Xác nhận'
                  modalCancel='Hủy'
                >
                  <Upload listType='picture-card' fileList={[]}>
                    <img src={camera.src} alt='' />
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>
          </AppFormItem>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='name'
                label={frl('common.fullName')}
                rules={[{required: true, message: frm('common.fullName')}]}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.fullNameHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='phone'
                label={frl('common.phone')}
                rules={[
                  {required: true, message: frm('common.phone')},
                  {
                    validator: (_, v) => Validators.PhoneNumber(v),
                    message: messages['validator.phone'] as string,
                  },
                ]}
              >
                <AppInput
                  type='text'
                  disabled={info.type === ActionType.EDIT}
                  placeholder={messages['common.phoneHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='customerGroup'
                label={messages['common.customerGroup']}
              >
                <AppSelect
                  options={customerGroupShopOptions}
                  placeholder={messages['common.customerGroupHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='customerSource'
                label={messages['common.customerSource']}
              >
                <AppSelect
                  options={customerSourceShopOptions}
                  placeholder={messages['common.customerSourceHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem name='tags' label={messages['common.tags']}>
                <AppSelectLoadMore
                  searchParams={tagSearchParams}
                  setSearchParams={setTagSearchParams}
                  onGetOptions={onGetTags}
                  placeholder={messages['common.tagsHint'] as string}
                  mode='tags'
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='status'
                label={frl('common.status')}
                rules={[{required: true, message: frm('common.status')}]}
              >
                <AppSelect
                  options={customerStatusShopOptions}
                  placeholder={messages['common.statusHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} sm={12}>
              <AppFormItem
                name='staffInCharges'
                label={messages['common.staffInCharge']}
              >
                <AppSelectLoadMore
                  searchParams={employeeSearchParams}
                  setSearchParams={setEmployeeSearchParams}
                  onGetOptions={onGetEmployees}
                  mode='multiple'
                  placeholder={messages['common.staffInChargeHint'] as string}
                />
              </AppFormItem>
            </Col>
            <RenderAtorms
              dataSource={propertyList}
              provinceInfo={provinceInfo}
              setProvinceInfo={setProvinceInfo}
              districtInfo={districtInfo}
              setDistrictInfo={setDistrictInfo}
              wardInfo={wardInfo}
              setWardInfo={setWardInfo}
              responsiveCol={{xs: 24, sm: 12, md: 12, xl: 12}}
            />
          </Row>
        </Col>
        <AppFormItem
          name='fileAttachments'
          label={messages['common.attachedFiles']}
          style={{display: 'none'}}
        ></AppFormItem>
        <Col xs={24}>
          <Row gutter={[4, 4]}>
            <Col xs={24}>
              <AppTypo variant='p-md-semi'>
                {messages['common.attachedFiles']}
              </AppTypo>
            </Col>
            <Col xs={24}>
              <AppTypo variant='p-md-reg'>
                {messages['common.validUploadFileSize']}
              </AppTypo>
            </Col>
            <Col xs={24}>
              <AppDraggerUpload
                // handleChangeFile={handleChangeFile}
                handleCustomRequest={handleCustomRequest}
                handleRemoveFile={handleRemoveFile}
                fileList={fileList}
              />
              {fileList?.length > 0 && (
                <List
                  className={styles.fileList}
                  style={{marginTop: 16}}
                  size='small'
                  dataSource={fileList}
                  renderItem={(file: any) => (
                    <List.Item
                      actions={[
                        <Button
                          icon={
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M17.0832 5H2.9165'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M15.6946 7.08301L15.3113 12.8323C15.1638 15.0447 15.09 16.1509 14.3692 16.8253C13.6483 17.4997 12.5397 17.4997 10.3223 17.4997H9.67787C7.46054 17.4997 6.35187 17.4997 5.63103 16.8253C4.91019 16.1509 4.83644 15.0447 4.68895 12.8323L4.30566 7.08301'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M7.91675 9.16699L8.33342 13.3337'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M12.0834 9.16699L11.6667 13.3337'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M5.41675 5C5.46331 5 5.4866 5 5.50771 4.99947C6.19391 4.98208 6.79927 4.54576 7.03276 3.90027C7.03994 3.88041 7.04731 3.85832 7.06203 3.81415L7.14294 3.57143C7.212 3.36423 7.24654 3.26063 7.29234 3.17267C7.47509 2.82173 7.8132 2.57803 8.20392 2.51564C8.30186 2.5 8.41106 2.5 8.62947 2.5H11.3707C11.5891 2.5 11.6983 2.5 11.7962 2.51564C12.187 2.57803 12.5251 2.82173 12.7078 3.17267C12.7536 3.26063 12.7882 3.36423 12.8572 3.57143L12.9381 3.81415C12.9528 3.85826 12.9602 3.88042 12.9674 3.90027C13.2009 4.54576 13.8063 4.98208 14.4925 4.99947C14.5136 5 14.5368 5 14.5834 5'
                                stroke='#991A1A'
                                stroke-width='1.5'
                              />
                            </svg>
                          }
                          onClick={() => handleRemoveFile(file)}
                          type='link'
                          danger
                        ></Button>,
                      ]}
                    >
                      <Row gutter={[8, 8]} align={'middle'}>
                        <Col>
                          <img
                            style={{display: 'block'}}
                            src={imgExcel.src}
                            alt=''
                          />
                        </Col>
                        <Col>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <AppTypo variant='p-md-reg'>{file.name}</AppTypo>
                            <p>
                              <img
                                style={{display: 'block'}}
                                src={imgCheck.src}
                                alt=''
                              />
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppFormItem name='description' label={messages['common.notes']}>
            <AppTextArea placeholder={messages['common.notesHint'] as string} />
          </AppFormItem>
        </Col>
      </Row>
    </AppForm>
  );
};

export default CustomerAddAndUpdate;
