import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledHollywoodAvatar,
  StyledHollywoodContent,
  StyledHollywoodContentAction,
  StyledHollywoodFooter,
  StyledHollywordCard,
} from './index.styled';
import Image from 'next/image';

const HollywoodMovie = () => {
  return (
    <StyledHollywordCard
      className='background-image'
      heightFull
      style={{
        backgroundImage: 'url(/assets/images/widgets/movie.png)',
      }}
    >
      <StyledHollywoodContent>
        <StyledHollywoodContentAction>
          <StyledHollywoodAvatar>
            <Image
              src={'/assets/images/playbutton.png'}
              alt='play'
              width={110}
              height={110}
            />
          </StyledHollywoodAvatar>
        </StyledHollywoodContentAction>
        <StyledHollywoodFooter>
          <h1>
            <IntlMessages id='dashboard.hollywoodMovie' />
          </h1>
        </StyledHollywoodFooter>
      </StyledHollywoodContent>
    </StyledHollywordCard>
  );
};

export default HollywoodMovie;
