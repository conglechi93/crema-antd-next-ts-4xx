import React, {useState} from 'react';
import styles from './style.module.scss';
import {Tabs} from 'antd';
import IntlMessages from '@crema/utility/IntlMessages';
import ContentTab1 from './ContentTab1';
import ContentTab2 from './ContentTab2';
import AppTag from 'components/atoms/AppTag';

type PropsTypes = {
  record: any;
};

const EmployeeInfoDetail = (props: PropsTypes) => {
  const {record} = props;
  const [activeValue, setActiveValue] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: string) => {
    setActiveValue(e);
  };

  return (
    <div className={styles.app_detail_program}>
      <Tabs
        defaultActiveKey={activeValue}
        onChange={handleChange}
        destroyInactiveTabPane
      >
        <Tabs.TabPane
          tab={<IntlMessages id='common.generalInfomation' />}
          key='1'
        >
          <ContentTab1
            record={record}
            activeValue={activeValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<IntlMessages id='common.activityHistory' />}
          key='2'
        >
          <ContentTab2 record={record} activeValue={activeValue} />
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

export default EmployeeInfoDetail;
