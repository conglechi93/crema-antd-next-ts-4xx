import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppTypo from 'components/atoms/AppTypo';
import useAssignStaffInCharge from './useFunc';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {FormInstance} from 'antd/lib';
import {onGetEmployeeAvailableAssigneeForTask} from 'redux/actions/Task';
type AssignTagsProps = {
  form: FormInstance;
  record: any;
  setModalInfo: (data: any) => void;
};
const AssignStaffInCharge = (props: AssignTagsProps) => {
  const {form, record, setModalInfo} = props;
  const {employeeSearchParams, setEmployeeSearchParams, handleFieldsChange} =
    useAssignStaffInCharge(form, record, setModalInfo);
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>Vui lòng chọn nhân viên thực hiện:</AppTypo>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <AppFormItem
            name='employees'
            label={frl('common.staffInAction')}
            rules={[{required: true, message: fsrm('common.staffInAction')}]}
          >
            <AppSelectLoadMore
              allowClear
              searchParams={{
                ...employeeSearchParams,
                taskCode: record?.code,
                projectCode: record?.project?.code ?? '',
              }}
              setSearchParams={setEmployeeSearchParams}
              onGetOptions={onGetEmployeeAvailableAssigneeForTask}
              placeholder={messages['common.staffInActionHint']}
              mode='multiple'
            />
          </AppFormItem>
        </AppForm>
      </Col>
    </Row>
  );
};
export default AssignStaffInCharge;
