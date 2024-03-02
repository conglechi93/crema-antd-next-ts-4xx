import React from 'react';
import Image from 'next/image';
import {
  StyledBannerContent,
  StyledBannerFeatures,
  StyledBannerH1,
  StyledBannerH2,
  StyledBannerImgDiv,
  StyledBannerItems,
} from './index.styled';
const bannerItems = [
  {
    name: 'Figma',
    img: '/assets/images/banner/figma-main-icon.svg',
    link: '/',
  },
  {
    name: 'Material UI',
    img: '/assets/images/banner/mui.png',
    link: '/',
  },
  {
    name: 'Ant Design + Styled Components',
    img: '/assets/images/banner/antd.svg',
    link: '/',
  },
];
const Banner = ({ scrollTop }: any) => {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#fff',
        padding: scrollTop ? '200px 0 100px' : '100px 0 ',
        maxWidth: '1370px',
        margin: 'auto',
      }}
    >
      <StyledBannerContent>
        <StyledBannerH1>Crema Theme</StyledBannerH1>
        <StyledBannerH2 style={{ fontSize: '30px' }}>
          Available with <span style={{ color: '#fff000' }}>MUI</span> and{' '}
          <span style={{ color: '#fff000' }}>Ant Design + 💅</span>
        </StyledBannerH2>
        <p style={{ fontSize: '24px', margin: '24px auto' }}>
          Crema is the perfect UI Kit to start your next project. It provides a
          clean and clear codebase.
        </p>
      </StyledBannerContent>
      <StyledBannerFeatures>
        {bannerItems.map((items) => (
          <StyledBannerItems key={items.name}>
            <StyledBannerImgDiv>
              <Image
                src={`${items.img}`}
                alt={items.name}
                width={40}
                height={40}
              />
            </StyledBannerImgDiv>

            <span>{items.name}</span>
          </StyledBannerItems>
        ))}
      </StyledBannerFeatures>
    </div>
  );
};

export default Banner;
