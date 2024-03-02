import React from 'react';
import {
  StyledActivityFlex,
  StyledImgWrapper,
  StyledText,
  StyledTextWrapper,
} from './index.styled';
import { Typography } from 'antd';
import type { ActivityType } from '@crema/types/models/dashboards/HealthCare';
import Image from 'next/image';

type Props = {
  activities: ActivityType;
};

const ActivitiesItem = ({ activities }: Props) => {
  return (
    <StyledActivityFlex>
      <StyledImgWrapper>
        <Image
          src={activities.srcImg}
          alt={activities.name}
          width={60}
          height={60}
        />
      </StyledImgWrapper>
      <StyledTextWrapper>
        <StyledText>{activities.name}</StyledText>
        <Typography.Text strong>{activities.value}</Typography.Text>
      </StyledTextWrapper>
    </StyledActivityFlex>
  );
};

export default ActivitiesItem;
