'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { initialUrl } from '@crema/constants/AppConst';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {
  StyledMenubar,
  StyledMenuIcon,
  StyledMenuItems,
  StyledNavbar,
  StyledNavbarDiv,
  StyledNavButton,
  StyledResponsiveMenubar,
} from './index.styled';
import { log } from 'util';

const menuItems = [
  {
    name: 'Community',
    link: '/',
  },
  {
    name: 'GitHub',
    link: '/',
  },
  {
    name: 'Docs',
    link: '/',
  },
];
const NavBar = ({ scrollTop }: any) => {
  // const [scrollTop, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthUser();
  // window.onscroll = () => {
  //   myFunction()
  // };

  // const myFunction = () => {
  //   console.log('scroll');
  //   if (window.scrollY > 5) {
  //     setScroll(true);
  //   } else {
  //     setScroll(false);
  //   }
  // };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <StyledNavbar
      id='navbar'
      style={{
        backgroundColor: scrollTop ? '#fff' : 'transparent',
        boxShadow: scrollTop
          ? 'rgba(43, 83, 135, 0.08) 0px 3px 8px 0px'
          : 'none',
        position: scrollTop ? 'fixed' : 'relative',
        top: scrollTop ? '0' : 'auto',
        left: scrollTop ? '0' : 'auto',
        padding: scrollTop ? '0' : ' 12px 60px',
      }}
    >
      <StyledNavbarDiv
        style={{
          padding: scrollTop ? '0 20px' : ' 30px 20px 16px;',
        }}
      >
        <div>
          <Image
            src={`${
              scrollTop
                ? '/assets/images/logo-with-name.png'
                : '/assets/images/logo-white-with-name.png'
            }`}
            alt='logo'
            width={130}
            height={42}
          />
        </div>
        <StyledMenubar>
          <StyledResponsiveMenubar>
            {menuItems.map((items) => (
              <StyledMenuItems
                className={scrollTop ? 'menu-item' : 'sticky-menu-item'}
                rel='stylesheet'
                href={items.link}
                key={items.name}
              >
                {items.name}
              </StyledMenuItems>
            ))}
          </StyledResponsiveMenubar>
          <StyledMenubar>
            <StyledNavButton
              href={isAuthenticated ? initialUrl : '/signin'}
              style={{
                backgroundColor: scrollTop ? '#0A8FDC' : 'red',
                color: '#fff',
              }}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
            </StyledNavButton>
            <StyledMenuIcon
              style={{
                color: scrollTop ? '#000' : '#fff',
                fontSize: '24px',
              }}
            >
              <MenuOutlined onClick={showDrawer} />
            </StyledMenuIcon>
          </StyledMenubar>
        </StyledMenubar>
      </StyledNavbarDiv>

      <Drawer
        // title={<MenuSharpIcon onClick={showDrawer} />}
        placement='right'
        closable={false}
        onClose={onClose}
        open={open}
        key='left'
        style={{ maxWidth: '420px', width: '100%', padding: '60px' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'left',
            gap: '50px',
            flexDirection: 'column',
            // padding: ' 60px',
          }}
        >
          {menuItems.map((items) => (
            <StyledMenuItems
              rel='stylesheet'
              href={items.link}
              key={items.name}
              onClick={onClose}
              onKeyDown={onClose}
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              {items.name}
            </StyledMenuItems>
          ))}
        </div>
      </Drawer>
    </StyledNavbar>
  );
};

export default NavBar;
