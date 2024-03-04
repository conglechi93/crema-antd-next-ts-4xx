import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = ({ value, onChange }) => {
  const editorConfiguration: any = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  };
  return (
    <CKEditor
      config={editorConfiguration}
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        onChange(event, editor);
      }}
    />
  );
};

export default Editor;
