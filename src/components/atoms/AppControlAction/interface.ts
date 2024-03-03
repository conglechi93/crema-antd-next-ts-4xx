export type AppControlActionProps = {
  variant:
    | 'view'
    | 'edit'
    | 'add'
    | 'import'
    | 'confirm'
    | 'approval'
    | 'pause'
    | 'open'
    | 'cancel'
    | 'delete';
  children?: React.ReactNode;
  style?: object;
};
