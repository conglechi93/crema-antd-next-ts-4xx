// import AppProgress from '@/components/molecules/AppProgress'
import {useEffect, useState} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import styles from './style.module.scss';
import AppProgress from 'components/molecules/AppProgress';
import useImportInventoryContent from './useImportInventoryContent';

type PropsTypes = {
  info: any;
  current: number;
  setCurrent?: (value: number) => void;
  setDisabled: (value: boolean) => void;
  formId: string;
  setFormId: (value: string) => void;
};
const ImportInventoryContent = (props: PropsTypes) => {
  const {info, current, setDisabled, formId, setFormId} = props;

  const {items} = useImportInventoryContent();

  return (
    <div className={styles.import_inventory_content}>
      <AppProgress current={current} items={items} />
      {/* {
        {
          0: (
            <Step1
              info={info}
              setDisabled={setDisabled}
              setFormId={setFormId}
            />
          ),
          1: <Step2 info={info} formId={formId} setDisabled={setDisabled} />,
        }[current]
      } */}
      <div className={current === 0 ? 'block-display' : 'none-display'}>
        <Step1 info={info} setDisabled={setDisabled} setFormId={setFormId} />
      </div>
      <div className={current === 1 ? 'block-display' : 'none-display'}>
        <Step2 info={info} formId={formId} setDisabled={setDisabled} />
      </div>
    </div>
  );
};

export default ImportInventoryContent;
