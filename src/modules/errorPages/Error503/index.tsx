'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppAnimate from '@crema/components/AppAnimate';
import AppPageMeta from '@crema/components/AppPageMeta';
import Logo from '../../../assets/icon/503.png';
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImage,
  StyledErrorPara,
} from '../index.styled';
import Image from 'next/image';

const Error503 = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.back();
  };

  return (
    <>
      <AppPageMeta title='Server Error' />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledErrorContainer key='a'>
          <StyledErrorImage>
            <Image src={Logo} alt='Error 503' width={400} height={400} />
          </StyledErrorImage>
          <StyledErrorContent>
            <h3>
              <IntlMessages id='error.500Error' />.
            </h3>
            <StyledErrorPara>
              <p className='mb-0'>
                <IntlMessages id='error.500Message1' />
              </p>
              <p className='mb-0'>
                <IntlMessages id='error.500Message2' />
              </p>
            </StyledErrorPara>
            <StyledErrorButton type='primary' onClick={onGoBackToHome}>
              <IntlMessages id='error.goBackToHome' />
            </StyledErrorButton>
          </StyledErrorContent>
        </StyledErrorContainer>
      </AppAnimate>
    </>
  );
};

export default Error503;
