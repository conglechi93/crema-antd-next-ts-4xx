import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import {Tabs} from 'antd';
import IntlMessages from '@crema/utility/IntlMessages';
import ContentTab1 from './ContentTab1';
import ContentTab2 from './ContentTab2';
import ContentTab3 from './ContentTab3';
import AppTag from 'components/atoms/AppTag';

type PropsTypes = {
  record?: any;
  viewerActiveValue: string;
};

const TransactionDetail = (props: PropsTypes) => {
  const {record, viewerActiveValue} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [keyValue, setKeyValue] = useState('1');

  const handleChange = (e: string) => {
    setKeyValue(e);
  };
  useEffect(() => {
    setKeyValue(viewerActiveValue);
  }, [viewerActiveValue]);

  return (
    <div className={styles.app_detail_program}>
      <Tabs
        defaultActiveKey={viewerActiveValue}
        onChange={handleChange}
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab={<IntlMessages id='common.inventoryInfo' />} key='1'>
          <ContentTab1
            record={record}
            keyValue={keyValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<IntlMessages id='common.salesProgram' />} key='2'>
          <ContentTab2
            record={record}
            keyValue={keyValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<IntlMessages id='common.personTrading' />} key='3'>
          <ContentTab3
            record={record}
            keyValue={keyValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
      </Tabs>
      <div className={styles.status_tab}>
        <AppTag
          color={`#${record?.status?.color}`}
          title={record?.status?.name}
        />
      </div>
    </div>
  );
};

export default TransactionDetail;
