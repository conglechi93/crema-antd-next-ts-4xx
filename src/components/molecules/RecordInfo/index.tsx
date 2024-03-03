import AppTypo from 'components/atoms/AppTypo';
import {Card} from 'antd';
import styles from './style.module.scss';
import clsx from 'clsx';

type PropsTypes = {
  title: string;
  total: number;
  type: 'duplicate' | 'error' | 'success' | 'total';
  loading?: boolean;
  handleClick?: (type: any) => void;
  activeCard?: any;
};
const RecordInfo = (props: PropsTypes) => {
  const {title, total, type, loading, handleClick, activeCard} = props;
  return (
    <Card
      loading={loading}
      title={title}
      className={clsx({
        [styles['record_info_card']]: true,
        [styles[type]]: true,
        [styles[activeCard === type ? 'active' : '']]: true,
      })}
      onClick={handleClick}
    >
      <AppTypo variant='p-xl-semi'>{total}</AppTypo>
    </Card>
  );
};

export default RecordInfo;
