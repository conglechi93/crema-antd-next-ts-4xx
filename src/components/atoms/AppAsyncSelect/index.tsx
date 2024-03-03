import {Select} from 'antd';
import {SelectProps} from 'antd/lib';
import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import {onGetPickListByCode} from 'redux/actions/PickList';
import {useDispatch} from 'react-redux';

const AppAsyncSelect = (props: SelectProps) => {
  const {Option} = Select;
  const dispatch = useDispatch();
  const {id} = props;
  const [options, setOptions] = useState<{value: string; label: string}[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const getOptions = async (pickLickCode: string) => {
      setLoading(true);
      const res: any = await dispatch(onGetPickListByCode(pickLickCode));
      const pickListOptions: {value: string; label: string}[] =
        res?.configPickListOptions || [];
      setOptions(pickListOptions);
      setLoading(false);
    };
    getOptions(id);
  }, [id]);
  return (
    <Select
      {...props}
      loading={loading}
      className={styles.app_select}
      showSearch
    >
      {options?.map((option: any) => {
        return (
          <Option key={option.code} value={option.code} label={option.name}>
            {option.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default AppAsyncSelect;
