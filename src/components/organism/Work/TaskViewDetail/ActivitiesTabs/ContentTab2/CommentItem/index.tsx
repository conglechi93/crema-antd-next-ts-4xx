import IntlMessages from '@crema/utility/IntlMessages';
import {Avatar, Col, List, Row} from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import styles from './styles.module.scss';

type PropsTypes = {
  item: any;
  index: number;
};
const CommentItem = (props: PropsTypes) => {
  const {item, index} = props;
  return (
    <List.Item className={styles.commentItem}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
          />
        }
        title={<a href='https://ant.design'>{item.title}</a>}
        description={
          <Row gutter={[0, 0]}>
            <Col xs={7}>
              <Row gutter={[10, 0]}>
                <Col xs={24}>
                  <AppTypo variant='p-lg-semi'>
                    {item?.createdBy?.name ?? ''}
                  </AppTypo>
                </Col>
                <Col xs={24}>{`SĐT: ${item?.createdBy?.phone ?? ''}`}</Col>
                <Col xs={24}>{`${item?.createdDate ?? ''}`}</Col>
              </Row>
            </Col>
            <Col xs={17}>
              <Row gutter={[10, 10]}>
                <Col xs={24}>
                  <AppTypo variant='p-lg-semi'>
                    <IntlMessages id='common.content' />
                  </AppTypo>
                </Col>
                <Col xs={24}>
                  <div
                    dangerouslySetInnerHTML={{__html: item?.content ?? ''}}
                  ></div>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
    </List.Item>
  );
};

export default CommentItem;
