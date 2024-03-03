import AppProgress from 'components/molecules/AppProgress';
import Step1 from './Step1';
import Step2 from './Step2';
import useAddInventoryContent from './useAddInventoryContent';
import {saveState, loadState} from 'utils/LocalStore';

type PropsTypes = {
  info: any;
  current: number;
  setCurrent?: (value: number) => void;
  setDisabled: (value: boolean) => void;
};
const AddInventoryContent = (props: PropsTypes) => {
  const {info, current, setDisabled} = props;
  const {items} = useAddInventoryContent();
  const handleSetFormData = (dataItems: Array<{key: string; value: any}>) => {
    const {draftString} = info;
    let dataDraft = {...loadState(draftString)};
    let submitFormData = dataDraft.submitFormData || {};
    dataItems?.forEach((item) => {
      submitFormData = {
        ...submitFormData,
        [item.key]: item.value,
      };
    });
    dataDraft = {
      ...dataDraft,
      submitFormData: submitFormData,
    };
    saveState(draftString, dataDraft);
  };

  return (
    <div>
      <AppProgress current={current} items={items} />
      {/* {
        {
          0: (
            <Step1
              info={info}
              handleSetFormData={handleSetFormData}
              setDisabled={setDisabled}
            />
          ),
          1: (
            <Step2
              info={info}
              handleSetFormData={handleSetFormData}
              setDisabled={setDisabled}
            />
          ),
        }[current]
      } */}
      <div className={current == 0 ? 'block-display' : 'none-display'}>
        <Step1
          info={info}
          handleSetFormData={handleSetFormData}
          setDisabled={setDisabled}
        />
      </div>
      <div className={current == 1 ? 'block-display' : 'none-display'}>
        <Step2
          current={current}
          info={info}
          handleSetFormData={handleSetFormData}
          setDisabled={setDisabled}
        />
      </div>
    </div>
  );
};

export default AddInventoryContent;
