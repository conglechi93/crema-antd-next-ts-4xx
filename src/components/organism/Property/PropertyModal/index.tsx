import AppForm from 'components/atoms/AppForm';
import AppModal from 'components/molecules/AppModal';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { useIntl } from 'react-intl';
import AppTextArea from 'components/atoms/AppTextArea';
import { Col, Row } from 'antd';
import usePropertyModal from './usePropertyModal';
import AppSelect from 'components/atoms/AppSelect';
import DataType from 'components/molecules/DataType';
import { ActionType } from 'shared/constants/AppVariables';
import PropertyDetail from '../PropertyDetail';

type PropsTypes = {
  info: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose?: () => void;
  zIndex?: number;
};
const PropertyModal = (props: PropsTypes) => {
  const { info, isOpen, setIsOpen } = props;
  const { type } = info;
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const { messages } = useIntl();

  const {
    form,
    popForm,
    dataTypeOptions,
    modalDisabled,
    modalData,
    handleSubmit,
    handleClose,
    handleRemoveState,
    handleChangeDataType,
    handleFieldsChange,
    currentType,
    pickListCode,
    setPickListCode,
    propertyDetails,
  } = usePropertyModal(info, setIsOpen);

  return (
    <>
      <AppModal
        title={modalData?.title}
        openModal={isOpen}
        setOpenModal={setIsOpen}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        onClosable={handleRemoveState}
        submitText={modalData?.submitText}
        closeText={modalData?.closeText}
        width={1200}
        styles={{
          body: {
            height: 500,
          },
        }}
        destroyOnClose
        disabled={modalDisabled}
      >
        {info?.type === ActionType.VIEW ? (
          <PropertyDetail propertyDetails={propertyDetails} />
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <AppForm form={form} onFieldsChange={handleFieldsChange}>
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={12}>
                        <AppFormItem
                          name={'name'}
                          label={frl('common.propertyName')}
                          rules={[
                            {
                              required: true,
                              message: frm('common.propertyName'),
                            },
                          ]}
                        >
                          <AppInput
                            type='text'
                            placeholder={
                              messages['common.propertyNameHint'] as string
                            }
                            disabled={type === ActionType.VIEW}
                          />
                        </AppFormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <AppFormItem
                          name={'configDataType'}
                          label={frl('common.dataType')}
                          rules={[
                            {
                              required: true,
                              message: fsrm('common.dataType'),
                            },
                          ]}
                        >
                          <AppSelect
                            options={dataTypeOptions}
                            onChange={handleChangeDataType}
                            placeholder={
                              messages['common.dataTypeHint'] as string
                            }
                            disabled={type === ActionType.VIEW}
                          />
                        </AppFormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <AppFormItem
                      name={'description'}
                      label={messages['common.description'] as string}
                    >
                      <AppTextArea
                        placeholder={
                          messages['common.descriptionHint'] as string
                        }
                        disabled={type === ActionType.VIEW}
                      />
                    </AppFormItem>
                  </Col>
                </Row>
              </AppForm>
            </Col>
            <Col xs={24}>
              <AppForm form={popForm} onFieldsChange={handleFieldsChange}>
                <DataType
                  configDataType={currentType}
                  disabled={type === ActionType.VIEW}
                  pickListCode={pickListCode}
                  setPickListCode={setPickListCode}
                />
              </AppForm>
            </Col>
          </Row>
        )}
      </AppModal>
    </>
  );
};

export default PropertyModal;
