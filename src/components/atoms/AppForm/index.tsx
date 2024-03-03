import {Form, FormProps} from 'antd';

import styles from './style.module.scss';

interface AppFormProps extends FormProps {
  children: React.ReactNode;
}

const AppForm = ({children, ...props}: AppFormProps) => {
  return (
    <Form
      {...props}
      layout={props.layout ? props.layout : 'vertical'}
      className={styles.app_form}
    >
      {children}
    </Form>
  );
};

export default AppForm;
