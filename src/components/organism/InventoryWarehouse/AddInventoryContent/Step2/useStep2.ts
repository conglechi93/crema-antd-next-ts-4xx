import {loadState} from 'utils/LocalStore';
import {checkValidateForm} from 'utils/FormUtils';
import {FormInstance} from 'antd';
import {useEffect, useState} from 'react';
import {AttachmentType} from 'shared/constants/AppVariables';

const useStep2 = (
  info: any,
  form: FormInstance,
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void,
  setDisabled: (value: boolean) => void,
  current: number,
) => {
  const selectFields: any = [];
  const optionalFields = ['videoUrl'];
  const [thumbnailImages, setThumbnailImages] = useState<Array<any>>([]);
  const [inventoryImages, setInventoryImages] = useState<Array<any>>([]);

  useEffect(() => {
    const {draftString} = info;
    const dataSource: any = loadState(draftString);
    const submitFormData = dataSource?.submitFormData || {};
    if (Object.keys(submitFormData).length > 0) {
      form.setFieldsValue({
        videoUrl: submitFormData?.videoUrl,
      });

      const fileAttachments = submitFormData?.fileAttachments || [];

      const thumbnailImages: Array<Array<any>> =
        fileAttachments.filter(
          (item: any) => item?.typeUpload == AttachmentType.THUMBNAIL_INVENTORY,
        ) ?? [];
      setThumbnailImages(thumbnailImages);
      const inventoryImages = fileAttachments.filter(
        (item: any) => item?.typeUpload == AttachmentType.IMG_INVENTORY,
      );
      setInventoryImages(inventoryImages);
    }
    handleCheckFormData();
  }, [current]);

  const handleChangeFormData = (e: any) => {
    const fieldInfo = e[0];
    const {name, value} = fieldInfo;
    const data = [
      {
        key: name[0],
        value: selectFields.includes(name[0])
          ? {
              key: name[0],
              value: value,
            }
          : value,
      },
    ];
    handleSetFormData(data);
    handleCheckFormData();
  };

  const handleCheckFormData = () => {
    const isValidForm: boolean = checkValidateForm(form, optionalFields);
    if (!isValidForm) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  };

  const handleMoreCustomRequest = (file: any) => {
    const {draftString} = info;
    const dataSource: any = loadState(draftString);
    const submitFormData = dataSource?.submitFormData || {};
    const fileAttachments: Array<any> = submitFormData?.fileAttachments || [];
    fileAttachments.push(file);
    const data = [
      {
        key: 'fileAttachments',
        value: fileAttachments,
      },
    ];
    handleSetFormData(data);
  };
  return {
    thumbnailImages,
    setThumbnailImages,
    inventoryImages,
    setInventoryImages,
    handleChangeFormData,
    handleMoreCustomRequest,
  };
};

export default useStep2;
