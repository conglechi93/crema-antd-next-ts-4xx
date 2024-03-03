import {Col, Row} from 'antd';
import AppInput from 'components/atoms/AppInput';
import Image from 'next/image';
// import PlusIcon from '/assets/icons/plus.svg';
import PlusIcon from '../../../../assets/icon/plus.svg';
import MinusIcon from '../../../../assets/icon/minus.svg';
import usePickListOptions from './usePickListOptions';
import {ActionType} from 'shared/constants/AppVariables';

type PropsTypes = {
  type: string;
  options: Array<{
    id: number;
    value: string;
  }>;
  setOptions: (options: any) => void;
  setDisabled: (disabled: boolean) => void;
  handleCheckFormData: () => void;
};
const PickListOptions = (props: PropsTypes) => {
  const {type, options, setOptions, setDisabled, handleCheckFormData} = props;
  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleAddOption,
    handleDeleteOption,
    handleChangeOption,
  } = usePickListOptions(options, setOptions, setDisabled, handleCheckFormData);
  return (
    <Row gutter={[16, 16]}>
      {options?.map((option, index) => (
        <Col
          key={option?.id}
          xs={24}
          draggable
          onDragStart={(event) => handleDragStart(event, Number(option.id))}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, Number(option.id))}
        >
          <Row gutter={[16, 16]} align={'middle'} justify={'center'}>
            <Col flex={'auto'}>
              <AppInput
                disabled={type === ActionType.VIEW}
                type='text'
                value={option?.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeOption(Number(option.id), event.target.value)
                }
              />
            </Col>
            {type !== ActionType.VIEW && (
              <Col flex={'none'}>
                <Row gutter={[8, 8]}>
                  <Col>
                    <Image
                      src={PlusIcon}
                      alt=''
                      onClick={() => handleAddOption(Number(index))}
                    />
                  </Col>
                  <Col>
                    {options.length > 1 && (
                      <Image
                        src={MinusIcon}
                        alt=''
                        onClick={() => handleDeleteOption(Number(option.id))}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default PickListOptions;
