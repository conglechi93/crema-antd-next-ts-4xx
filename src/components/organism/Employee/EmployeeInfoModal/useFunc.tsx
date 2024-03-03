import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetDetailEmployee} from 'redux/actions/Employees';
const useEmployeeInfoModal = (
  record: any,
  isOpen: boolean,
  setIsOpen: (disabled: boolean) => void,
) => {
  // useEffect(() => {
  //   if (isOpen) {
  //     const fetchEmployeeDetails = async (employeeCode: string) => {
  //       if (!employeeCode) return;
  //       setLoadingInfo(true);
  //       const res: any = await dispatch(onGetDetailEmployee(employeeCode));
  //       setLoadingInfo(false);
  //       if (res) setDataEmployeeInfo(res);
  //     };
  //     const employeeCode = record?.code;
  //     fetchEmployeeDetails(employeeCode);
  //   }
  // }, [record, isOpen]);

  const handleSubmit = async () => {
    setIsOpen(false);
  };

  return {
    handleSubmit,
  };
};

export default useEmployeeInfoModal;
