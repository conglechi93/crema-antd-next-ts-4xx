/* eslint-disable */

const Email = (string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const NumberOnly = (string) => {
  const regex = /^[0-9]*$/i;
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const PersonalId = (string) => {
  const regex = new RegExp(/(^(\d){9}$)|(^(\d){12}$)/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const PhoneNumber = (string) => {
  //const regex = r'(^((\+|)84)(3|5|7|8|9)([0-9]{8})$)|(^0(3|5|7|8|9)([0-9]{8})$)|(^(3|5|7|8|9)([0-9]{8})$)';
  // const regex = new RegExp(
  //   /(^((\+|)84)(3|5|7|8|9)([0-9]{8})$)|(^0(3|5|7|8|9)([0-9]{8})$)|(^(3|5|7|8|9)([0-9]{8})$)/,
  // );
  const regex = new RegExp(
    /^(0|((\+|)84))(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/gm,
  );
  return string
    ? regex.test(string)
      ? Promise.resolve()
      : Promise.reject()
    : Promise.resolve();
};

const Password = (string) => {
  const regex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
  );
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const Negative = (string) => {
  const regex = new RegExp(/^0*?[0-9]\d*$/);
  return regex.test(string);
};

const Positive = (string) => {
  const regex = new RegExp(/^(0|[1-9]\d*)(\.\d+)?$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const WholePositive = (string) => {
  const regex = new RegExp(/^(0|[1-9]\d*)$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const Alphabets = (string) => {
  const regex = new RegExp(/^[a-zA-Z]*$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const AlphabetsNumberSpace = (string) => {
  const regex = new RegExp(/^[a-zA-Z0-9 -]*$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const DataLength = (string, lengthRequire = 30) => {
  return string.length >= lengthRequire ? Promise.resolve() : Promise.reject();
};

const promiseState = (p) => {
  const t = {};
  return Promise.race([p, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected',
  );
};

// const Tax = (string) => {
//   const regex = new RegExp(/(^[0-9]{10}$)|(^[0-9]{10}-[0-9]{3}$)/);
//   return regex.test(string) ? Promise.resolve() : Promise.reject();
// };

const Tax = (taxCode) => {
  const regex = new RegExp(/^(0|[1-9]\d*)$/);
  const M1 = Number(taxCode[0]);
  const M2 = Number(taxCode[1]);
  const M3 = Number(taxCode[2]);
  const M4 = Number(taxCode[3]);
  const M5 = Number(taxCode[4]);
  const M6 = Number(taxCode[5]);
  const M7 = Number(taxCode[6]);
  const M8 = Number(taxCode[7]);
  const M9 = Number(taxCode[8]);
  const M10 = Number(taxCode[9]);
  if (taxCode.length === 11) {
    const M11 = taxCode[10];
    if (M11 !== '-') {
      return Promise.reject();
    }
  }

  if (taxCode.length === 12) {
    const M12 = taxCode[11];
    if (!regex.test(M12)) {
      return Promise.reject();
    }
  }

  if (taxCode.length === 13) {
    const M13 = taxCode[12];
    if (!regex.test(M13)) {
      return Promise.reject();
    }
  }
  if (taxCode.length === 14) {
    const M14 = taxCode[13];
    if (!regex.test(M14)) {
      return Promise.reject();
    }
  }

  const A1 = M1 * 31;
  const A2 = M2 * 29;
  const A3 = M3 * 23;
  const A4 = M4 * 19;
  const A5 = M5 * 17;
  const A6 = M6 * 13;
  const A7 = M7 * 7;
  const A8 = M8 * 5;
  const A9 = M9 * 3;

  const A = A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8 + A9;
  const B = A % 11;
  const C = 10 - B;

  if (!isNaN(M10) && !isNaN(C) && M10 === C) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

const URL = (string) => {
  // const regex = new RegExp(
  //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/,
  // );
  const regex = new RegExp(
    /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/\S*)?$/,
  );
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const Unicode = (string) => {
  const regex = new RegExp(/^[\x20-\x7E]*$/);
  return regex.test(string) ? Promise.resolve() : Promise.reject();
};

const CannotOnlySpaces = (string) => {
  const regex = new RegExp(/.*[^ ].*/);
  if (string.length) {
    return regex.test(string) ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};

const Smaller = (value, max) => {
  if (value > 0 && max >= 0) {
    return value <= max ? Promise.resolve() : Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const MoreThan = (value, min) => {
  if (value === 0) {
    return Promise.reject();
  }
  if (value && min) {
    return value >= min ? Promise.resolve() : Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const MinLength = (str: string, min: number) => {
  if (str && min) {
    return str.length > min ? Promise.resolve() : Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const MinValue = (value, min) => {
  if (value && min) {
    return value >= min ? Promise.resolve() : Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const MaxValue = (value, max) => {
  if (value && max) {
    return value <= max ? Promise.resolve() : Promise.reject();
  } else {
    return Promise.resolve();
  }
};

const Validators = {
  Email,
  CannotOnlySpaces,
  NumberOnly,
  PersonalId,
  PhoneNumber,
  Password,
  Negative,
  Positive,
  WholePositive,
  promiseState,
  Alphabets,
  AlphabetsNumberSpace,
  DataLength,
  Tax,
  URL,
  Unicode,
  Smaller,
  MoreThan,
  MinValue,
  MaxValue,
  MinLength,
  // TaxCode
};

export default Validators;
