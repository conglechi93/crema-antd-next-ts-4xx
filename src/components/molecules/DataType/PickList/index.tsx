import useFormMessage from '@crema/utility/hooks/useFormMessage';
import { Col, Row } from 'antd';
import AppCheckbox from 'components/atoms/AppCheckbox';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSelectLoadMore from 'components/atoms/AppSelectLoadMore';
import { useIntl } from 'react-intl';
import { onGetPickLists } from 'redux/actions/PickList';
import usePickList from './usePickList';
import AppTableContainer from '@crema/AppTableContainer';

type PropsTypes = {
  disabled: boolean;
  pickListCode: string;
  setPickListCode: (pickListCode: string) => void;
};
const PickListComponent = (props: PropsTypes) => {
  const { disabled, pickListCode, setPickListCode } = props;
  const { messages } = useIntl();
  const {
    formatRequiredLabelId: frl,
    formatRequiredMessageId: frm,
    formatSelectRequiredMessageId: fsrm,
  } = useFormMessage();
  const {
    loading,
    searchParams,
    setSearchParams,
    dataSource,
    columns,
    handleChoosePickList,
  } = usePickList(pickListCode, setPickListCode);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={12}>
              <AppFormItem
                name={'configPickList'}
                required
                label={frl('common.list')}
                rules={[
                  {
                    required: true,
                    message: fsrm('common.list'),
                  },
                ]}
              >
                <AppSelectLoadMore
                  disabled={disabled}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  onGetOptions={onGetPickLists}
                  placeholder={messages['common.listHint'] as string}
                  onChange={handleChoosePickList}
                />
              </AppFormItem>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <AppFormItem name={'isMultiChoice'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.acceptMultiChoice']}
              disabled={disabled}
            />
          </AppFormItem>
          <AppFormItem name={'isRequired'} valuePropName='checked'>
            <AppCheckbox
              label={messages['common.required']}
              disabled={disabled}
            />
          </AppFormItem>
        </Col>
        {pickListCode && (
          <Col span={24}>
            <AppTableContainer
              isShowTitle={false}
              loading={loading}
              className=''
              total={0}
              pagination={false}
              columns={loading ? [] : columns}
              dataSource={loading ? [] : dataSource}
              pageSize={10000}
            />
          </Col>
        )}
      </Row>
    </>
  );
};
export default PickListComponent;
