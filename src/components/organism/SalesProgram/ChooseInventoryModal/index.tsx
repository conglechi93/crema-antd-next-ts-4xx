import AppModal from 'components/molecules/AppModal';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import ChooseInventoryFilter from '../ChooseInventoryFilter';
import { Col, Row } from 'antd';
import useChooseInventoryModal from './useChooseInventoryModal';
import AppTableContainer from '@crema/AppTableContainer';

export enum ChooseInventoryType {
  CHOOSE_INVENTORY = 'CHOOSE_INVENTORY',
  ADD_INVETORY_INTEREST = 'ADD_INVETORY_INTEREST',
}
type PropsTypes = {
  info: {
    action: () => void;
    record: any;
    type: ChooseInventoryType | undefined;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};

const ChooseInventoryModal = (props: PropsTypes) => {
  const { info, isOpen, setIsOpen } = props;
  const [disabled, setDisabled] = useState(true);
  const { messages } = useIntl();
  const {
    current,
    setCurrent,
    searchForm,
    total,
    loading,
    columns,
    dataSource,
    handleSelectChange,
    handleChangeSearchParams,
    handleSubmit,
    handleClose,
    removeState,
    loadingAddInventory,
  } = useChooseInventoryModal(info, setDisabled, setIsOpen);
  return (
    <div>
      <AppModal
        title={
          info?.type === ChooseInventoryType.CHOOSE_INVENTORY
            ? messages['common.chooseInventory']
            : messages['common.addInventoryInterested']
        }
        openModal={isOpen}
        submitText={messages['common.add'] as string}
        closeText={messages['common.cancel'] as string}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={removeState}
        width={1200}
        disabled={disabled}
        styles={{
          body: {
            height: 500,
          },
        }}
        loading={loadingAddInventory}
      >
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <ChooseInventoryFilter
              form={searchForm}
              handleChangeSearchParams={handleChangeSearchParams}
            />
          </Col>
          <Col span={24}>
            <AppTableContainer
              current={current}
              setCurrent={setCurrent}
              total={total}
              className=''
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              handleSelectChange={handleSelectChange}
              scroll={{ x: 500, y: 'calc(100vh - 600px)' }}
              handleChangePage={handleChangeSearchParams}
              selectionType='checkbox'
              pagination={{
                position: ['topRight'],
              }}
            />
          </Col>
        </Row>
      </AppModal>
    </div>
  );
};

export default ChooseInventoryModal;
