import {Avatar, Checkbox, Col, List, Row} from 'antd';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import styles from './style.module.scss';

type EmployeeItemProps = {
  item: any;
};
const EmployeeItem = (props: EmployeeItemProps) => {
  const {item} = props;
  const {status, basicUserInfoDTO} = item;
  return (
    <List.Item key={basicUserInfoDTO?.ssoId}>
      <List.Item.Meta
        avatar={
          <>
            <Row gutter={[16, 16]} align={'middle'}>
              <Col className={styles.employees_item_checkbox}>
                {
                  // Nếu status không có hoặc bằng 3 (bị từ chối) thì hiển thị checkbox cho mời
                  (!status || status?.code == '3') && (
                    <Checkbox value={basicUserInfoDTO?.ssoId} />
                  )
                }
              </Col>
              <Col>
                <Avatar
                  size={48}
                  src={basicUserInfoDTO?.avatar ?? EmptyAvatar}
                />
              </Col>
            </Row>
          </>
        }
        title={basicUserInfoDTO?.fullName ?? '--'}
        description={
          <>
            <p>
              {basicUserInfoDTO?.phone ?? '--'}
              <span>{basicUserInfoDTO?.email ?? '--'}</span>
            </p>
            {status && (
              <p
                className={styles.employees_item_status}
                style={{color: `#${status?.color}`}}
              >
                {status?.name}
              </p>
            )}
          </>
        }
      />
    </List.Item>
  );
};

export default EmployeeItem;
