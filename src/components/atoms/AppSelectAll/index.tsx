'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Select, SelectProps, Tag } from 'antd';

import styles from './style.module.scss';
import { FormInstance } from 'antd/lib';

const { Option } = Select;

type AppSelectAllProps = {
  form: FormInstance;
  initialValues?: string[];
  fieldName: string;
};

const AppSelectAll = (props: SelectProps & AppSelectAllProps) => {
  const { fieldName, form, initialValues, onChange, options } = props;
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: any,
  ): void => {
    if (onChange) {
      onChange(e, option);
    }
  };
  const [optionsCurrent, setStatusOptionsCurrent] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      setStatusOptionsCurrent(initialValues ?? []);
    }
  }, [initialValues]);
  const handleSelectStatus = (selected: any) => {
    const statusValue: any = [];
    const optionsMock = options ?? [];
    optionsMock?.map((item: any) => {
      statusValue.push(item.value);
    });
    if (selected === '') {
      form.setFieldsValue({
        [fieldName]: statusValue,
      });
      setStatusOptionsCurrent(statusValue);
    } else {
      if (optionsCurrent.length === optionsMock?.length - 2) {
        setStatusOptionsCurrent(statusValue);
        form.setFieldsValue({
          [fieldName]: statusValue,
        });
      } else {
        setStatusOptionsCurrent([...optionsCurrent, selected]);
        form.setFieldsValue({
          [fieldName]: [...optionsCurrent, selected],
        });
      }
    }
  };
  const handleDeselectStatus = (selected: any) => {
    if (selected === '') {
      form.setFieldsValue({
        [fieldName]: undefined,
      });
      setStatusOptionsCurrent([]);
    } else {
      if (optionsCurrent?.includes('')) {
        const values = optionsCurrent?.filter(
          (item) => item != selected && item !== '',
        );
        form.setFieldsValue({
          [fieldName]: values,
        });
        setStatusOptionsCurrent(values);
      } else {
        const value = optionsCurrent?.filter((item) => item !== selected);
        form.setFieldsValue({
          [fieldName]: value.length ? value : undefined,
        });
        setStatusOptionsCurrent(value);
      }
    }
  };
  const handleTagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const isHasAll = optionsCurrent && optionsCurrent?.includes('');
    let options: Array<string>;
    if (isHasAll) {
      options = optionsCurrent?.filter((item) => item === '');
    } else options = optionsCurrent?.filter((item) => item !== '');
    return (
      <>
        {options?.includes(value) && (
          <Tag
            color={'#bdbdbd'}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
          >
            {label}
          </Tag>
        )}
      </>
    );
  };
  const handleClear = () => {
    form.setFieldsValue({
      [fieldName]: undefined,
    });
    setStatusOptionsCurrent([]);
  };

  return (
    <Select
      style={{ width: '100%' }}
      allowClear
      showSearch
      className={styles.app_select}
      filterOption={(input: any, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      onClear={handleClear}
      onChange={handleChange}
      onSelect={handleSelectStatus}
      onDeselect={handleDeselectStatus}
      tagRender={handleTagRender}
      maxTagCount={'responsive'}
      {...props}
    >
      {options?.map((option) => {
        return (
          <Option
            key={option.value}
            value={option.value}
            label={option.label}
            id={option.id}
          >
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default AppSelectAll;
