'use client';
import React, { useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import ReactCodeInput from 'react-code-input';
import { useIntl } from 'react-intl';
import AppPageMeta from '@crema/components/AppPageMeta';
import {
  StyledAuthReconContent,
  StyledConfirmBtn,
  StyledConfirmCodeInput,
  StyledConfirmContent,
} from '../AuthWrapper.styled';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useRouter } from 'next/navigation';
import { useAwsCognitoActions } from '@crema/services/auth/aws-cognito/AWSAuthProvider';

const ConfirmSignupAwsCognito = (props: any) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { confirmCognitoUserSignup } = useAwsCognitoActions();

  const router = useRouter();

  const [pin, setPin] = useState('');

  const { messages }: any = useIntl();

  const handleSubmit = () => {
    const { email } = props.location.state || {};

    if (email && pin.length === 6) {
      confirmCognitoUserSignup(email, pin);
    } else if (!email) {
      router.push('/signup');
      infoViewActionsContext.fetchError(
        messages['validation.tryAgain'] as string,
      );
    } else {
      infoViewActionsContext.fetchError(
        messages['validation.pinLength'] as string,
      );
    }
  };

  return (
    <>
      <AppPageMeta title='Confirm Signup' />
      <StyledAuthReconContent>
        <StyledConfirmContent>
          <p>
            <IntlMessages id='common.verificationMessage' />
          </p>
        </StyledConfirmContent>

        <StyledConfirmCodeInput>
          <ReactCodeInput
            name='password'
            type='password'
            value={pin}
            fields={6}
            onChange={(value) => setPin(value)}
            inputMode='numeric'
          />
        </StyledConfirmCodeInput>

        <StyledConfirmBtn type='primary' onClick={handleSubmit}>
          <IntlMessages id='common.submit' />
        </StyledConfirmBtn>
      </StyledAuthReconContent>
    </>
  );
};

export default ConfirmSignupAwsCognito;
