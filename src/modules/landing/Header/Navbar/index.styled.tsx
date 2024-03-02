import styled from 'styled-components';
import { Button, Layout } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

export const StyledNavbar = styled(Header)`
  width: 100%;
  height: auto;
`;
export const StyledNavbarDiv = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  max-width: 1370px;
  margin: 0 auto;
  width: 100%;
`;
//export const StyledAppbar = styled('div)`
export const StyledMenubar = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const StyledResponsiveMenubar = styled('div')`
  display: flex;
  align-items: center;
  gap: 24px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`;
export const StyledMenuItems = styled(Link)`
  text-decoration: none;

  &.sticky-menu-item {
    color: #fff;
  }
  &.menu-item {
    color: #000;
  }

  &.menu-item:hover {
    color: red;
  }
  &.sticky-menu-item:hover {
    color: #fff000;
  }
  //&:hover {
  //  color: #fff000;
  //}
`;
export const StyledStickyMenu = styled(Link)`
  color: #000;
  text-decoration: none;

  &:hover {
    color: red !important;
  }
`;
export const StyledNavButton = styled(Button)`
  display: grid;
  place-items: center;
  border: none;
  color: #fff;
  //background-color: red !important;
`;
export const StyledMenuIcon = styled('span')`
  font-size: 32px;
  display: none;
  cursor: pointer;
  //background-color: red !important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: block;
  }
`;
