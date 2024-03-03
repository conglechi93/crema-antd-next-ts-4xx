import {ModalInfoProps} from 'components/molecules/AppModalV2';
import {useState} from 'react';
import {useIntl} from 'react-intl';

const useMergeCustomer = (
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
) => {
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [tblLabels, setTblLabels] = useState<Array<any>>([]);
  const [tblEntries, setTblEntries] = useState<Array<any>>([]);
  const [propertyCodeConditions, setPropertyCodeConditions] = useState([]);
  const [current, setCurrent] = useState(0);
  const {messages} = useIntl();
  const items = [
    {
      title: 'Chọn điều kiện',
    },
    {
      title: 'Chọn bộ dữ liệu gộp',
    },
    {
      title: 'Chọn dữ liệu gộp',
    },
    {
      title: 'Hoàn thành',
    },
  ];

  const handleSubmit = () => {
    if (current === 3) {
      return;
    }
    setCurrent(current + 1);
  };
  const handleClose = () => {
    if (current === 0) {
      return;
    }
    setCurrent(current - 1);
  };

  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    title: messages['common.mergeData'] as string,
    description: <></>,
    submitText: messages['common.continue'] as string,
    closeText: messages['common.cancel'] as string,
    width: 1200,
    submit: false,
    loading: false,
    onClosable: () => {
      setIsOpen(false);
    },
  });

  const handleChangeModalInfo = (info: ModalInfoProps) => {
    setModalInfo((pre) => {
      return {
        ...pre,
        ...info,
      };
    });
  };

  const [customerCode, setCustomerCode] = useState<Array<any>>([]);
  return {
    items,
    current,
    modalInfo,
    handleSubmit,
    handleClose,
    propertyCodeConditions,
    setPropertyCodeConditions,
    customerCode,
    setCustomerCode,
    tblLabels,
    setTblLabels,
    tblEntries,
    setTblEntries,
    dataSource,
    setDataSource,
  };
};
export default useMergeCustomer;
