import React from 'react';
import PropTypes from 'prop-types';
import AppAnimateGroup from '@crema/components/AppAnimateGroup';
import AppInfoView from '@crema/components/AppInfoView';
import {
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
} from './AuthWrapper.styled';
import AppLogo from '../../@crema/components/AppLayout/components/AppLogo';

export default function AuthLayout({ children }: any) {
  return (
    <AppAnimateGroup
      type='scale'
      animateStyle={{
        flex: 1,
      }}
      delay={0}
      interval={10}
      duration={200}
    >
      <StyledAuthWrap key={'wrap'}>
        <StyledAuthCard>
          <StyledAuthMainContent>
            <StyledAuthCardHeader>
              <AppLogo />
            </StyledAuthCardHeader>
            {children}
          </StyledAuthMainContent>
          <StyledAuthWellAction>
            <StyledAuthWelContent>
              <h2>Welcome to Crema!</h2>
              <p>
                Crema is purely based on Ant Design components and follows Ant
                Design guidelines.
              </p>
            </StyledAuthWelContent>
          </StyledAuthWellAction>
        </StyledAuthCard>
      </StyledAuthWrap>
      <AppInfoView />
    </AppAnimateGroup>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.node,
};
