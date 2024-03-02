import React from 'react';
import TabForm from './TabForm';
import { StyledBuyCellCard, StyledTabs } from './index.styled';
import { BuySellType } from '@crema/types/models/dashboards/Crypto';

type Props = {
  buySell: BuySellType;
};

const BuySell = ({ buySell }: Props) => {
  const items = [
    {
      key: '1',
      label: 'Buy',
      children: <TabForm coinList={buySell?.coinList} type='buy' />,
    }, // remember to pass the key prop
    {
      key: '2',
      label: 'Sell',
      children: <TabForm coinList={buySell?.coinList} type='sell' />,
    },
  ];
  return (
    <StyledBuyCellCard style={{ padding: 0 }} heightFull>
      <StyledTabs
        // centered
        defaultActiveKey='1'
        items={items}
      />
    </StyledBuyCellCard>
  );
};

export default BuySell;
