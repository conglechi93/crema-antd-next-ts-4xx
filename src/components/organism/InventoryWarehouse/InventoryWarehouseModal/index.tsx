import { Col, Row, Spin } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppTypo from 'components/atoms/AppTypo';
import AppModal from 'components/molecules/AppModal';
import AppThreeCols from 'components/molecules/AppThreeCols';
import { useState } from 'react';
import useInventoryWarehouseModal from './useInventoryWarehouseModal';
import useFormMessage from '../../../../@crema/utility/hooks/useFormMessage';
import { useIntl } from 'react-intl';
import labelImg from 'assets/icon/documents_label.png';
import Validators from 'shared/validators';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { onSearchForms } from 'redux/actions/Form';
import { onGetProjectList } from 'redux/actions/ProjectManagement';
import { ActionType } from 'shared/constants/AppVariables';
import AppTitleLable from 'components/atoms/AppTitleLable';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
  contentLoading?: boolean;
};
const InventoryWarehouseModal = (props: PropsTypes) => {
  const { info, isOpen, setIsOpen, contentLoading } = props;
  const [disabled, setDisabled] = useState(true);
  const { record } = info;

  const {
    loading,
    form,
    handleSubmit,
    handleClose,
    handleFieldsChange,
    modalConfig,
    handleRemoveState,

    formSearchParams,
    setFormSearchParams,

    projectSearchParams,
    setProjectSearchParams,
  } = useInventoryWarehouseModal(info, setDisabled, setIsOpen);

  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const { messages } = useIntl();
  return (
    <AppModal
      title={
        <AppTitleLable title={modalConfig?.title} recordTitle={record?.code} />
      }
      openModal={isOpen}
      submitText={modalConfig?.submitText as string}
      closeText={modalConfig?.closeText as string}
      setOpenModal={setIsOpen}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      onClosable={handleRemoveState}
      width={1200}
      disabled={disabled}
      loading={loading}
      contentLoading={contentLoading}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppForm form={form} onFieldsChange={handleFieldsChange}>
            <Row gutter={[16, 0]} align={'bottom'}>
              <Col xs={24}>
                <AppThreeCols>
                  <AppFormItem
                    name='name'
                    required={true}
                    rules={[
                      {
                        required: true,
                        message: frm('common.inventoryWarehouseName'),
                      },
                      {
                        validator: (_, v) => Validators.MinLength(v, 1),
                        message: `Tên kho hàng tối thiểu ${2} ký tự`,
                      },
                    ]}
                    label={frl('common.inventoryWarehouseName')}
                  >
                    <AppInput
                      disabled={info.type == ActionType.VIEW}
                      type='text'
                      placeholder={
                        messages['common.inventoryWarehouseNameHint'] as string
                      }
                      minLength={2}
                      maxLength={50}
                    />
                  </AppFormItem>
                  <AppFormItem
                    name='project'
                    required={true}
                    label={frl('common.project')}
                    rules={[
                      { required: true, message: fsrm('common.project') },
                    ]}
                  >
                    <AppSelectLoadMore
                      disabled={info.type == ActionType.VIEW}
                      onGetOptions={onGetProjectList}
                      searchParams={projectSearchParams}
                      setSearchParams={setProjectSearchParams}
                      placeholder={messages['common.projectHint'] as string}
                    />
                  </AppFormItem>
                  <AppFormItem
                    name='form'
                    required={true}
                    label={frl('common.form')}
                    rules={[{ required: true, message: fsrm('common.form') }]}
                  >
                    <AppSelectLoadMore
                      disabled={info.type == ActionType.VIEW}
                      onGetOptions={onSearchForms}
                      searchParams={formSearchParams}
                      setSearchParams={setFormSearchParams}
                      placeholder={messages['common.formHint'] as string}
                    />
                  </AppFormItem>
                </AppThreeCols>
              </Col>
            </Row>
          </AppForm>
        </Col>
      </Row>
    </AppModal>
  );
};

export default InventoryWarehouseModal;
