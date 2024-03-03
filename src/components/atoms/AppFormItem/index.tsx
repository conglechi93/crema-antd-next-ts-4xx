import {Form} from 'antd';
import styles from './style.module.scss';
import {FormItemProps} from 'antd/lib';

type AppFormItemProps = {
  children?: React.ReactNode;
  label?: string | React.ReactNode;
};

const AppFormItem = (props: FormItemProps & AppFormItemProps) => {
  const {children, label} = props;
  return (
    <Form.Item {...props} className={styles.app_form_item} label={label}>
      {children}
    </Form.Item>
  );
};
export default AppFormItem;
