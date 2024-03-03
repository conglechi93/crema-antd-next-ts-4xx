import {AppState} from '@auth0/auth0-react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onUploadFile} from 'redux/actions/UploadCommon';
import {pageSize} from 'shared/constants/AppConst';
import {AttachmentType} from 'shared/constants/AppVariables';
import {createImageJson} from 'utils/FileHelper';

const useCustomerAddAndUpdate = (
  info: any,
  handleSetFormData: (dataItems: Array<{key: string; value: any}>) => void,
  thumbnailAvatar: any,
  setThumbnailAvatar: any,
  fileList: Array<any>,
  setFileList: (fileList: any) => void,
) => {
  const dispatch = useDispatch();
  const {categories} = useSelector<AppState, AppState['category']>(
    ({category}) => category,
  );

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [customerGroupShopOptions, setCustomerGroupShopOptions] = useState([]);
  const [customerSourceShopOptions, setCustomerSourceShopOptions] = useState(
    [],
  );
  const [customerStatusShopOptions, setCustomerStatusShopOptions] = useState(
    [],
  );

  const [employeeSearchParams, setEmployeeSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    status: '1',
    isLoadMore: true,
  });

  const [tagSearchParams, setTagSearchParams] = useState({
    page: 1,
    pageSize: pageSize.LOAD_MORE,
    isLoadMore: true,
  });

  useEffect(() => {
    if (categories) {
      const customerGroupShopOptions = categories?.customerGroupShopCat?.map(
        (item: any) => ({
          label: item?.name,
          value: item?.code,
        }),
      );
      const customerSourceShopOptions = categories?.customerSourceShopCat?.map(
        (item: any) => ({
          label: item?.name,
          value: item?.code,
        }),
      );
      const customerStatusShopOptions = categories?.customerStatusShopCat?.map(
        (item: any) => ({
          label: item?.name,
          value: item?.code,
        }),
      );
      setCustomerGroupShopOptions(customerGroupShopOptions);
      setCustomerSourceShopOptions(customerSourceShopOptions);
      setCustomerStatusShopOptions(customerStatusShopOptions);
    }
  }, [categories]);

  const onUploadAvatar = async (item: any) => {
    if (item) {
      setLoadingUpload(true);
      const image = item;
      const type = AttachmentType.AVATAR_CUSTOMER;
      const res: any = await dispatch(onUploadFile(image, type));
      const {id} = res;
      const data = [
        {
          key: 'avatar',
          value: [id],
        },
      ];
      handleSetFormData(data);
      setThumbnailAvatar(res);
      setLoadingUpload(false);
    }
  };

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const type = AttachmentType.FILE_CUSTOMER;
    const res: any = await dispatch(onUploadFile(file, type));
    if (res) {
      const {id, url, fileName, extention, type} = res;
      const newFile =
        createImageJson(id, url, fileName, extention, type) ?? null;
      const fileAttachments = [...fileList];
      if (newFile) fileAttachments.push(newFile);
      const dataObject = [
        {
          key: 'fileAttachments',
          value: fileAttachments,
        },
      ];
      handleSetFormData(dataObject);
      setFileList(fileAttachments);
      onSuccess('ok');
    } else {
      onError('error');
    }
  };

  const handleRemoveFile = (file: any) => {
    const newFileList = fileList.filter((item: any) => item.uid !== file.uid);
    const data = [
      {
        key: 'fileAttachments',
        value: newFileList,
      },
    ];
    handleSetFormData(data);
    setFileList(newFileList);
  };

  const handleChangeFile = (info: any) => {
    // setFileList(info?.fileList);
  };

  return {
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
    fileList,
    onUploadAvatar,
    thumbnailAvatar,
  };
};

export default useCustomerAddAndUpdate;
