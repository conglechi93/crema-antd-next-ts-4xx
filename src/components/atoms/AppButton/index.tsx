import React from 'react';
import {Button} from 'antd';
import clsx from 'clsx';
import styles from './style.module.scss';
export type ButtonCustomProps = {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed';
  ghost?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};

const AppButton = (props: ButtonCustomProps) => {
  const {
    type,
    disabled,
    loading,
    ghost,
    href,
    icon,
    onClick,
    children,
    htmlType,
  } = props;
  return (
    <span className={styles.button_wrapper}>
      <Button
        {...props}
        type={type}
        className={clsx({
          [styles[type]]: true,
          [styles.disabled]: disabled,
          [styles.default]: true,
          [styles.ghost]: ghost,
        })}
        disabled={disabled}
        loading={loading}
        ghost={ghost}
        href={href}
        icon={icon}
        onClick={onClick}
        htmlType={htmlType}
      >
        {children}
      </Button>
    </span>
  );
};

export default AppButton;
