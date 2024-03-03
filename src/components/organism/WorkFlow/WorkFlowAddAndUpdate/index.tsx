import {Col, Row} from 'antd';
import AppButton from 'components/atoms/AppButton';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import AppTypo from 'components/atoms/AppTypo';
import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import styles from './style.module.scss';
import AppDragTable from 'components/molecules/AppDragTable';
import {FormInstance} from 'antd/lib';

type PropsTypes = {
  form: FormInstance;
  dataSource: any;
  setDataSource: (dataSource: any) => void;
  info: any;
  setIsOpen: (isOpen: boolean) => void;
  handleFieldsChange: (e: any) => void;
};

const WorkFlowAddAndUpdate = (props: PropsTypes) => {
  const {form, dataSource, setDataSource, info, handleFieldsChange} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(dataSource?.length);
  }, [dataSource]);

  const handleAdd = () => {
    const newData = {
      key: count + 1,
      index: count + 1,
      value: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  return (
    <AppForm form={form} onFieldsChange={handleFieldsChange}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppFormItem
            name={'name'}
            label={frl('common.workflowName')}
            rules={[{required: true, message: frm('common.workflowName')}]}
          >
            <AppInput
              type='text'
              placeholder={messages['common.workflowNameHint'] as string}
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
                {messages['common.stageInformation'] as string}
              </AppTypo>
            </Col>
            <Col xs={12} className='col-right'>
              <AppButton
                type='primary'
                onClick={handleAdd}
                disabled={info?.record?.usedStatus?.code === '2'}
              >
                Thêm mới
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

export default WorkFlowAddAndUpdate;
