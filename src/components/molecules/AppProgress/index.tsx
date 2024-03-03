import {Steps} from 'antd';
import {memo} from 'react';
import {AppProgressProps} from './interface';
import styles from './style.module.scss';

const AppProgress = (props: AppProgressProps) => {
  const {items, current} = props;
  return (
    <div className={styles.app_progress_wrapper}>
      <Steps
        items={items}
        current={current}
        size='small'
        labelPlacement='vertical'
        responsive
        className={styles.app_progress}
      />
    </div>
  );
};

export default memo(AppProgress);
