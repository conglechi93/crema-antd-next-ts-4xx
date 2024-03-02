import React from 'react';
import {
  StyledAnaInfoWidgetCard,
  StyledAnaInfoWidgetContent,
  StyledAnaInfoWidgetImg,
  StyledAnaInfoWidgetInfo,
} from './index.styled';

import type { InfoWidgetsType } from '@crema/types/models/dashboards/Analytics';
import Image from 'next/image';

type Props = {
  data: InfoWidgetsType;
};

const InfoWidget: React.FC<Props> = ({ data }) => {
  return (
    <StyledAnaInfoWidgetCard heightFull>
      <StyledAnaInfoWidgetInfo>
        <StyledAnaInfoWidgetImg>
          <Image src={data.icon} alt='icon' height={60} width={60} />
        </StyledAnaInfoWidgetImg>
        <StyledAnaInfoWidgetContent>
          <h3>{data.count}</h3>
          <p className='text-truncate'>{data.details}</p>
        </StyledAnaInfoWidgetContent>
      </StyledAnaInfoWidgetInfo>
    </StyledAnaInfoWidgetCard>
  );
};

export default InfoWidget;
