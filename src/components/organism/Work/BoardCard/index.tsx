'use client';
import { Card, Col, Divider, Row } from 'antd';
import styles from './style.module.scss';
import AppTypo from 'components/atoms/AppTypo';
import AppTag from 'components/atoms/AppTag';
// import AvatarList from 'ant-design-pro/lib/AvatarList';
import EmptyAvatar from 'assets/profile/empty-avatar.svg';
import 'ant-design-pro/dist/ant-design-pro.css';
import { memo } from 'react';
import clsx from 'clsx';

const BoardCard = (props: any) => {
  const { startDate, endDate, priority, onClick } = props;
  console.log('props', props);
  const assignees: Array<any> = props?.assignees ?? [];

  return (
    <Card
      title={props?.title}
      bordered={false}
      style={{ width: 300, cursor: 'pointer' }}
      className={clsx({
        [styles.board_card]: true,
        [styles.isExpired]: props?.isExpired,
      })}
      onClick={onClick}
    >
      <Row gutter={[0, 8]}>
        <Col xs={24}>
          <div dangerouslySetInnerHTML={{ __html: props?.description }}></div>
        </Col>
        <Col xs={24}>
          <Row gutter={[0, 8]}>
            <Col xs={20}>
              {startDate &&
                endDate &&
                `${startDate?.slice(-10)} - ${endDate?.slice(-10)}`}
            </Col>
            <Col xs={4}>
              <AppTypo variant='p-md-semi'>{`(${
                props?.progress || 0
              }%)`}</AppTypo>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <AppTag
            title={priority?.name ?? 'Trống'}
            color={`#${priority?.color ?? 'bdbdbd'}`}
          />
        </Col>
        <Divider style={{ padding: 0, margin: 0 }} />
        {/* <Col xs={24}>
          <AvatarList>
            {assignees?.map((item: any) => (
              <AvatarList.Item
                size={32}
                tips={item?.name}
                src={item?.avatar ?? EmptyAvatar.src}
              />
            ))}
          </AvatarList>
        </Col> */}
      </Row>
    </Card>
  );
};

export default memo(BoardCard);
