import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Col, Row, Transfer} from 'antd';
import type {TransferDirection} from 'antd/es/transfer';

import {RecordType, TransferProps} from './interface';

import AddIcon from '../../../assets/icon/add.svg';
import RemoveIcon from '../../../assets/icon/remove.svg';

import styles from './style.module.scss';

const AppTransfer = (props: TransferProps) => {
  const {selected, dataSource} = props;
  const [targetKeys, setTargetKeys] = useState<string[]>(selected ?? []);

  const filterOption = (inputValue: string, option: RecordType) =>
    option.description.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
    props.getTargetValue(newTargetKeys);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {};

  const handleDelete = (item: RecordType) => {
    const newTargetKeys = targetKeys.filter((key) => key !== item.key);
    setTargetKeys(newTargetKeys);
    props.getTargetValue(newTargetKeys);
  };

  const handleSelect = (item: RecordType) => {
    const newTargetKeys = [...targetKeys, item.key];
    setTargetKeys(newTargetKeys);
    props.getTargetValue(newTargetKeys);
  };

  const renderSelectedItem = (item: RecordType) => {
    return (
      <Row
        justify={'space-between'}
        align={'middle'}
        wrap={false}
        gutter={[4, 0]}
      >
        <Col flex={'auto'} className='col-center one-line'>
          <span>{item.title}</span>
        </Col>
        <Col flex={'20px'} onClick={() => handleDelete(item)}>
          <Image src={RemoveIcon} width={20} height={20} alt='' />
        </Col>
      </Row>
    );
  };

  const renderUnselectedItem = (item: RecordType) => {
    return (
      <Row justify={'space-between'} align={'middle'} wrap={false}>
        <Col flex={'auto'} className='col-center text-overflow'>
          {item.title}
        </Col>
        <Col
          flex={'20px'}
          className='col-center'
          onClick={() => handleSelect(item)}
        >
          <Image src={AddIcon} width={20} height={20} alt='' />
        </Col>
      </Row>
    );
  };

  return (
    <Transfer
      dataSource={dataSource}
      showSearch
      filterOption={filterOption}
      className={styles.app_transfer}
      targetKeys={targetKeys}
      onChange={handleChange}
      onSearch={handleSearch}
      render={(item) => {
        return !item.disabled
          ? targetKeys.includes(item.key)
            ? renderSelectedItem(item)
            : renderUnselectedItem(item)
          : item.title;
      }}
      listStyle={{
        width: 300,
        height: 300,
      }}
      operations={['Thêm >>', '<< Xóa']}
    />
  );
};

export default AppTransfer;
