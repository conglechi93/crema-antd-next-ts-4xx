import React from 'react';
import AppCard from '@crema/components/AppCard';
import { StyledOfcDesc, StyledTitle } from './index.styled';
import { OfficeCultureData } from '@crema/fakedb/extraPages';
import Image from 'next/image';

type OfficeCultureCardProps = {
  officeCulture: OfficeCultureData;
};

const OfficeCultureCard = ({ officeCulture }: OfficeCultureCardProps) => {
  return (
    <AppCard
      style={{ height: '100%' }}
      cover={
        <Image
          alt='OfficeCulture'
          src={officeCulture.srcImg}
          width={370}
          height={278}
        />
      }
    >
      <StyledTitle level={3}>{officeCulture.title}</StyledTitle>
      <StyledOfcDesc>{officeCulture.description}</StyledOfcDesc>
    </AppCard>
  );
};

export default OfficeCultureCard;
