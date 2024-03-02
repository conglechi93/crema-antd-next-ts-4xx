import React from 'react';
import AppCard from '@crema/components/AppCard';
import { useIntl } from 'react-intl';
import { List } from 'antd';
import {
  StyledBrowserCell,
  StyledBrowserContent,
  StyledBrowserThumb,
} from './index.styled';
import type { BrowserDataType } from '@crema/types/models/dashboards/Ecommerce';
import Image from 'next/image';

const BrowserCell = ({ item }: { item: BrowserDataType }) => {
  return (
    <StyledBrowserCell className='item-hover'>
      <StyledBrowserThumb>
        <Image alt='' src={item.icon} width={40} height={40} />
      </StyledBrowserThumb>

      <StyledBrowserContent>
        <h3>{item.name}</h3>
        <p>{item.value}</p>
      </StyledBrowserContent>
    </StyledBrowserCell>
  );
};

type BrowserProps = {
  browserData: BrowserDataType[];
};

const Browser: React.FC<BrowserProps> = ({ browserData }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      heightFull
      className='no-card-space-ltr-rtl'
      title={messages['eCommerce.browser'] as string}
    >
      <List
        dataSource={browserData}
        renderItem={(item, index) => <BrowserCell item={item} key={index} />}
      />
    </AppCard>
  );
};

export default Browser;
