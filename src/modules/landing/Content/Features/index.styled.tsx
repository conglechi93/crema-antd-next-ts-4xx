import styled from 'styled-components';
import Image from 'next/image';

export const StyledFeaturesSection = styled('section')`
  max-width: 1370px;
  margin: auto;
  text-align: center;
  padding: 70px 0;
`;

export const StyledBannerH2 = styled('h2')`
  color: #fff;
  font-size: 30px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 16px;
  }
`;
export const StyledFeatures = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  font-size: 16px;
  padding: 30px 0;
`;
export const StyledFeaturesDiv = styled('div')`
  background-color: #fff;
  padding: 20px;
  cursor: pointer;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 18px;
  border-radius: 16px;
  margin: 20px;
  &: last-child img:hover {
    transform: rotate(-15deg);
  }
`;
export const StyledFeaturesImg = styled(Image)`
  &:hover {
    transform: rotate(15deg);
    transition: all 0.3s ease-in-out 0s;
  }
`;
