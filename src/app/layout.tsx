'use client';
import * as React from 'react';
import { Inter } from 'next/font/google';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '@crema/core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import AppPageMeta from '@crema/components/AppPageMeta';
import InfoViewContextProvider from '@crema/context/AppContextProvider/InfoViewContextProvider';
import 'antd/dist/reset.css';
import 'simplebar-react/dist/simplebar.min.css';
import '../../public/styles/index.css';
import { GlobalStyles } from '@crema/core/theme/GlobalStyle';
import { Normalize } from 'styled-normalize';
import { RequestInterceptor } from '../api/RequestInterceptor';
import { Provider } from 'react-redux';
// import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import '../styles/all.scss';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: any) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Be Vietnam:wght@100;200;300;400;500;600&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <script
          async
          defer
          src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBtgCpqXBu7Mdl2bzhhHnutAroyEteQo9s&v=3.exp&libraries=geometry,drawing,places'
        />
      </head>
      <body>
        <AppContextProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppThemeProvider>
                <AppLocaleProvider>
                  <InfoViewContextProvider>
                    <RequestInterceptor>
                      <AppAuthProvider>
                        <AuthRoutes>
                          <AppPageMeta />
                          <GlobalStyles />
                          <Normalize />
                          {children}
                        </AuthRoutes>
                      </AppAuthProvider>
                    </RequestInterceptor>
                  </InfoViewContextProvider>
                </AppLocaleProvider>
              </AppThemeProvider>
            </PersistGate>
          </Provider>
        </AppContextProvider>
      </body>
    </html>
  );
}
