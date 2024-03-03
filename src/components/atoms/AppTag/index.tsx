import {Tag} from 'antd';
import {TagProps} from './interface';
import styles from './style.module.scss';
import {hex2rgba} from 'shared/constants/AppVariables';

const AppTag = (props: TagProps) => {
  const {title, color} = props;

  return (
    <Tag
      color={hex2rgba(color, 0.12)}
      style={{color: color}}
      className={styles.app_tag}
    >
      <span className={styles.app_span}>{title}</span>
    </Tag>
  );
};

export default AppTag;
