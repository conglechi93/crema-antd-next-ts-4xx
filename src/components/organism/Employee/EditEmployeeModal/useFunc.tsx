import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetDetailEmployee, onUpdateEmployee} from 'redux/actions/Employees';
import dayjs from 'dayjs';
import {dateTimeFormat} from 'shared/constants/AppConst';
import {checkValidateForm} from 'utils/FormUtils';
const useEmployeeInfoEdit = (
  info: any,
  isOpen: boolean,
  setIsOpen: (disabled: boolean) => void,
) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [dataEmployeeInfo, setDataEmployeeInfo] = useState<any>(null);
  const [workSpacesDatasource, setWorkSpacesDatasource] = useState<Array<any>>(
    [],
  );
  const [thumbnailAvatar, setThumbnailAvatar] = useState<any>(null);

  const handleFillDataFormItem = (data: any) => {
    if (data?.fileAttachments) {
      setThumbnailAvatar(data?.fileAttachments[0]);
    } else {
      setThumbnailAvatar(null);
    }
    const department: Array<any> = [];
    const position: Array<any> = [];
    data?.department?.forEach((item: any) => {
      department.push(item?.code);
    });
    data?.position?.forEach((item: any) => {
      position.push(item?.code);
    });
    form.setFieldsValue({
      name: data?.name ? data?.name : '',
      phone: data?.phone ? data?.phone : '',
      email: data?.email ? data?.email : '',
      gender: data?.gender ? data?.gender?.code : undefined,
      birthday: data?.birthday
        ? dayjs(data?.birthday, dateTimeFormat[0])
        : undefined,
      department: department && department.length > 0 ? department : undefined,
      province: data?.province?.code ? data?.province?.code : undefined,
      district: data?.district?.code ? data?.district?.code : undefined,
      wards: data?.wards?.code ? data?.wards?.code : undefined,
      street: data?.street ? data?.street : '',
      labourContract: data?.labourContract?.code
        ? data?.labourContract?.code
        : undefined,
      position: position && position.length > 0 ? position : undefined,
    });

    const workSpaces: Array<any> = data?.workSpaces ?? [];
    const workSpacesDatasource: Array<any> = [];
    workSpaces.map((item: any, index: number) => {
      workSpacesDatasource.push({
        key: index,
        department: item?.department
          ? {
              label: item?.department?.name,
              value: item?.department?.code,
            }
          : null,
        position: item?.position
          ? {
              label: item?.position?.name,
              value: item?.position?.code,
            }
          : null,
      });
    });
    setWorkSpacesDatasource(workSpacesDatasource);
  };

  // Get Info Employee Detail
  useEffect(() => {
    if (isOpen) {
      const fetchEmployeeDetails = async (employeeCode: string) => {
        if (!employeeCode) return;
        setLoading(true);
        const res: any = await dispatch(onGetDetailEmployee(employeeCode));
        setLoading(false);
        if (res) {
          setDataEmployeeInfo(res);
          handleFillDataFormItem(res);
        }
      };
      const employeeCode = info?.record?.code;
      fetchEmployeeDetails(employeeCode);
    }
  }, [info, isOpen]);

  const handleSubmit = async () => {
    const code = info?.record?.code;
    const workSpaces: Array<any> = [];
    const fileAttachments: Array<any> = [];
    if (thumbnailAvatar) {
      fileAttachments?.push({
        id: thumbnailAvatar?.id,
      });
    }

    workSpacesDatasource?.map((item: any) => {
      if (item?.department && item?.position) {
        workSpaces.push({
          department: item?.department
            ? {
                code: item?.department?.value,
              }
            : null,
          position: item?.position
            ? {
                code: item?.position?.value,
              }
            : null,
        });
      }
    });
    const payload = {
      ...form.getFieldsValue(),
      code: code,
      workSpaces: workSpaces,
      fileAttachments: fileAttachments,
    };
    const res: any = await dispatch(onUpdateEmployee(payload));
    if (res) {
      setIsOpen(false);
      form.resetFields();
      setThumbnailAvatar(null);
      info.action();
    }
  };

  const optionalFields = [
    'name',
    'email',
    'gender',
    'gender',
    'birthday',
    'province',
    'district',
    'wards',
    'street',
    'laborContract',
    'position',
  ];

  const handleFieldsChange = () => {
    const isValid = checkValidateForm(form, optionalFields);
    setDisabled(false);
  };

  return {
    form,
    loading,
    disabled,
    dataEmployeeInfo,
    handleSubmit,
    handleFieldsChange,

    workSpacesDatasource,
    setWorkSpacesDatasource,

    thumbnailAvatar,
    setThumbnailAvatar,
  };
};

export default useEmployeeInfoEdit;
