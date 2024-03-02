'use client';
import React from 'react';
import PortfolioTabs from './PortfolioTabs';
import { portfolioData } from '@crema/fakedb/extraPages';

const PortFolioPage = () => {
  return <PortfolioTabs portfolio={portfolioData.portfolio} />;
};

export default PortFolioPage;
