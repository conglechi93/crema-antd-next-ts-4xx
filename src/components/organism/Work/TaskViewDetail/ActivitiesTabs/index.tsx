import IntlMessages from '@crema/utility/IntlMessages';
import {Tabs} from 'antd';
import React, {useState} from 'react';
import ContentTab1 from './ContentTab1';
import ContentTab2 from './ContentTab2';
import ContentTab3 from './ContentTab3';
import styles from './style.module.scss';

interface PropsTypes {
  record: any;
  fetchTaskDetails: (code: string) => Promise<void>;
  workFlowStatus: Array<any>;
}
const ActivitiesTabs = (props: PropsTypes) => {
  const {record, fetchTaskDetails, workFlowStatus} = props;
  const [activeValue, setActiveValue] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: string) => {
    setActiveValue(e);
  };
  return (
    <div className={styles.app_acties_tab}>
      <Tabs
        defaultActiveKey={activeValue}
        onChange={handleChange}
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab={<IntlMessages id='common.jobChild' />} key='1'>
          <ContentTab1
            record={record}
            activeValue={activeValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            fetchTaskDetails={fetchTaskDetails}
            workFlowStatus={workFlowStatus}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<IntlMessages id='common.discuss' />} key='2'>
          <ContentTab2 activeValue={activeValue} record={record} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<IntlMessages id='common.logWork' />} key='3'>
          <ContentTab3
            activeValue={activeValue}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            record={record}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ActivitiesTabs;
