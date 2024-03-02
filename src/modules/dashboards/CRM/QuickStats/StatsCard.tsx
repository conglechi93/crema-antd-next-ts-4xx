import React from 'react';
import {
  StyledStatsAvatar,
  StyledStatsCard,
  StyledStatsContent,
  StyledStatsRow,
} from './index.styled';
import Image from 'next/image';

type StatsCardProps = {
  icon: string;
  bgColor?: string;
  heading: any;
  data: {
    count: string;
  };
};

const StatsCard: React.FC<StatsCardProps> = ({ icon, data, heading }) => {
  return (
    <StyledStatsCard className='card-hover'>
      <StyledStatsRow>
        <StyledStatsAvatar>
          <Image src={icon} alt='icon' width={63} height={63} />
        </StyledStatsAvatar>
        <StyledStatsContent>
          <h3>{data.count}</h3>
          <p>{heading}</p>
        </StyledStatsContent>
      </StyledStatsRow>
    </StyledStatsCard>
  );
};

export default StatsCard;
