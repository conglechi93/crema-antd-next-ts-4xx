import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  onConfirmTransaction,
  onSearchInventoryTraders,
} from 'redux/actions/SalesTransactions';
import {onUploadFile} from 'redux/actions/UploadCommon';
import {AttachmentType} from 'shared/constants/AppVariables';
import {createImageJson} from 'utils/FileHelper';
import {checkValidateForm} from 'utils/FormUtils';

const useConfirmTransaction = (
  info: any,
  setInfo: (info: any) => void,
  setDisabled: (disabled: boolean) => void,
  setIsOpen: (open: boolean) => void,
) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState<any>({
    page: 1,
    pageSize: 10,
  });
  const [form] = Form.useForm();
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const [customerId, setCustomerId] = useState<string>('');
  const [disableDragger, setDisableDragger] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [customerOptions, setCustomerOptions] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);
  const optionalFields = ['file'];
  useEffect(() => {
    const fetchInventoryTraders = async () => {
      const salesProgramDetailCode = info?.code;
      if (!salesProgramDetailCode) return;
      const res: any = await dispatch(
        onSearchInventoryTraders(searchParams, salesProgramDetailCode),
      );
      const elements = res?.elements || [];
      const customerOptions = elements?.map((item: any, index: number) => ({
        label: item?.participant?.name,
        value: item.salesProgramTransactionCode,
      }));
      setCustomerOptions(customerOptions);
    };
    fetchInventoryTraders();
  }, [info]);

  const handleSubmit = async () => {
    const payload = {
      attachmentId: attachmentIds,
      customerId: customerId,
    };
    const res: any = await dispatch(onConfirmTransaction(payload));
    if (res) {
      setIsOpen(false);
      setInfo(null);
    }
  };
  const handleClose = async () => {
    form.resetFields();
    setIsOpen(false);
    setInfo(null);
    setFileList([]);
    setDisableDragger(false);
  };

  const handleFieldsChange = () => {
    const isValid = checkValidateForm(form, optionalFields);
    // console.log('isValid', 0isValid);
    setDisabled(!isValid);
  };

  const handleCustomRequest = async (options: any) => {
    const {onSuccess, onError, file, onProgress} = options;
    const type = AttachmentType.INVENTORY_GROUNDS_TRANSACTION;
    const res: any = await dispatch(onUploadFile(file, type));
    const {id} = res;
    if (id) {
      const {id, url, fileName, extention, type} = res;
      const newFile =
        createImageJson(id, url, fileName, extention, type) ?? null;
      const newFileList = [...fileList];
      if (newFile) newFileList.push(newFile);
      setFileList(newFileList);
      setAttachmentIds(id);
      onSuccess('ok');
      setDisabled(false);
      setDisableDragger(true);
    } else {
      onError('error');
      setDisabled(true);
      setDisableDragger(false);
    }
  };

  const handleChangeCustomer = (value: string) => {
    setCustomerId(value);
  };

  const handleRemoveFile = (file: any) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item: any) => item.uid !== file.uid),
    );
    setDisableDragger(false);
  };

  return {
    form,
    customerOptions,
    handleSubmit,
    handleClose,
    handleFieldsChange,
    handleCustomRequest,
    handleChangeCustomer,
    fileList,
    handleRemoveFile,
    disableDragger,
  };
};

export default useConfirmTransaction;
