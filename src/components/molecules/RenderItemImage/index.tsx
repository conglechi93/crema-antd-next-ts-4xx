import React from 'react';
import closeImg from 'assets/icon/CloseCircle.png';
import styles from './style.module.scss';
import AppButton from 'components/atoms/AppButton';
type PropsTypes = {
  file: any;
  action: any;
};
const RenderItemImage = (props: PropsTypes) => {
  const {file, action} = props;

  return (
    <div className={styles.item_image}>
      <AppButton
        type='default'
        onClick={() => {
          action.remove();
        }}
      >
        <img src={closeImg.src} alt='Xoá ảnh' />
      </AppButton>
      <img className={styles.image} src={file.url} alt='' />
    </div>
  );
};

export default RenderItemImage;
