import React from 'react';
import PremiumBrandWrapper from './PremiumBrandWrapper';
import { StyledTitlewrapper2, StyledTitlewrapper5 } from './index.styled';
import type { PremiumBrandType } from '@crema/types/models/extrapages/Portfolio';
import Image from 'next/image';

type Props = {
  premiumBrand: PremiumBrandType;
};

const PremiumBrand = ({ premiumBrand }: Props) => {
  return (
    <PremiumBrandWrapper>
      <Image
        src={premiumBrand.srcImg}
        alt={premiumBrand.subTitle}
        width={1543}
        height={468}
        sizes='100vw'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <div className='premium-brand-content'>
        <StyledTitlewrapper5>{premiumBrand.subTitle}</StyledTitlewrapper5>
        <StyledTitlewrapper2>{premiumBrand.title}</StyledTitlewrapper2>
      </div>
    </PremiumBrandWrapper>
  );
};

export default PremiumBrand;
