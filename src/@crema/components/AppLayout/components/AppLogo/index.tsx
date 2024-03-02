import React from 'react';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { StyledAppLogo } from './index.styled';
import Image from 'next/image';

type AppLogoProps = {
  hasSidebarColor?: boolean;
};
const AppLogo: React.FC<AppLogoProps> = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <Image
          src='/assets/images/logo-white-with-name.png'
          alt='crema-logo'
          width={110}
          height={36}
        />
      ) : (
        <Image
          src='/assets/images/logo-with-name.png'
          alt='crema-logo'
          width={110}
          height={36}
        />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;
