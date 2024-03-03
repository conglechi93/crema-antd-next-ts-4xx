import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onAddEmployeeToDepartment} from 'redux/actions/Departments';

const useAddEmployeeModal = (
  info: any,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    if (dataSource?.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataSource]);
  const handleSubmit = async () => {
    const {record, action} = info;
    const departmentCode = record?.code;
    const employeeWorkSpaces: Array<any> = [];
    dataSource?.map((item: any) => {
      employeeWorkSpaces.push({
        employee: item?.employee
          ? {
              code: item?.employee?.value,
            }
          : null,
        position: item?.position
          ? {
              code: item?.position?.value,
            }
          : null,
      });
    });
    const payload = {
      departmentCode,
      employeeWorkSpaces,
    };
    const res: any = await dispatch(onAddEmployeeToDepartment(payload));
    if (res) {
      setIsOpen(false);
      setDataSource([]);
      action();
    }
  };

  const handleClose = () => {
    setDataSource([]);
    setIsOpen(false);
  };
  return {
    disabled,
    dataSource,
    setDataSource,
    handleSubmit,
    handleClose,
  };
};

export default useAddEmployeeModal;
