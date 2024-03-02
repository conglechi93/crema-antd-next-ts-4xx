import React, { useRef, useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Form, Input } from 'antd';
import { useIntl } from 'react-intl';
// import '../../../../../shared/styles/vendors/ql-editor.css';
import AppIconButton from '@crema/components/AppIconButton';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  StyledMailDetailBtn,
  StyledMailDetailForm,
  StyledMailDetailFormFooter,
  StyledMailDetailInput,
  StyledMailFormFooter,
} from '../index.styled';
import { StyledMailModalSuffix } from '../../ComposeMail/index.styled';
import { getFormattedDate } from '@crema/helpers/DateHelper';
import { generateUniqueID } from '@crema/helpers/StringHelper';
import { MessageType } from '@crema/types/models/apps/Mail';
import JoditEditor from 'jodit-react';

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  toolbar: true,
  minHeight: 300,
  maxHeight: 500,
  buttons: [
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'ul',
    'ol',
    '|',
    'font',
    '|',
    'image',
    'video',
    'table',
    'link',
    '|',
    'align',
    'undo',
    'redo',
    'selectall',
    'cut',
    '|',
    'symbol',
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: '/api/upload',
    format: 'json',
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
    headers: {
      'X-CSRF-TOKEN': 'CSFR-Token',
      Authorization: 'Bearer <JSON Web Token>',
    },
    process: function (resp: any) {
      return {
        files: resp.data,
      };
    },
  },
  style: {
    '& .jodit .jodit-status-bar': {
      background: '#29572E',
      color: 'rgba(255,255,255,0.5)',
    },
  },
};
type ReplyMailProps = {
  message: MessageType;
  index: number;
  isForward: boolean;
  onSubmitMail: (message: MessageType, index: number) => void;
  onDeleteDraft: () => void;
};

const ReplyMail: React.FC<ReplyMailProps> = ({
  message,
  isForward,
  index,
  onSubmitMail,
  onDeleteDraft,
}) => {
  const [isShowCC, onShowCC] = useState(false);
  const [isShowBcc, onShowBcc] = useState(false);
  const editor = useRef(null);
  const { messages } = useIntl();

  const onFinish = (values: any) => {
    onSubmitMail(
      {
        messageId: generateUniqueID(),
        sender: getSender(),
        description: values.description,
        to: [message.sender],
        cc: values.cc,
        bcc: values.bcc,
        isStarred: false,
        sentOn: getFormattedDate(),
      },
      index,
    );
  };

  const getSender = () => {
    if (message.sender.id === 1) {
      return message.to[0];
    } else {
      return message.sender;
    }
  };
  return (
    <StyledMailDetailForm
      name='basic'
      initialValues={{
        username: isForward ? '' : getSender().email,
        ...message,
        description: '',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <StyledMailDetailInput
          prefix={
            <span className='mail-modal-prefix'>
              <IntlMessages id='common.to' />
            </span>
          }
          suffix={
            <StyledMailModalSuffix>
              <span onClick={() => onShowCC(!isShowCC)}>
                <IntlMessages id='common.cc' />
              </span>

              <span onClick={() => onShowBcc(!isShowBcc)}>
                <IntlMessages id='common.bcc' />
              </span>
            </StyledMailModalSuffix>
          }
        />
      </Form.Item>

      {isShowCC ? (
        <Form.Item
          name='cc'
          rules={[{ required: true, message: 'Please input your cc!' }]}
        >
          <StyledMailDetailInput
            placeholder={messages['common.cc'] as string}
          />
        </Form.Item>
      ) : null}

      {isShowBcc ? (
        <Form.Item
          name='bcc'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your bcc!',
            },
          ]}
        >
          <Input placeholder={messages['common.bcc'] as string} />
        </Form.Item>
      ) : null}
      <Form.Item
        className='form-field'
        name='description'
        rules={[{ required: true, message: 'Please input your Content!' }]}
      >
        <JoditEditor ref={editor} value={''} config={config} />
      </Form.Item>

      <StyledMailFormFooter>
        <StyledMailDetailBtn type='primary' htmlType='submit'>
          <IntlMessages id='common.send' />
        </StyledMailDetailBtn>
        <StyledMailDetailFormFooter>
          <AppIconButton
            title={<IntlMessages id='common.trash' />}
            icon={<AiOutlineDelete />}
            onClick={onDeleteDraft}
          />
        </StyledMailDetailFormFooter>
      </StyledMailFormFooter>
    </StyledMailDetailForm>
  );
};

export default ReplyMail;
