'use client';
import React from 'react';

import { Typography } from 'antd';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import { getAssetsUrl } from '@crema/helpers/UrlHelper';
import {
  StyledDurationWrapper,
  StyledFlexContainer,
  StyledFlexWrapper,
  StyledFlexSuccessContainer,
  StyledIconWrapper,
  StyledToggleContainer,
  StyledTitleWrapper,
} from '../index.styled';
import { StateDataType } from '@crema/types/models/dashboards/CRM';
import Image from 'next/image';

type Props = {
  data: StateDataType;
};
const StatsDirCard = ({ data }: Props) => {
  return (
    <AppCard className='card-hover no-card-space'>
      <StyledFlexWrapper>
        <StyledFlexContainer>
          <StyledIconWrapper
            style={{
              color: data.color,
              backgroundColor: data.color + '22',
            }}
          >
            {data?.icon ? (
              data.icon
            ) : (
              <Image
                src={getAssetsUrl(data.iconImg)}
                alt=''
                height={22}
                width={24}
              />
            )}
          </StyledIconWrapper>

          <div style={{ marginRight: 8, overflow: 'hidden' }}>
            <Typography.Title level={5}>{data.value}</Typography.Title>
            <StyledTitleWrapper>{data.name}</StyledTitleWrapper>
          </div>
        </StyledFlexContainer>
        <StyledToggleContainer>
          <StyledFlexSuccessContainer>
            {!data?.hidePercent && (
              <span style={{ marginRight: 4 }}>
                <Image
                  src={
                    data.percentageChange > 0
                      ? '/assets/images/dashboard/up-arrow.svg'
                      : '/assets/images/dashboard/down-arrow.svg'
                  }
                  alt='up-icon'
                  height={data.percentageChange > 0 ? 10 : 8}
                  width={data.percentageChange > 0 ? 10 : 8}
                />
              </span>
            )}
            <span
              style={{
                marginLeft: 1,
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                color: data.percentageChange > 0 ? '#11C15B' : '#F04F47',
              }}
            >
              {data.percentageChange > 0 ? '+' : ''}
              {data.percentageChange}%
            </span>
          </StyledFlexSuccessContainer>
          <StyledDurationWrapper>
            <span>{data.duration}</span>
          </StyledDurationWrapper>
        </StyledToggleContainer>
      </StyledFlexWrapper>
    </AppCard>
  );
};

export default StatsDirCard;
