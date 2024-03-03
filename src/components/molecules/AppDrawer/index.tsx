import {Drawer} from 'antd';
import React from 'react';

type PropsTypes = {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  title?: string | React.ReactNode;
  children?: string | React.ReactNode;
  width?: string;
};

const AppDrawer = (props: PropsTypes) => {
  const {openDrawer, setOpenDrawer, title, children, width} = props;

  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <Drawer title={title} onClose={onClose} open={openDrawer} width={width}>
      {children}
    </Drawer>
  );
};

export default AppDrawer;
