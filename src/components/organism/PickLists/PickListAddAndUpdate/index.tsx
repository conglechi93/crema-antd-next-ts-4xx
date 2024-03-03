import {Col, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import AppTypo from 'components/atoms/AppTypo';
import React, {memo, useState} from 'react';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import styles from './style.module.scss';
import AppDragTable from 'components/molecules/AppDragTable';
import {FormInstance} from 'antd/lib';

type PropsTypes = {
  dataSource: any;
  setDataSource: (dataSource: any) => void;
  info: any;
  setIsOpen: (isOpen: boolean) => void;
  form: FormInstance;
  handleCheckFormData: () => void;
};

const PickListAddAndUpdate = (props: PropsTypes) => {
  const {
    info,
    setIsOpen,
    dataSource,
    setDataSource,
    form,
    handleCheckFormData,
  } = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const [count, setCount] = useState(1);

  const setFocus = () => {
    const lastTr: any = document?.getElementsByClassName('ant-modal-body')[0];
    lastTr?.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  const handleAdd = () => {
    const newData = {
      key: dataSource.length + 1,
      index: dataSource.length + 1,
      value: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setFocus();
  };

  return (
    <AppForm form={form} onFieldsChange={handleCheckFormData}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppFormItem
            id='name'
            name={'name'}
            label={frl('common.dataName')}
            rules={[{required: true, message: frm('common.dataName')}]}
          >
            <AppInput
              type='text'
              placeholder={messages['common.dataNameHint'] as string}
            />
          </AppFormItem>
        </Col>
        <Col xs={24}>
          <AppFormItem
            name={'description'}
            label={messages['common.description']}
          >
            <AppTextArea
              placeholder={messages['common.descriptionHint'] as string}
            />
          </AppFormItem>
        </Col>
        <Col xs={24}>
          <Row
            justify={'space-between'}
            align={'middle'}
            className={styles.row_title}
          >
            <Col xs={12} className='col-left'>
              <AppTypo variant='p-lg-semi'>
                {messages['common.dataTypeDetail'] as string}
              </AppTypo>
            </Col>
            <Col xs={12} className='col-right'>
              <AppButton type='primary' onClick={handleAdd}>
                Thêm giá trị
              </AppButton>
            </Col>
          </Row>
        </Col>
        <Col xs={24} className={styles.drap_table_content}>
          <AppDragTable dataSource={dataSource} setDataSource={setDataSource} />
        </Col>
      </Row>
    </AppForm>
  );
};

export default memo(PickListAddAndUpdate); // PickListAddAndUpdate;
