import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Col, Row } from 'antd';
import { FormInstance } from 'antd/lib';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppInput from 'components/atoms/AppInput';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { useIntl } from 'react-intl';
import Validators from 'shared/validators';
import useDepartmentAddAndUpdate from './useDepartmentAddAndUpdate';
import { onGetEmployees } from 'redux/actions/Employees';
import { onGetRoles } from 'redux/actions/Roles';
import AppTextArea from 'components/atoms/AppTextArea';

type PropsTypes = {
  form: FormInstance;
  setDisabled: (disabled: boolean) => void;
};

const DepartmentAddAndUpdate = (props: PropsTypes) => {
  const { form, setDisabled } = props;
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const { messages } = useIntl();

  const {
    handleFieldsChange,
    handleCheckFormData,
    employeeSearchParams,
    setEmployeeSearchParams,
    positionSearchParams,
    setPositionSearchParams,
  } = useDepartmentAddAndUpdate(form, setDisabled);

  return (
    <AppForm form={form} onFieldsChange={handleFieldsChange}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Col xs={8}>
              <AppFormItem
                name='name'
                required={true}
                rules={[
                  {
                    required: true,
                    message: frm('common.departmentName'),
                  },
                  {
                    validator: (_, v) => Validators.MinLength(v, 1),
                    message: `Tên phòng ban tối thiểu ${2} ký tự`,
                  },
                ]}
                label={frl('common.departmentName')}
              >
                <AppInput
                  type='text'
                  placeholder={messages['common.departmentNameHint'] as string}
                  minLength={2}
                  maxLength={50}
                />
              </AppFormItem>
            </Col>
            <Col xs={8}>
              <AppFormItem
                name='employee'
                required={true}
                label={messages['common.managementPersonnel'] as string}
              >
                <AppSelectLoadMore
                  onGetOptions={onGetEmployees}
                  searchParams={employeeSearchParams}
                  setSearchParams={setEmployeeSearchParams}
                  placeholder={
                    messages['common.managementPersonnelHint'] as string
                  }
                />
              </AppFormItem>
            </Col>
            <Col xs={8}>
              <AppFormItem
                name='position'
                required={true}
                label={messages['common.position'] as string}
              >
                <AppSelectLoadMore
                  searchParams={positionSearchParams}
                  setSearchParams={setPositionSearchParams}
                  onGetOptions={onGetRoles}
                  placeholder={messages['common.positionHint'] as string}
                />
              </AppFormItem>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppFormItem
            name='description'
            label={messages['common.description'] as string}
          >
            <AppTextArea
              placeholder={messages['common.descriptionHint'] as string}
            />
          </AppFormItem>
        </Col>
      </Row>
    </AppForm>
  );
};
export default DepartmentAddAndUpdate;
