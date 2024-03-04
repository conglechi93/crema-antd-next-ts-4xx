import { Button, Col, List, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { FormInstance } from 'antd/lib';
import AppCollapse from 'components/molecules/AppCollapse';
import TaskDetail from './TaskDetail';
import AppDraggerUpload from 'components/molecules/AppDraggerUpload';
import { useDispatch } from 'react-redux';
import { AttachmentType } from 'shared/constants/AppVariables';
import { onUploadFile } from 'redux/actions/UploadCommon';
import { createImageJson } from 'utils/FileHelper';
import AppTypo from 'components/atoms/AppTypo';
import AppEditor from 'components/atoms/AppEditor';

type PropsTypes = {
  form: FormInstance;
};

const UpdateTask = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const { form } = props;
  const { messages } = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();

  const [fileList, setFileList] = useState<any[]>([]);
  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const type = AttachmentType.FILE_TASK;
    const res: any = await dispatch(onUploadFile(file, type));
    if (res) {
      const { id, url, fileName, extention, type } = res;
      const newFile =
        createImageJson(id, url, fileName, extention, type) ?? null;
      const newFileList = [...fileList];
      if (newFile) newFileList.push(newFile);
      setFileList(newFileList);
      onSuccess('ok');
    } else {
      onError('error');
    }
  };
  const itemsCollapse = [
    {
      key: '1',
      label: 'Mô tả',
      children: (
        <AppEditor
          value={'content'}
          onChange={(event: any, editor: any) => {
            const editorData = editor.getData();
            // setD(editorData);
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'Tệp đính kèm',
      children: (
        <>
          <AppDraggerUpload
            fileList={fileList}
            handleCustomRequest={handleCustomRequest}
          />
          {fileList.length > 0 && (
            <List
              style={{ marginTop: 16 }}
              size='small'
              bordered
              dataSource={fileList}
              renderItem={(file: any, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button
                      key={index}
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
                      // onClick={() => handleRemoveFile(file)}
                      type='link'
                      danger
                    ></Button>,
                  ]}
                >
                  <Row gutter={[8, 8]} align={'middle'}>
                    <Col>
                      <img
                        style={{ display: 'block' }}
                        // src={imgExcel.src}
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
                            style={{ display: 'block' }}
                            // src={imgCheck.src}
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
        </>
      ),
    },
  ];

  return (
    <AppForm form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <AppFormItem
                rules={[{ required: true, message: frm('common.taskName') }]}
                name='name'
                label={frl('common.taskName')}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.taskNameHint'] as string}
                />
              </AppFormItem>
            </Col>
            <Col xs={24}>
              <AppCollapse items={itemsCollapse} />
            </Col>
          </Row>
        </Col>
        <Col xs={8}>
          <TaskDetail form={form} />
        </Col>
      </Row>
    </AppForm>
  );
};

export default memo(UpdateTask); // UpdateTask;
