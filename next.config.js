/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_INITIAL_URL: '/project-management/inventory-warehouse',
    NEXT_PUBLIC_STATE_TYPE: 'context',
    NEXT_PUBLIC_FILESTACK_KEY: 'Ach6MsgoQHGK6tCaq5uJgz',
    NEXT_PUBLIC_LAYOUT: 'default',
    NEXT_PUBLIC_MULTILINGUAL: 'true',
    NEXT_PUBLIC_PRIMARY_COLOR: '#0A8FDC',
    NEXT_PUBLIC_SECONDARY_COLOR: '#F04F47',
    NEXT_PUBLIC_THEME_MODE: 'light',
    NEXT_PUBLIC_NAV_STYLE: 'default',
    NEXT_PUBLIC_LAYOUT_TYPE: 'full-width',
    BASE_URL: process.env.BASE_URL,
    BASE_SSO_URL: process.env.BASE_SSO_URL,
    REACT_APP_SSO_CLIENT_ID: process.env.REACT_APP_SSO_CLIENT_ID,
    REACT_APP_SSO_APP_CODE: process.env.REACT_APP_SSO_APP_CODE,
    REACT_APP_SSO_SERVER_URL: process.env.REACT_APP_SSO_SERVER_URL,
  },
};

module.exports = nextConfig;
