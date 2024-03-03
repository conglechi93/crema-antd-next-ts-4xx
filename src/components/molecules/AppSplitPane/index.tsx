import SplitPane, {Pane} from 'react-split-pane-next';
type AppSplitPaneProps = {
  fisrtPane?: React.ReactNode | null;
  secondPane?: React.ReactNode | null;
};
const AppSplitPane: React.FC<AppSplitPaneProps> = (prop: AppSplitPaneProps) => {
  const {fisrtPane, secondPane} = prop;
  return (
    <SplitPane split='horizontal'>
      <Pane>{fisrtPane}</Pane>
      <Pane initialSize='25%' minSize='10%' maxSize='512px'>
        {secondPane}
      </Pane>
    </SplitPane>
  );
};

export default AppSplitPane;
