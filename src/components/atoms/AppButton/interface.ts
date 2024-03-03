export type ButtonProps = {
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
