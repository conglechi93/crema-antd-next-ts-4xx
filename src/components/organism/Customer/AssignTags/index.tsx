import {Col, Row} from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppTypo from 'components/atoms/AppTypo';
import useAssignTags from './useFunc';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import {onGetTags} from 'redux/actions/Tag';
import {useIntl} from 'react-intl';
import useFormMessage from '@crema/utility/hooks/useFormMessage';
import {ModalInfoProps} from 'components/molecules/AppModalV2';
import {FormInstance} from 'antd/lib';
type AssignTagsProps = {
  form: FormInstance;
  handleChangeModalInfo: (data: ModalInfoProps) => void;
  currentTags?: Array<any>;
};
const AssignTags = (props: AssignTagsProps) => {
  const {form, handleChangeModalInfo, currentTags} = props;
  const {tagsSearchParams, setTagsSearchParams, handleFieldsChange} =
    useAssignTags(form, handleChangeModalInfo, currentTags);
  const {messages} = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <AppTypo variant='p-md-med'>
          Vui lòng chọn tags cho các khách hàng đã chọn:
        </AppTypo>
      </Col>
      <Col xs={24}>
        <AppForm form={form} onFieldsChange={handleFieldsChange}>
          <AppFormItem
            name='tags'
            label={frl('common.tags')}
            rules={[{required: true, message: fsrm('common.tags')}]}
          >
            <AppSelectLoadMore
              allowClear
              searchParams={tagsSearchParams}
              setSearchParams={setTagsSearchParams}
              onGetOptions={onGetTags}
              placeholder={messages['common.tagsHint']}
              mode='tags'
            />
          </AppFormItem>
        </AppForm>
      </Col>
    </Row>
  );
};
export default AssignTags;
