import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppTypo from 'components/atoms/AppTypo';
import useAssignStaffInCharge from './useFunc';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {FormInstance} from 'antd/lib';
import {onGetEmployees} from 'redux/actions/Employees';
type AssignTagsProps = {
  form: FormInstance;
  handleChangeModalInfo: (data: any) => void;
};
const AssignStaffInCharge = (props: AssignTagsProps) => {
  const {form, handleChangeModalInfo} = props;
  const {employeeSearchParams, setEmployeeSearchParams, handleFieldsChange} =
    useAssignStaffInCharge(form, handleChangeModalInfo);
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>Vui lòng chọn nhân viên phụ trách:</AppTypo>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <AppFormItem
            name='employees'
            label={frl('common.staffInCharge')}
            rules={[{required: true, message: fsrm('common.staffInCharge')}]}
          >
            <AppSelectLoadMore
              allowClear
              searchParams={employeeSearchParams}
              setSearchParams={setEmployeeSearchParams}
              onGetOptions={onGetEmployees}
              placeholder={messages['common.staffInChargeHint']}
              mode='multiple'
            />
          </AppFormItem>
        </AppForm>
      </Col>
    </Row>
  );
};
export default AssignStaffInCharge;
