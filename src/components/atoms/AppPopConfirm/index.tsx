import React from 'react';
import {Popconfirm} from 'antd';
import AppButton from '../AppButton';
import {TooltipPlacement} from 'antd/es/tooltip';
import {PopconfirmProps} from 'antd/lib';
import AppTypo from '../AppTypo';
import styles from './style.module.scss';

type AppPopconfirmProps = {
  placement?: TooltipPlacement | undefined;
  icon?: React.ReactNode;
  openPop?: boolean;
  setOpenPop?: (openPop: boolean) => void;
};

const AppPopConfirm = (props: PopconfirmProps & AppPopconfirmProps) => {
  const {title, placement, icon, openPop, setOpenPop} = props;
  return (
    <div className={styles.app_pop_confirm}>
      <Popconfirm
        {...props}
        open={openPop}
        title={
          <>
            <AppTypo variant='p-xl-med'>{title}</AppTypo>
            <AppButton type='default' onClick={() => setOpenPop?.(false)}>
              <svg
                width='28'
                height='28'
                viewBox='0 0 28 28'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19.8334 8.1665L8.16675 19.8332'
                  stroke='#6C6868'
                  stroke-width='1.5'
                  stroke-linecap='round'
                />
                <path
                  d='M8.16675 8.1665L19.8334 19.8332'
                  stroke='#6C6868'
                  stroke-width='1.5'
                  stroke-linecap='round'
                />
              </svg>
            </AppButton>
          </>
        }
        placement={placement}
        icon={icon}
        okButtonProps={{
          style: {
            padding: '6px 16px',
            height: '36px',
            minWidth: '100px',
            borderRadius: '8px',
            fontWeight: '500',
            backgroundColor: '#D1132A',
            color: '#ffffff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        cancelButtonProps={{
          style: {
            padding: '6px 16px',
            height: '36px',
            minWidth: '100px',
            borderRadius: '8px',
            fontWeight: '500',
            borderColor: '#D1132A',
            color: '#D1132A',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <AppButton type='default' onClick={() => setOpenPop?.(!openPop)}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.8332 2.5H4.1665C2.98799 2.5 2.39874 2.5 2.03262 2.8435C1.6665 3.187 1.6665 3.73985 1.6665 4.84555V5.4204C1.6665 6.28527 1.6665 6.7177 1.88284 7.07618C2.09917 7.43466 2.4944 7.65715 3.28485 8.10212L5.71237 9.46865C6.24272 9.7672 6.5079 9.91648 6.69776 10.0813C7.09316 10.4246 7.33657 10.8279 7.44687 11.3226C7.49984 11.5602 7.49984 11.8382 7.49984 12.3941L7.49984 14.6187C7.49984 15.3766 7.49984 15.7556 7.70977 16.0511C7.91971 16.3465 8.29257 16.4923 9.0383 16.7838C10.6038 17.3958 11.3866 17.7018 11.9432 17.3537C12.4998 17.0055 12.4998 16.2099 12.4998 14.6187V12.3941C12.4998 11.8382 12.4998 11.5602 12.5528 11.3226C12.6631 10.8279 12.9065 10.4246 13.3019 10.0813C13.4918 9.91648 13.757 9.7672 14.2873 9.46865L16.7148 8.10212C17.5053 7.65715 17.9005 7.43466 18.1168 7.07618C18.3332 6.7177 18.3332 6.28527 18.3332 5.4204V4.84555C18.3332 3.73985 18.3332 3.187 17.9671 2.8435C17.6009 2.5 17.0117 2.5 15.8332 2.5Z'
              stroke='#D1132A'
              stroke-width='1.5'
            />
          </svg>
        </AppButton>
      </Popconfirm>
    </div>
  );
};

export default AppPopConfirm;
