import {Checkbox, Col, List, Row} from 'antd';
import useStep1 from './useStep1';
import AppSearch from 'components/atoms/AppSearch';
import {useIntl} from 'react-intl';
import SearchImg from 'assets/icon/search.png';

type PropsTypes = {
  current: number;
  setPropertyCodeConditions: (conditions: any) => void;
};
const Step1 = (props: PropsTypes) => {
  const {current, setPropertyCodeConditions} = props;
  const {propertyList} = useStep1(current);
  const {messages} = useIntl();
  return (
    <>
      <Row gutter={[16, 16]} style={{width: '50%', margin: '0 auto'}}>
        <Col xs={24}>
          <AppSearch
            placeholder={messages['common.search'] as string}
            suffix={<img src={SearchImg.src} alt='' />}
          />
        </Col>
        <Col xs={24}>
          <Checkbox.Group
            style={{width: '100%'}}
            onChange={(e) => {
              setPropertyCodeConditions(e);
            }}
          >
            <List
              style={{width: '100%'}}
              itemLayout='horizontal'
              dataSource={propertyList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Checkbox value={item.code} />}
                    title={<p>{item.name}</p>}
                  />
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </Col>
      </Row>
    </>
  );
};
export default Step1;
