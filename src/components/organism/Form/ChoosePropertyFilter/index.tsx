import { Col, Divider, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import useChooseInventoryFilter from './useChoosePropertyFilter';
import AppSearch from 'components/atoms/AppSearch';
import AppFormItem from 'components/atoms/AppFormItem';
import SearchImg from 'assets/icon/search.png';
import AppButton from 'components/atoms/AppButton';
import { FormInstance } from 'antd/lib';
import { useIntl } from 'react-intl';
import AppSelectAll from 'components/atoms/AppSelectAll';

type ChoosePropertyFilterProps = {
  form: FormInstance;
  handleChangeSearchParams: (params: any) => void;
};
const ChoosePropertyFilter = (props: ChoosePropertyFilterProps) => {
  const { form, handleChangeSearchParams } = props;
  const { messages } = useIntl();
  const { dataTypeOptions, setDataTypeOptions, handleSearch, handleResetForm } =
    useChooseInventoryFilter(form, handleChangeSearchParams);
  return (
    <div>
      <AppForm form={form}>
        <Row gutter={[8, 8]}>
          <Col flex={'auto'}>
            <Row gutter={[8, 8]}>
              <Col xs={12}>
                <AppFormItem name={'searchText'}>
                  <AppSearch
                    onSearch={handleSearch}
                    placeholder={
                      messages['common.propertySearchHint'] as string
                    }
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
              </Col>
              <Col xs={12}>
                <AppFormItem name={'dataTypeCode'}>
                  <AppSelectAll
                    form={form}
                    placeholder={messages['common.dataType'] as string}
                    options={dataTypeOptions}
                    fieldName='dataTypeCode'
                    mode='multiple'
                  />
                </AppFormItem>
              </Col>
            </Row>
          </Col>
          <Col md={{ flex: 'none' }}>
            <AppButton type='primary' onClick={handleSearch}>
              Tìm kiếm
            </AppButton>
          </Col>
        </Row>
      </AppForm>
    </div>
  );
};

export default ChoosePropertyFilter;
