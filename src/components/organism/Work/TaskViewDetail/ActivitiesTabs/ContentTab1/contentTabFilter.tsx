import { Col, Form, Row } from 'antd';
import AppForm from 'components/atoms/AppForm';
import AppFormItem from 'components/atoms/AppFormItem';
import AppSearch from 'components/atoms/AppSearch';
import { useIntl } from 'react-intl';
import SearchImg from 'assets/icon/search.png';
import AppPopConfirm from 'components/atoms/AppPopConfirm';
import AppRangePicker from 'components/atoms/AppRangePicker';
import AppSelect from 'components/atoms/AppSelect';
import CalendarImg from 'assets/icon/Calendar.png';
import ArrowDownImg from 'assets/icon/ArrowDown.png';
import IntlMessages from '@crema/utility/IntlMessages';
import { useEffect, useState } from 'react';
import { AppState } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';

type contentTabFilterProps = {
  workFlowStatus: Array<any>;
  handleChangeSearchParams: (params: any) => void;
};

const ContentTabFilter = (props: contentTabFilterProps) => {
  const dispatch = useDispatch();
  const { workFlowStatus, handleChangeSearchParams } = props;
  const [form] = Form.useForm();
  const [popForm] = Form.useForm();
  const [isOpenPop, setIsOpenPop] = useState(false);
  const { messages } = useIntl();

  return (
    <Row gutter={[16, 16]}>
      <Col flex={'none'}>
        <AppPopConfirm
          placement='bottomRight'
          title={<IntlMessages id='common.filter' />}
          openPop={isOpenPop}
          setOpenPop={setIsOpenPop}
          description={
            <>
              <AppForm form={popForm}>
                <AppFormItem
                  name='searchText'
                  label={messages['common.search'] as string}
                >
                  <AppSearch
                    onSearch={() => {
                      const searchParams = {
                        ...form.getFieldsValue(),
                        ...popForm.getFieldsValue(),
                      };
                      handleChangeSearchParams(searchParams);
                    }}
                    placeholder={messages['common.taskSearchHint'] as string}
                    suffix={<img src={SearchImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='status'
                  label={messages['common.status'] as string}
                >
                  <AppSelect
                    options={workFlowStatus}
                    placeholder={messages['common.statusHint'] as string}
                    mode='multiple'
                    maxTagCount={'responsive'}
                    suffixIcon={<img src={ArrowDownImg.src} alt='' />}
                  />
                </AppFormItem>
                <AppFormItem
                  name='time'
                  label={messages['common.time'] as string}
                >
                  <AppRangePicker
                    suffixIcon={<img src={CalendarImg.src} alt='' />}
                  />
                </AppFormItem>
              </AppForm>
            </>
          }
          icon={''}
          okText={'Áp dụng'}
          okButtonProps={{
            style: {
              padding: '6px 16px',
              height: '36px',
              minWidth: '100px',
              borderRadius: '8px',
              fontWeight: '500',
              backgroundColor: '#D1132A',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          cancelButtonProps={{
            style: {
              padding: '6px 16px',
              height: '36px',
              minWidth: '100px',
              borderRadius: '8px',
              fontWeight: '500',
              borderColor: '#D1132A',
              color: '#D1132A',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          cancelText='Đặt lại'
          onConfirm={() => {
            const searchParam = {
              ...form.getFieldsValue(),
              ...popForm.getFieldsValue(),
            };
            handleChangeSearchParams(searchParam);
            setIsOpenPop(false);
          }}
          onCancel={() => {
            popForm.resetFields();
            setIsOpenPop(true);
          }}
        />
      </Col>
    </Row>
  );
};
export default ContentTabFilter;
