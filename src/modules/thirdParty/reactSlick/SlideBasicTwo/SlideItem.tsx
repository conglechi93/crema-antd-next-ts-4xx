import React from 'react';
import {
  StyledHeading,
  StyledSlick2Wrapper,
  StyledSlide2ImgWrapper,
  StyledSlide2Item,
} from './index.styled';
import { StyledSlideTitleWrapper } from '../SlideBasicFive/index.styled';
import { Typography } from 'antd';
import { SlideBasicType } from '@crema/types/models/thirdParty/reactSlick';
import Image from 'next/image';

type Props = {
  slide: SlideBasicType;
};

const SlideItem = ({ slide }: Props) => {
  return (
    <StyledSlide2Item>
      <StyledSlick2Wrapper>
        <StyledSlide2ImgWrapper>
          <Image
            src={slide.srcImg}
            alt={slide.title}
            width={676}
            height={310}
          />
        </StyledSlide2ImgWrapper>
      </StyledSlick2Wrapper>
      <StyledSlideTitleWrapper>
        <StyledHeading level={5}>{slide.title}</StyledHeading>
        <Typography.Text>{slide.description}</Typography.Text>
      </StyledSlideTitleWrapper>
    </StyledSlide2Item>
  );
};

export default SlideItem;
