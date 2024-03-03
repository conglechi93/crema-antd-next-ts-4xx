import {
  InlineEditableTextfield,
  InlineEditableTextfieldProps,
} from '@atlaskit/inline-edit';
import styles from './style.module.scss';
const AppInlineTextField = (props: InlineEditableTextfieldProps) => {
  return (
    <div className={styles.app_inline_textfield}>
      <InlineEditableTextfield {...props} />
    </div>
  );
};

export default AppInlineTextField;
