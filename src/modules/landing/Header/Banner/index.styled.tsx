import styled from 'styled-components';

export const StyledBannerContent = styled('div')`
  text-align: center;
  color: #fff;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    //font-size: 16px;
  }
`;
//export const StyledAppbar = styled('div)`
export const StyledBannerH1 = styled('h1')`
  color: #fff;
  margin: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 28px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 32px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 40px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 48px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    font-size: 54px;
    font-weight: 600;
  }
`;
export const StyledBannerH2 = styled('h2')`
  color: #fff;
  font-size: 30px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 16px;
  }
`;
export const StyledBannerFeatures = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  font-size: 16px;
  padding: 30px 0;
  flex-wrap: wrap;
`;
export const StyledBannerItems = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  gap: 20px;
  cursor: pointer;
  width: 280px;
  height: 250px;
  font-size: 18px;
  border-radius: 16px;

  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
export const StyledBannerImgDiv = styled('div')`
  background-color: #fff;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
