import {Breadcrumb} from 'antd';
import {useState} from 'react';
import styles from './style.module.scss';

type BreadcrumbProps = {
  separator?: string;
  items: Array<any>;
};

const AppBreadcrumb = (props: BreadcrumbProps) => {
  const {separator, items} = props;

  return (
    <Breadcrumb separator={separator} className={styles?.breadcrumb}>
      {items?.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? (
            <a href={item.href}>{item.title}</a>
          ) : (
            <span>{item.title}</span>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
