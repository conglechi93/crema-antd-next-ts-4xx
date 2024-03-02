import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledBirthdayCard,
  StyledBirthdayContent,
  StyledBirthdayHeader,
  StyledBirthThumb,
} from './index.styled';
import Image from 'next/image';

const BirthdayCard = () => {
  return (
    <StyledBirthdayCard heightFull className='no-card-space'>
      <StyledBirthdayHeader>
        <h3>Sunday, 07 July 1991</h3>
      </StyledBirthdayHeader>
      <StyledBirthdayContent>
        <StyledBirthThumb>
          <Image
            src={'/assets/images/cakeicon.png'}
            alt='cake'
            width={167}
            height={204}
          />
        </StyledBirthThumb>
        <p>
          <IntlMessages id='dashboard.antonBirthday' />
        </p>
      </StyledBirthdayContent>
    </StyledBirthdayCard>
  );
};

export default BirthdayCard;
