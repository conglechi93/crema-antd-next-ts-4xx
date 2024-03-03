import React from 'react';
import styles from './style.module.scss';
import {AppTypoProps} from './interface';

const AppTypo = (props: AppTypoProps) => {
  switch (props.variant) {
    case 'h1':
      return <h1 className={styles.h1}>{props.children}</h1>;
    case 'h2':
      return <h2 className={styles.h2}>{props.children}</h2>;
    case 'h3':
      return <h3 className={styles.h3}>{props.children}</h3>;
    case 'p-xl-semi':
      return (
        <p className={styles.p_xl_semi} style={props.style}>
          {props.children}
        </p>
      );
    case 'p-xl-med':
      return <p className={styles.p_xl_med}>{props.children}</p>;
    case 'p-xl-reg':
      return <p className={styles.p_xl_reg}>{props.children}</p>;
    case 'p-lg-semi':
      return <p className={styles.p_lg_semi}>{props.children}</p>;
    case 'p-lg-med':
      return <p className={styles.p_lg_med}>{props.children}</p>;
    case 'p-lg-reg':
      return <p className={styles.p_lg_reg}>{props.children}</p>;
    case 'p-md-semi':
      return <p className={styles.p_md_semi}>{props.children}</p>;
    case 'p-md-med':
      return <p className={styles.p_md_med}>{props.children}</p>;
    case 'p-md-reg':
      return <p className={styles.p_md_reg}>{props.children}</p>;
    case 'p-sm-semi':
      return <p className={styles.p_sm_semi}>{props.children}</p>;
    case 'p-sm-med':
      return <p className={styles.p_sm_med}>{props.children}</p>;
    case 'p-sm-reg':
      return <p className={styles.p_sm_reg}>{props.children}</p>;
    case 'span':
      return <span className={styles.span}>{props.children}</span>;
    case 'li':
      return <li className={styles.li}>{props.children}</li>;
    default:
      return null;
  }
};

export default AppTypo;
