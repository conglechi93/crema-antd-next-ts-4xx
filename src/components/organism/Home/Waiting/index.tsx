import {Col, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import React from 'react';
import styles from '../style.module.scss';
import IntlMessages from '@crema/utility/IntlMessages';
import AppWatingLoading from 'components/molecules/AppWatingLoading';
import AppButton from 'components/atoms/AppButton';
type WaitingProps = {
  isPreLoading?: boolean;
};
const Waiting = (props: WaitingProps) => {
  const {isPreLoading} = props;

  return (
    <div className={styles.box_wating}>
      <AppWatingLoading
        content={
          <>
            <Col xs={{span: 24}}>
              <AppTypo variant='p-xl-semi'>
                <IntlMessages id='common.welcomeVARs' />
              </AppTypo>
            </Col>
            <Col xs={{span: 24}}>
              <AppTypo variant='p-md-reg'>
                {isPreLoading ? (
                  <IntlMessages id='common.loadingText' />
                ) : (
                  <IntlMessages id='common.loadingTextFail' />
                )}
              </AppTypo>
            </Col>
            <Col xs={{span: 24}}>
              {isPreLoading ? (
                <div className='loading-dots'>
                  <div className='loading-dot'></div>
                  <div className='loading-dot'></div>
                  <div className='loading-dot'></div>
                </div>
              ) : (
                <AppButton type='primary'>Thử lại</AppButton>
              )}
            </Col>
          </>
        }
      />
    </div>
  );
};

export default Waiting;
