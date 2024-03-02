import React, { useEffect } from 'react';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailBody from './TaskDetailBody';
import { useParams } from 'next/navigation';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { MailDetailSkeleton } from '@crema/components/AppSkeleton/MailDetailSkeleton';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { TodoObjType } from '@crema/types/models/apps/Todo';

const TaskDetail = () => {
  const params = useParams();
  const [{ apiData: selectedTask }, { setQueryParams, setData }] =
    useGetDataApi<TodoObjType>(
      'calender/detail',
      undefined,
      { id: params?.all?.[params.all.length - 1] },
      false,
    );

  useEffect(() => {
    setQueryParams({ id: params?.all?.[params.all.length - 1] });
  }, [params.all]);

  const onUpdateSelectedTask = (data: TodoObjType) => {
    setData(data);
  };

  if (!selectedTask) {
    return <MailDetailSkeleton />;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
