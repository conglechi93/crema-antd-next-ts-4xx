import dynamic from 'next/dynamic';

const AppEditor = ({ value, onChange }) => {
  const Editor = dynamic(() => import('./EditorCustom'), { ssr: false });
  return <Editor value={value} onChange={onChange} />;
};
export default AppEditor;
