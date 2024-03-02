'use client';
import React, { useState } from 'react';
import Content from './Content';
import Header from './Header';

const LandingPage = () => {
  const [scrollTop, setScrollTop] = useState(false);

  const handleScroll = (event: any) => {
    if (event.currentTarget.scrollTop >= 5 && scrollTop === false) {
      setScrollTop(true);
    } else if (event.currentTarget.scrollTop < 5 && scrollTop === true) {
      setScrollTop(false);
    }
  };
  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
      onScroll={handleScroll}
    >
      <Header scrollTop={scrollTop} />
      <Content />
    </div>
  );
};

export default LandingPage;
