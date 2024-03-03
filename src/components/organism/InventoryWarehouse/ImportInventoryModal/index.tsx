import AppModal from 'components/molecules/AppModal';
import {useEffect, useState} from 'react';
import {removeState} from 'utils/LocalStore';
import {useDispatch} from 'react-redux';
import {onSubmitInventoriesFile} from 'redux/actions/Inventory';
import ImportInventoryContent from '../ImportInventoryContent';
import {useIntl} from 'react-intl';
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

const ImportInventoryModal = (props: PropsTypes) => {
  const {info, isOpen, setIsOpen} = props;
  const {action, record} = info;
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formId, setFormId] = useState('');
  const [current, setCurrent] = useState(0);
  const [submitText, setSubmitText] = useState<any>();
  const [closeText, setCloseText] = useState<any>();
  const {messages} = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!formId) setDisabled(true);
  }, [formId]);

  const handleSubmit = async (): Promise<void> => {
    if (current == 1) {
      setLoading(true);
      await dispatch(onSubmitInventoriesFile(formId));
      setLoading(false);
      action();
      setIsOpen(false);
      handleRemoveState();
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
    if (current == 0) {
      setSubmitText('Tiếp tục');
      setCloseText('Hủy');
    } else {
      setSubmitText('Tải lên');
      setCloseText('Quay lại');
    }
  }, [current, info]);

  const handleRemoveState = (): void => {
    const {draftString} = info;
    removeState([draftString]);
    setCurrent(0);
    setFormId('');
  };

  return (
    <AppModal
      title={
        <AppTitleLable
          title={'common.importInventory'}
          recordTitle={record?.code}
        />
      }
      openModal={isOpen}
      submitText={submitText}
      closeText={closeText}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onClosable={handleRemoveState}
      width={1200}
      styles={{
        body: {
          height: 570,
        },
      }}
      disabled={disabled}
      loading={loading}
    >
      <ImportInventoryContent
        info={info}
        current={current}
        setDisabled={setDisabled}
        formId={formId}
        setFormId={setFormId}
      />
    </AppModal>
  );
};

export default ImportInventoryModal;
