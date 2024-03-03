import {DatePicker} from 'antd';
import {RangePickerProps} from 'antd/es/date-picker';
import styles from './style.module.scss';
import {dateFormat} from 'shared/constants/AppConst';

const AppRangePicker = (props: RangePickerProps) => {
  const {RangePicker} = DatePicker;
  return (
    <RangePicker
      {...props}
      className={styles.app_rangePicker}
      format={dateFormat}
      placeholder={['dd/mm/yyyy', 'dd/mm/yyyy']}
    />
  );
};

export default AppRangePicker;
