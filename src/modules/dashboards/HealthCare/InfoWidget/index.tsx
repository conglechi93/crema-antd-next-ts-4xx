import React from 'react';
import {
  StyledInfoWidgetCard,
  StyledInfoWidgetContent,
  StyledInfoWidgetInfo,
  StyledInfoWidgetThumb,
} from './index.styled';
import type { BloodCardType } from '@crema/types/models/dashboards/HealthCare';
import Image from 'next/image';

type InfoWidgetProps = {
  data: BloodCardType;
};

const InfoWidget: React.FC<InfoWidgetProps> = ({ data }) => {
  return (
    <StyledInfoWidgetCard heightFull className='card-hover'>
      <StyledInfoWidgetInfo>
        <StyledInfoWidgetThumb>
          <Image src={data.icon} alt='icon' height={60} width={60} />
        </StyledInfoWidgetThumb>
        <StyledInfoWidgetContent>
          <h3 className='text-truncate'>{data.name}</h3>
          <p style={{ color: data.color }}>{data.measurement}</p>
        </StyledInfoWidgetContent>
      </StyledInfoWidgetInfo>
    </StyledInfoWidgetCard>
  );
};

export default InfoWidget;
