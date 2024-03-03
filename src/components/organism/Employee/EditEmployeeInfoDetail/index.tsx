import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import {Avatar, Col, DatePicker, Row, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import camera from 'assets/image/camera_upload.png';
import AppSelect from 'components/atoms/AppSelect';
import AddressForm from 'components/molecules/AddressForm';
import {AppState} from '@auth0/auth0-react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetDepartments} from 'redux/actions/Departments';
import {dateTimeFormat} from 'shared/constants/AppConst';
import Validators from 'shared/validators';
import {checkValidateForm} from 'utils/FormUtils';
import PositionDetailTable from '../PositionDetailTable';
import {any} from 'prop-types';
import {onUploadFile} from 'redux/actions/UploadCommon';
import {AttachmentType} from 'shared/constants/AppVariables';

type PropsTypes = {
  form;
  isLoading: boolean;
  dataEmployeeInfo: any;
  handleFieldsChange: () => void;
  workSpacesDatasource: any;
  setWorkSpacesDatasource: (workSpacesDatasource: any) => void;

  thumbnailAvatar: any;
  setThumbnailAvatar: (thumbnailAvatar: any) => void;
};

const EditEmployeeInfoDetail = (props: PropsTypes) => {
  const {
    form,
    isLoading,
    dataEmployeeInfo,
    handleFieldsChange,
    workSpacesDatasource,
    setWorkSpacesDatasource,

    setThumbnailAvatar,
    thumbnailAvatar,
  } = props;
  const dispatch = useDispatch();
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );

  const [labourContract, setLabourContract] = useState<
    Array<{label: string; value: string}>
  >([]);

  const [genderOptions, setGenderOptions] = useState<Array<any>>([]);

  const [fileList, setFileList] = useState<any[]>([]);

  const onUploadAvatar = async (item: any) => {
    if (item) {
      const image = item;
      const type = AttachmentType.AVATAR_CUSTOMER;
      const res: any = await dispatch(onUploadFile(image, type));
      if (res) {
        setThumbnailAvatar(res);
      }
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const options: Array<{label: string; value: string}> = [];
      const labourContract = categories?.labourContractEmployeeShopCat ?? [];
      labourContract?.map((item: any) => {
        options.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setLabourContract(options);
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchGender = async () => {
      const genderOptions: Array<any> = [];
      categories?.genderCat?.map((item: any) => {
        genderOptions?.push({
          label: item?.name,
          value: item?.code,
        });
      });
      setGenderOptions(genderOptions);
    };
    fetchGender();
  }, [categories]);

  console.log('thumbnailAvatar', thumbnailAvatar);

  const {messages} = useIntl();
  const {formatRequiredLabelId: frl, formatRequiredMessageId: frm} =
    useFormMessage();

  return (
    <Row gutter={[10, 8]} style={{marginBottom: '10px'}}>
      <Col xs={24} className={styles.col_upload}>
        <Avatar
          size={64}
          icon={
            <img
              src={
                thumbnailAvatar?.url ? thumbnailAvatar?.url : EmptyAvatar.src
              }
              alt=''
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
        >
          <Upload listType='picture-card' fileList={[]}>
            <img src={camera.src} alt='' />
          </Upload>
        </ImgCrop>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <AppFormItem name='name' label={messages['common.fullName']}>
                <AppInput
                  type='text'
                  placeholder={messages['common.fullName'] as string}
                  minLength={2}
                  maxLength={100}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name='phone'
                label={messages['common.phone']}
                rules={[
                  {
                    required: true,
                    message: frm('common.phone'),
                  },
                ]}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.phone'] as string}
                  minLength={2}
                  maxLength={100}
                  disabled
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name='email'
                label={messages['common.email']}
                rules={[
                  {
                    validator: (_, v) => {
                      if (v) return Validators.Email(v);
                    },
                    message: messages['validator.email'] as string,
                  },
                ]}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.email'] as string}
                  minLength={2}
                  maxLength={100}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name='gender'
                label={messages['common.gender'] as string}
              >
                <AppSelect
                  options={genderOptions}
                  placeholder={messages['common.genderHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name='birthday'
                label={messages['common.dateOfBirth']}
              >
                <DatePicker
                  format={dateTimeFormat[0]}
                  style={{width: '100%', height: '36px'}}
                  placeholder={messages['common.dateOfBirth'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24} md={12}>
              <AppFormItem
                name='labourContract'
                label={messages['common.labourContract'] as string}
              >
                <AppSelect
                  options={labourContract}
                  placeholder={messages['common.labourContractHint'] as string}
                />
              </AppFormItem>
            </Col>
            <AddressForm
              showStreet={true}
              xs={24}
              md={12}
              dataSource={dataEmployeeInfo}
              info={''}
              form={form}
            />
            <Col xs={24}>
              <PositionDetailTable
                dataSource={workSpacesDatasource}
                setDataSource={setWorkSpacesDatasource}
              />
            </Col>
          </Row>
        </AppForm>
      </Col>
    </Row>
  );
};

export default EditEmployeeInfoDetail;
