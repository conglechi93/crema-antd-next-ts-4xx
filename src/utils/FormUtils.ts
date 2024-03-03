import {FormInstance} from 'antd';

export const checkValidateForm = (
  form: FormInstance,
  optionalFields: string[],
): boolean => {
  const currentFormData = form.getFieldsValue();
  if (Object.keys(currentFormData).length === 0) {
    return false;
  }
  const error = form.getFieldsError();
  const requiredFields =
    Object.keys(currentFormData).length - optionalFields.length;
  const defined = error.map((e: any) => {
    return e.errors[0] ?? undefined;
  });
  let hasData: string[] = [];
  Object.keys(currentFormData).forEach((key) => {
    if (!optionalFields.includes(key)) {
      currentFormData[key] && hasData.push(key);
    }
  });
  if (hasData.length === requiredFields) {
    if (defined.find((e: any) => e !== undefined)) {
      return false;
    }
    return true;
  }
  return false;
};

export const isNullOrUndefinedOrEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

export const addLeadingZeros = (num, totalLength) => {
  return String(num).padStart(totalLength, '0');
};

export const convertInputToNumber = (value) => {
  if (value) {
    const numberString = value.replace(/\D/g, '');
    return numberString;
  }
};
