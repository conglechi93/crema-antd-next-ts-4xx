import {DatePicker} from 'antd';
import {dateTimeFormat} from 'shared/constants/AppConst';

type DatePickerCustomProps = {
  placeholder?: string;
  suffixIcon?: React.ReactNode;
  format: string;
};

const AppDatePicker = () => {
  // const {placeholder, suffixIcon, format} = props;
  return (
    <DatePicker
      // showTime
      format={dateTimeFormat[0]}
      style={{width: '100%', height: '36px'}}
      // placeholder={messages['common.toDateHint'] as string}
      // suffixIcon={<img src={CalendarImg.src} alt='' />}
    />
  );
};

export default AppDatePicker;
