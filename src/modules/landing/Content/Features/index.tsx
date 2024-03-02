import React from 'react';
import Image from 'next/image';
import {
  StyledFeatures,
  StyledFeaturesDiv,
  StyledFeaturesImg,
  StyledFeaturesSection,
} from './index.styled';
import { Button } from 'antd';

const features = [
  {
    name: 'Documentation',
    img: '/assets/images/features/documentation.svg',
    description: 'Available our detailed document and top call support here.',
    but: 'Check Document',
    link: '/',
  },
  {
    name: 'GitHub',
    img: '/assets/images/features/git-hub.svg',
    description: 'Get latest feature, make pull request or bug fixes.',
    but: 'Join on GitHub',
    link: '/',
  },
  {
    name: 'Slack',
    img: '/assets/images/features/slack.svg',
    description:
      'Share your idea and insights, for inspiration collaboration and great result.',
    but: 'Join Our Community',
    link: '/',
  },
];
const Features = () => {
  return (
    <StyledFeaturesSection>
      <div>
        <h3
          style={{
            color: '#0090f1',
            fontWeight: 'bold',
          }}
        >
          Crema Theme
        </h3>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>
          Crema Theme is a great kick-starter
        </h2>
      </div>
      <StyledFeatures>
        {features.map((item) => (
          <StyledFeaturesDiv key={item.name}>
            <div
              style={{
                // color: '#757575',
                background: `url(/assets/images/features/bg.svg) no-repeat bottom center  `,
                // backgroundSize: '100% 100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
              }}
            >
              <StyledFeaturesImg
                src={item.img}
                alt={item.name}
                width={200}
                height={220}
                style={
                  {
                    // '& : hover': { transform: `rotate(15deg)` },
                  }
                }
              />
            </div>

            <h3
              style={{
                fontWeight: 'bold',
              }}
            >
              {item.name}
            </h3>
            <p style={{ color: '#757575' }}>{item.description}</p>
            <Button
              type='primary'
              style={{
                padding: '10px 30px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {item.but}
            </Button>
          </StyledFeaturesDiv>
        ))}
      </StyledFeatures>
    </StyledFeaturesSection>
  );
};

export default Features;
