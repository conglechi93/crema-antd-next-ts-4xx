import React, { useRef } from 'react';
import AppCard from '@crema/components/AppCard';
import ImgUpload from './ImageUpload';
import { StyledFormWrapper, StyledText } from '../index.styled';
import { Col, Form, Input } from 'antd';
import { FileType } from '@crema/types/models/extrapages/Blog';
import JoditEditor from 'jodit-react';

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  toolbar: true,
  minHeight: 300,
  maxHeight: 500,
  buttons: [
    'source',
    '|',
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'ul',
    'ol',
    '|',
    'outdent',
    'indent',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
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
    '|',
    'hr',
    '|',
    'symbol',
    'about',
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
const { TextArea } = Input;

type Props = {
  uploadedFiles: FileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
  content?: string;
};

const BlogContent = ({ content, uploadedFiles, setUploadedFiles }: Props) => {
  const editor = useRef(null);
  return (
    <Col xs={24} lg={16}>
      <AppCard>
        <StyledFormWrapper>
          <Form.Item label='Blog Name' name='title'>
            <Input placeholder='Blog Name' />
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <TextArea rows={4} placeholder='Description here' />
          </Form.Item>
          <Form.Item label='Content' name='content'>
            <JoditEditor
              ref={editor}
              value={content || ''}
              config={config}
              // placeholder='Description here'
            />
          </Form.Item>
          <StyledText>Cover Image</StyledText>
          <ImgUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </StyledFormWrapper>
      </AppCard>
    </Col>
  );
};

export default BlogContent;
