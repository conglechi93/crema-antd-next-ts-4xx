import React from 'react';
import {
  StyledFlex,
  StyledSecondaryText,
  StyledTitle4,
  StyledWrapper,
} from './index.styled';
import { RecentPostType } from '@crema/types/models/extrapages/Blog';
import Image from 'next/image';

type Props = {
  recentPost: RecentPostType;
};

const RecentPostItem = ({ recentPost }: Props) => {
  return (
    <StyledFlex>
      <StyledWrapper>
        <Image
          src={`${recentPost.srcImg}`}
          alt='Recent Post'
          width={100}
          height={69}
        />
      </StyledWrapper>
      <div style={{ flex: 1 }}>
        <StyledTitle4>{recentPost.title}</StyledTitle4>
        <StyledSecondaryText>{recentPost.duration}</StyledSecondaryText>
      </div>
    </StyledFlex>
  );
};

export default RecentPostItem;
