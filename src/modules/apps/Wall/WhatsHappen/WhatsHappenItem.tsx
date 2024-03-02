import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import {
  StyledWhatsHappenAction,
  StyledWhatsHappenBtn,
  StyledWhatsHappenItem,
  StyledWhatsHappenItemContent,
  StyledWhatsHappenSpecialText,
  StyledWhatsHappenSubTitle,
  StyledWhatsHappenThumb,
  StyledWhatsHappenTitle,
} from './index.styled';
import { WhatsHappenDataType } from '@crema/types/models/apps/Wall';
import Image from 'next/image';

type WhatsHappenProps = {
  data: WhatsHappenDataType;
};
const WhatsHappenItem: React.FC<WhatsHappenProps> = ({ data }) => {
  const { imgSrc, subTitle, title } = data;

  return (
    <StyledWhatsHappenItem className='item-hover'>
      <StyledWhatsHappenThumb>
        <Image src={`${imgSrc}`} alt='happen img' width={56} height={56} />
      </StyledWhatsHappenThumb>
      <StyledWhatsHappenItemContent>
        <StyledWhatsHappenSubTitle className='text-truncate'>
          {subTitle}
        </StyledWhatsHappenSubTitle>
        <StyledWhatsHappenTitle className='text-truncate'>
          {title}
        </StyledWhatsHappenTitle>
        <StyledWhatsHappenSpecialText className='text-truncate'>
          {data.tag.map((val) => (
            <span key={val.id}>#{val.name}</span>
          ))}
        </StyledWhatsHappenSpecialText>
      </StyledWhatsHappenItemContent>
      <StyledWhatsHappenAction>
        <StyledWhatsHappenBtn icon={<MoreOutlined />} />
      </StyledWhatsHappenAction>
    </StyledWhatsHappenItem>
  );
};

export default WhatsHappenItem;
