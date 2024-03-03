import {PropertyType} from 'shared/constants/AppVariables';
import StringComponent from './String';
import DateComponent from './Date';
import NumberComponent from './Number';
import PickListComponent from './PickList';

type PropsTypes = {
  configDataType: string | undefined;
  disabled: boolean;
  pickListCode: string;
  setPickListCode: (pickListCode: string) => void;
};
const DataType = (props: PropsTypes) => {
  const {configDataType, disabled, pickListCode, setPickListCode} = props;

  switch (configDataType) {
    case PropertyType.TYPE_STR:
      return <StringComponent disabled={disabled} />;
    case PropertyType.TYPE_NUM:
      return <NumberComponent disabled={disabled} />;
    case PropertyType.TYPE_DATE:
      return <DateComponent disabled={disabled} />;
    case PropertyType.TYPE_LIST:
      return (
        <PickListComponent
          disabled={disabled}
          pickListCode={pickListCode}
          setPickListCode={setPickListCode}
        />
      );
    default:
      return <></>;
  }
};

export default DataType;
