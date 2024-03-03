import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  onCreateTaskComment,
  onGetAllCommentsTaskLastest,
  onGetTaskComments,
} from 'redux/actions/Task';

const useContentTab2 = (activeValue: string, record: any) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<any>();
  const [attachments, setAttachments] = useState<any>([]);
  const [commentList, setCommentList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [taskComentSearchParams, setTaskComentSearchParams] = useState<any>({
    page: 1,
    pageSize: 5,
    taskCode: record?.code,
    isLoadMore: true,
  });
  const fetchTaskComments = async (loadmore?: boolean) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const taskCode = record?.code;
    const reqParams = {
      taskCode: taskCode,
      page: 1,
      pageSize: 100,
      isLoadMore: true,
    };
    const res: any = await dispatch(onGetTaskComments(reqParams));
    if (res) {
      setTaskComentSearchParams(reqParams);
    }
    const comments: Array<any> = res?.elements || [];
    const data = loadmore ? [...commentList, ...comments] : comments;
    setCommentList(data);
    setLoading(false);
  };
  useEffect(() => {
    if (activeValue === '2') {
      fetchTaskComments();
    }
  }, [activeValue, record]);

  const handleCreateComment = async () => {
    const reqParams = {
      taskCode: record?.code,
      content: content,
      attachments: attachments,
    };
    await dispatch(onCreateTaskComment(reqParams));
    const lastComment = commentList[0];
    if (lastComment) {
      const reqParams2 = {
        code: lastComment?.code,
        taskCode: record?.code,
      };
      const res: any = await dispatch(onGetAllCommentsTaskLastest(reqParams2));
      if (res) {
        const comments: Array<any> = res || [];

        setCommentList([...comments, ...commentList]);
      } else {
        fetchTaskComments();
      }
    } else {
      fetchTaskComments();
    }
    setContent('');
  };

  const handleLoadMoreData = () => {
    fetchTaskComments(true);
  };
  return {
    content,
    setContent,
    handleCreateComment,
    commentList,
    handleLoadMoreData,
    loading,
  };
};
export default useContentTab2;
