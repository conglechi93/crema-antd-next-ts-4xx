'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppAnimate from '@crema/components/AppAnimate';
import AppPageMeta from '@crema/components/AppPageMeta';
import Logo from '../../../assets/icon/401.png';
import {
  StyledErrorButton,
  StyledErrorContainer,
  StyledErrorContent,
  StyledErrorImage,
  StyledErrorPara,
} from '../index.styled';
import Image from 'next/image';

const Error401 = () => {
  const router = useRouter();

  const onGoBackToHome = () => {
    router.back();
  };

  return (
    <>
      <AppPageMeta title='Unauthorized' />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledErrorContainer key='a'>
          <StyledErrorImage>
            <Image src={Logo} alt='Error-icon 1' width={400} height={400} />
          </StyledErrorImage>
          <StyledErrorContent>
            <h3>Unauthorized</h3>
            <StyledErrorPara>
              <p className='mb-0'>You are not authorized for this page!</p>
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

export default Error401;
