import {Progress} from 'antd';

type ProgressProps = {
  percent: number;
  color?: string;
};

const AppProgressPercent = (props: ProgressProps) => {
  const {percent, color} = props;
  return (
    <Progress type='circle' strokeColor={color} percent={percent} size={36} />
  );
};

export default AppProgressPercent;
