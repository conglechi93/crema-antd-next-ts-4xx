import {Button, Col, DatePicker, List, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTextArea from 'components/atoms/AppTextArea';
import AppTypo from 'components/atoms/AppTypo';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import styles from './style.module.scss';
import CalendarImg from 'assets/icon/Calendar.png';
import AppDraggerUpload from 'components/molecules/AppDraggerUpload';
import {FormInstance} from 'antd/lib';
import {dateTimeFormat} from 'shared/constants/AppConst';
import useProjectAndUpdate from './useProjectAndUpdate';
import imgExcel from 'assets/image/Excel.png';
import imgCheck from 'assets/image/Check.png';
import EmployeeSelectTable from 'components/organism/Department/EmployeeSelectTable';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {onSearchWorkflow} from 'redux/actions/Workflow';

type PropsTypes = {
  form: FormInstance;
  info: any;
  dataSource: any;
  setDataSource: (dataSource: any) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleFieldsChange: (e: any) => void;
  setFileList: any;
  fileList: any;
};

const ProjectAddAndUpdate = (props: PropsTypes) => {
  const {form, info, handleFieldsChange, fileList, setFileList} = props;
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {dataSource, setDataSource} = props;
  const {
    handleRemoveFile,
    handleCustomRequest,
    handleChangeFile,
    disableDragger,
    searchParams,
    setSearchParams,
    handleChoosePickList,
  } = useProjectAndUpdate(form, info, fileList, setFileList);

  return (
    <AppForm form={form} onFieldsChange={handleFieldsChange}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            {messages['common.generalInfomation'] as string}
          </AppTypo>
        </Col>
        <Col xs={24} md={12}>
          <AppFormItem
            name={'name'}
            label={frl('common.nameProject')}
            rules={[{required: true, message: frm('common.nameProject')}]}
          >
            <AppInput
              type='text'
              placeholder={messages['common.nameProjectHint'] as string}
            />
          </AppFormItem>
        </Col>
        <Col xs={24} md={12}>
          <AppFormItem
            name={'workflow'}
            label={frl('common.workFlow')}
            rules={[{required: true, message: frm('common.workFlow')}]}
          >
            <AppSelectLoadMore
              // disabled={disabled}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onGetOptions={onSearchWorkflow}
              placeholder={messages['common.workFlowHint'] as string}
              onChange={handleChoosePickList}
            />
          </AppFormItem>
        </Col>
        <Col xs={24} md={12}>
          <AppFormItem
            name='startDate'
            label={frl('common.startDate')}
            rules={[{required: true, message: frm('common.startDate')}]}
          >
            <DatePicker
              showTime
              format={dateTimeFormat[1]}
              style={{width: '100%', height: '36px'}}
              placeholder={dateTimeFormat[1].toLocaleLowerCase()}
              suffixIcon={<img src={CalendarImg.src} alt='' />}
              showNow={false}
            />
          </AppFormItem>
        </Col>
        <Col xs={24} md={12}>
          <AppFormItem
            name='endDate'
            label={frl('common.endDate')}
            rules={[{required: true, message: frm('common.endDate')}]}
          >
            <DatePicker
              showTime
              format={dateTimeFormat[1]}
              style={{width: '100%', height: '36px'}}
              placeholder={dateTimeFormat[1].toLocaleLowerCase()}
              suffixIcon={<img src={CalendarImg.src} alt='' />}
              showNow={false}
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
          <Row gutter={[8, 8]} className={styles.attachedFiles}>
            <Col xs={24}>
              <AppFormItem
                name={'attachedFiles'}
                label={messages['common.attachedFiles']}
              >
                <Col xs={24} style={{marginBottom: '10px'}}>
                  <AppTypo variant='p-md-reg'>
                    {messages['common.attachedFilesHint']}
                  </AppTypo>
                </Col>
                <AppDraggerUpload
                  disabled={disableDragger}
                  // handleChangeFile={handleChangeFile}
                  handleRemoveFile={handleRemoveFile}
                  handleCustomRequest={handleCustomRequest}
                  fileList={fileList}
                  multiple
                />
              </AppFormItem>
              {fileList.length > 0 && (
                <List
                  style={{marginTop: 16}}
                  size='small'
                  bordered
                  dataSource={fileList}
                  renderItem={(file: any) => (
                    <List.Item
                      actions={[
                        <Button
                          icon={
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M17.0832 5H2.9165'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M15.6946 7.08301L15.3113 12.8323C15.1638 15.0447 15.09 16.1509 14.3692 16.8253C13.6483 17.4997 12.5397 17.4997 10.3223 17.4997H9.67787C7.46054 17.4997 6.35187 17.4997 5.63103 16.8253C4.91019 16.1509 4.83644 15.0447 4.68895 12.8323L4.30566 7.08301'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M7.91675 9.16699L8.33342 13.3337'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M12.0834 9.16699L11.6667 13.3337'
                                stroke='#991A1A'
                                stroke-width='1.5'
                                stroke-linecap='round'
                              />
                              <path
                                d='M5.41675 5C5.46331 5 5.4866 5 5.50771 4.99947C6.19391 4.98208 6.79927 4.54576 7.03276 3.90027C7.03994 3.88041 7.04731 3.85832 7.06203 3.81415L7.14294 3.57143C7.212 3.36423 7.24654 3.26063 7.29234 3.17267C7.47509 2.82173 7.8132 2.57803 8.20392 2.51564C8.30186 2.5 8.41106 2.5 8.62947 2.5H11.3707C11.5891 2.5 11.6983 2.5 11.7962 2.51564C12.187 2.57803 12.5251 2.82173 12.7078 3.17267C12.7536 3.26063 12.7882 3.36423 12.8572 3.57143L12.9381 3.81415C12.9528 3.85826 12.9602 3.88042 12.9674 3.90027C13.2009 4.54576 13.8063 4.98208 14.4925 4.99947C14.5136 5 14.5368 5 14.5834 5'
                                stroke='#991A1A'
                                stroke-width='1.5'
                              />
                            </svg>
                          }
                          onClick={() => handleRemoveFile(file)}
                          type='link'
                          danger
                        ></Button>,
                      ]}
                    >
                      <Row gutter={[8, 8]} align={'middle'}>
                        <Col>
                          <img
                            style={{display: 'block'}}
                            src={imgExcel.src}
                            alt=''
                          />
                        </Col>
                        <Col>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <AppTypo variant='p-md-reg'>{file.name}</AppTypo>
                            <p>
                              <img
                                style={{display: 'block'}}
                                src={imgCheck.src}
                                alt=''
                              />
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24} className={styles.drap_table_content}>
          <EmployeeSelectTable
            departmentRecord={null}
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </Col>
      </Row>
    </AppForm>
  );
};

export default ProjectAddAndUpdate;
