'use client';
import React from 'react';
import { Col } from 'antd';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppRowContainer from '@crema/components/AppRowContainer';
import TotalBalance from './TotalBalance';
import Coins from './Coins';
import BuySell from './BuySell';
import TradingChart from './TradingChart';
import OrdersActivities from './OrdersActivities';
import TopStories from './TopStories';
import GainerLooser from './GainerLooser';
import ATCStatics from './ATCStatics';
import CardDetails from './CardDetails';
import QuickTransfer from './QuickTransfer';
import type { CryptoType } from '@crema/types/models/dashboards/Crypto';

const Crypto = () => {
  const [{ apiData: cryptoData, loading }] =
    useGetDataApi<any>('/dashboard/crypto');

  console.log('cryptoData: ', cryptoData, loading);
  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppRowContainer>
            <Col xs={24} md={10}>
              <TotalBalance totalBalanceData={cryptoData?.totalBalanceData} />
            </Col>
            <Col xs={24} md={14}>
              <Coins coinsData={cryptoData?.coinsData} />
            </Col>
            <Col xs={24} md={16} lg={18}>
              <TradingChart />
            </Col>
            <Col xs={24} md={8} lg={6}>
              <BuySell buySell={cryptoData?.buySell} />
            </Col>
            <Col xs={24} md={12} lg={16}>
              <OrdersActivities
                ordersActivities={cryptoData?.ordersActivities}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <TopStories stories={cryptoData?.stories} />
            </Col>
            <Col xs={24} md={12}>
              <GainerLooser data={cryptoData?.gainerLooser} />
            </Col>
            <Col xs={24} md={12}>
              <ATCStatics data={cryptoData?.atcStatics} />
            </Col>
            <Col xs={24} md={12}>
              <CardDetails cardDetails={cryptoData?.cardDetails} />
            </Col>
            <Col xs={24} md={12}>
              <QuickTransfer quickTransfer={cryptoData?.quickTransfer} />
            </Col>
          </AppRowContainer>
        </AppAnimate>
      )}
    </>
  );
};

export default Crypto;
