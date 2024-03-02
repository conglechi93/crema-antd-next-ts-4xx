import React from 'react';
import NavBar from './Navbar';
import Banner from './Banner';
import { StyledHeader } from './index.styled';
const Header = ({ scrollTop }: any) => {
  return (
    <StyledHeader
      style={{
        background: `url(/assets/images/banner/header-background.png)`,
      }}
    >
      <NavBar scrollTop={scrollTop} />
      <Banner scrollTop={scrollTop} />
    </StyledHeader>
  );
};

export default Header;
