import React from 'react';
import { PickerInline } from 'filestack-react';
import { fileStackKey } from '@crema/constants/AppConst';

const options = { container: 'picker-container-1' };
const Inline = () => {
  return (
    <>
      <div id='picker-container-1' style={{ height: '500px' }}></div>
      <PickerInline pickerOptions={options} apikey={fileStackKey} />
    </>
  );
};

export default Inline;
