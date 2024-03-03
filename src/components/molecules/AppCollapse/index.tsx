import {Collapse} from 'antd';
import styles from './style.module.scss';

type CollapseProps = {
  items: Array<any>;
};

const AppCollapse = (props: CollapseProps) => {
  const {items} = props;
  const {Panel} = Collapse;
  const defaultActiveKey = items.map((item) => item.key);
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      className={styles.app_collapse}
      bordered={false}
    >
      {items?.map((item) => (
        <Panel key={item.key} header={item?.label}>
          {item?.children}
        </Panel>
      ))}
    </Collapse>
  );
};

export default AppCollapse;
