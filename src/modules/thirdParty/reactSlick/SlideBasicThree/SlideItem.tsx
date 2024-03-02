import React from 'react';
import {
  StyledHeading,
  StyledHeadingWrapper,
  StyledSlick3Wrapper,
  StyledSlide3ItemWrapper,
} from './index.styled';
import { SlideBasicType } from '@crema/types/models/thirdParty/reactSlick';
import Image from 'next/image';

type Props = {
  slide: SlideBasicType;
};

const SlideItem = ({ slide }: Props) => {
  return (
    <StyledSlide3ItemWrapper>
      <StyledSlick3Wrapper>
        <Image src={slide.srcImg} alt={slide.title} width={678} height={414} />
      </StyledSlick3Wrapper>
      <StyledHeadingWrapper>
        <StyledHeading level={5}>{slide.title}</StyledHeading>
      </StyledHeadingWrapper>
    </StyledSlide3ItemWrapper>
  );
};

export default SlideItem;
