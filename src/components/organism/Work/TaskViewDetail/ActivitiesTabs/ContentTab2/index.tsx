import {Col, List, Row, Skeleton} from 'antd';
import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import useContentTab2 from './useContentTab2';
import AppButton from 'components/atoms/AppButton';
import CommentItem from './CommentItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../style.module.scss';

type PropsTypes = {
  activeValue: string;
  record: any;
};

const ContentTab2 = (props: PropsTypes) => {
  const {activeValue, record} = props;
  const editorConfiguration: any = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  };
  const {
    content,
    setContent,
    handleCreateComment,
    commentList,
    handleLoadMoreData,
    loading,
  } = useContentTab2(activeValue, record);
  return (
    <Row gutter={[10, 10]}>
      <Col xs={24}>
        <div
          id='scrollableDiv'
          style={{
            maxHeight: 300,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            className={styles.infiniteScroll}
            dataLength={commentList.length}
            next={handleLoadMoreData}
            hasMore={false}
            loader={loading && <Skeleton avatar paragraph={{rows: 1}} active />}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={commentList}
              renderItem={(item: any, index: number) => (
                <CommentItem item={item} index={index} />
              )}
              locale={{emptyText: <p>Chưa có bình luận nào</p>}}
              // loadMore
            />
          </InfiniteScroll>
        </div>
      </Col>

      {/* Comment */}
      <Col xs={24}>
        <Row gutter={[10, 10]}>
          <Col xs={24}>
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              data={content}
              onChange={(event: any, editor: any) => {
                const editorData = editor.getData();
                setContent(editorData);
              }}
            />
          </Col>
          <Col flex={'auto'} style={{textAlign: 'right'}}>
            <AppButton type='primary' onClick={handleCreateComment}>
              {/* <AppControlAction variant='send' /> */}
              Bình luận
            </AppButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ContentTab2;
