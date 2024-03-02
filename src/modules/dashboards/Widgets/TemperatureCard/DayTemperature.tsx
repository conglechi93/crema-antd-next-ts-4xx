import React from 'react';
import { StyledDayTempItem } from './index.styled';
import type { TemperaturesType } from '@crema/types/models/dashboards/Widgets';
import Image from 'next/image';

type DayTemperatureProps = {
  day: TemperaturesType;
};

const DayTemperature: React.FC<DayTemperatureProps> = ({ day }) => {
  return (
    <StyledDayTempItem>
      <p>{day.day}</p>
      <span>
        <Image src={day.image} alt='weather' width={27} height={20} />
      </span>
    </StyledDayTempItem>
  );
};

export default DayTemperature;
