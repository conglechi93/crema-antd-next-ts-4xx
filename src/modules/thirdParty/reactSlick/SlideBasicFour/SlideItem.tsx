import React from 'react';
import {
  StyledAvatarWrapper,
  StyledHeading,
  StyledHeadingSmall,
  StyledHeadingWrapper,
  StyledSecData,
  StyledSlide4ImgWrapper,
  StyledSlide4ItemContainer,
  StyledSlide4ItemWrapper,
} from './index.styled';
import { Avatar, Typography } from 'antd';
import { SlideBasicFourType } from '@crema/types/models/thirdParty/reactSlick';
import Image from 'next/image';

type Props = {
  slide: SlideBasicFourType;
};

const SlideItem = ({ slide }: Props) => {
  return (
    <StyledSlide4ItemWrapper>
      <StyledSlide4ItemContainer>
        <StyledSlide4ImgWrapper>
          <Image src={slide.srcImg} alt='Art' width={339} height={330} />
        </StyledSlide4ImgWrapper>
      </StyledSlide4ItemContainer>
      <StyledHeadingWrapper>
        <StyledHeading level={5}>{slide.title}</StyledHeading>
        <StyledAvatarWrapper>
          <div style={{ marginRight: '14px' }}>
            <Avatar src={slide.avatar} alt={slide.avatarName} size={40} />
          </div>
          <div style={{ flex: 1 }}>
            <StyledHeadingSmall level={5}>
              {slide.avatarName}
            </StyledHeadingSmall>
            <StyledSecData>{slide.data}</StyledSecData>
          </div>
        </StyledAvatarWrapper>
        <Typography>{slide.description}</Typography>
      </StyledHeadingWrapper>
    </StyledSlide4ItemWrapper>
  );
};

export default SlideItem;
