import AppModal from 'components/molecules/AppModal';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onSubmitInventoriesFile} from 'redux/actions/Inventory';
import {useIntl} from 'react-intl';
import Step1 from './Step1';
import Step2 from './Step2';
import {onSubmitCustomerFile} from 'redux/actions/Customer';

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  submitText?: any;
  closeText?: any;
  handleClose?: () => void;
  zIndex?: number;
  setIsRefresh: (isRefresh: any) => void;
};

const ImportCustomer = (props: PropsTypes) => {
  const {isOpen, setIsOpen, setIsRefresh} = props;
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
      await dispatch(onSubmitCustomerFile(formId));
      setLoading(false);
      setIsOpen(false);
      handleRemoveState();
      setIsRefresh((pre) => !pre);
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
  }, [current]);

  const handleRemoveState = (): void => {
    setCurrent(0);
    setFormId('');
  };

  return (
    <AppModal
      title={'Tải lên khách hàng'}
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
      <div className={current === 0 ? 'block-display' : 'none-display'}>
        <Step1 setDisabled={setDisabled} setFormId={setFormId} />
      </div>
      <div className={current === 1 ? 'block-display' : 'none-display'}>
        <Step2 formId={formId} setDisabled={setDisabled} />
      </div>
    </AppModal>
  );
};

export default ImportCustomer;
