import React from 'react';
import {
  StyledSlide5Img,
  StyledSlide5ItemWrapper,
  StyledSlidePos,
  StyledSlidePosSpace,
  StyledSlideThumbnailWrapper,
  StyledSlideTitleWrapper,
} from './index.styled';
import { Typography } from 'antd';
import { StyledHeading } from '../SlideBasicTwo/index.styled';
import { SlideBasicType } from '@crema/types/models/thirdParty/reactSlick';
import Image from 'next/image';

type Props = {
  slide: SlideBasicType;
};
const SlideItem = ({ slide }: Props) => {
  return (
    <StyledSlidePos>
      <StyledSlidePosSpace>
        <StyledSlide5ItemWrapper>
          <StyledSlide5Img>
            <Image
              src={slide.srcImg}
              alt={slide.title}
              width={696}
              height={150}
            />
          </StyledSlide5Img>
        </StyledSlide5ItemWrapper>

        <StyledSlideThumbnailWrapper>
          <Image src={slide.srcImg} alt={slide.title} width={60} height={60} />
        </StyledSlideThumbnailWrapper>
      </StyledSlidePosSpace>
      <StyledSlideTitleWrapper>
        <StyledHeading level={5}>{slide.title}</StyledHeading>
        <Typography.Paragraph style={{ margin: 0 }}>
          {slide.description}
        </Typography.Paragraph>
      </StyledSlideTitleWrapper>
    </StyledSlidePos>
  );
};

export default SlideItem;
