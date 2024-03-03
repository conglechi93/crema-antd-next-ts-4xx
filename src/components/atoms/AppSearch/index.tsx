import React from 'react';
import {Input} from 'antd';
import styles from './style.module.scss';
import {SearchProps} from 'antd/lib/input';
// import SearchImg from 'assets/icon/search.png';

type SearchCustomProps = {
  type?: 'string' | 'number';
};

const AppSearch = (props: SearchProps & SearchCustomProps) => {
  const {Search} = Input;
  return (
    <Search
      allowClear
      {...props}
      className={styles.app_search}
      // suffix={<img src={SearchImg.src} alt='' />}
    />
  );
};

export default AppSearch;
