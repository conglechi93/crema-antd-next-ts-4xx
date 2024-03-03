const isEmpty = (
  obj: any,
  optionalFields: string[] = ['page, pageSize'],
): boolean => {
  const objectProp = {...obj};
  for (const key of optionalFields) {
    delete objectProp[key];
  }
  return Object.values(objectProp).every((value: any) => {
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
    if (
      value === null ||
      value === undefined ||
      value === false ||
      value === ''
    ) {
      return true;
    }
    return false;
  });
};

const ObjectHelper = {isEmpty};

export default ObjectHelper;
