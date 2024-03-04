import { useEffect, useRef, useState } from 'react';
type PropsTypes = {
  editorValue: any;
  setEditorValue: (value: any) => void;
  onChange: (event: any, editor: any) => void;
};
export const AppEditor = (props: PropsTypes) => {
  const { editorValue, setEditorValue, onChange } = props;
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

  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={editorValue}
      onChange={(event: any, editor: any) => {
        const editorData = editor.getData();
        setEditorValue(editorData);
        onChange?.(event, editor);
      }}
    />
  );
};
