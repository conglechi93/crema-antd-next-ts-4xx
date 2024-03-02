import React from 'react';
import Logo from '../../../assets/icon/something-wrong.png';
import Image from 'next/image';

const ErrorIcon = () => {
  return <Image src={Logo} alt='' height={400} width={500} />;
};

export default ErrorIcon;
