import AppModal from 'components/molecules/AppModal';
import { useEffect, useState } from 'react';
import { loadState } from 'utils/LocalStore';
import { ActionType } from 'shared/constants/AppVariables';
import { useDispatch } from 'react-redux';
import { onCreateInventory, onUpdateInventory } from 'redux/actions/Inventory';
import AppTypo from 'components/atoms/AppTypo';
import AddInventoryContent from '../AddInventoryContent';
import { useIntl } from 'react-intl';
import AppTitleLable from 'components/atoms/AppTitleLable';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
};

const InventoryModal = (props: PropsTypes) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { info, isOpen, setIsOpen } = props;
  const [disabled, setDisabled] = useState(false);
  const [submitText, setSubmitText] = useState<any>();
  const [closeText, setCloseText] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const { record } = info;

  const handleRemoveState = (): void => {
    setCurrent(0);
  };
  const handleSubmit = async (): Promise<void> => {
    if (current === 1) {
      const { draftString, type } = info;
      setLoading(true);
      let res: any = null;
      switch (type) {
        case ActionType.ADD:
          res = await dispatch(onCreateInventory(loadState(draftString)));
          break;
        case ActionType.EDIT:
          res = await dispatch(onUpdateInventory(loadState(draftString)));
          break;
        case ActionType.VIEW:
          break;
        default:
          break;
      }
      setLoading(false);
      if (res) {
        info.action();
        handleRemoveState();
      }
      return;
    }
    setCurrent(current + 1);
  };

  const handleClose = (): void => {
    if (current == 0) {
      setIsOpen(false);
      handleRemoveState();
      return;
    }
    setCurrent(current - 1);
  };

  useEffect(() => {
    const { type } = info;
    if (!type) return;
    let closeText = '';
    let continueText = '';
    if (current == 0) {
      closeText = messages['common.cancel'] as string;
      continueText = messages['common.continue'] as string;
    } else {
      closeText = messages['common.back'] as string;
      switch (type) {
        case ActionType.ADD:
          continueText = messages['common.finish'] as string;
          break;
        case ActionType.EDIT:
          continueText = messages['common.edit'] as string;
          break;
      }
    }
    setCloseText(closeText);
    setSubmitText(continueText);
  }, [current, info]);

  const getTitle = () => {
    const { type } = info;
    if (!type) return;
    switch (type) {
      case ActionType.ADD: {
        return messages['common.addInventory'] as string;
      }
      case ActionType.EDIT: {
        return messages['common.editInventory'] as string;
      }
    }
  };

  return (
    <div>
      <AppModal
        title={<AppTitleLable title={getTitle()} recordTitle={record?.code} />}
        openModal={isOpen}
        submitText={submitText as string}
        closeText={closeText as string}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        width={1200}
        disabled={disabled}
        loading={loading}
      >
        <AddInventoryContent
          info={info}
          current={current}
          setCurrent={setCurrent}
          setDisabled={setDisabled}
        />
      </AppModal>
    </div>
  );
};

export default InventoryModal;
