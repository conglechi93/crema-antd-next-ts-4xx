'use client';
import React from 'react';
import TaskSideBar from './TaskSideBar/index';
import TasksList from './TasksList';
import TaskDetail from './TaskDetail';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter } from 'next/navigation';
import TodoContextProvider from '../context/TodoContextProvider';

const ToDo = () => {
  const params = useParams();

  const onGetMainComponent = () => {
    if (params?.all?.[2]) {
      return <TaskDetail />;
    } else {
      return <TasksList />;
    }
  };

  const { messages } = useIntl();
  return (
    <TodoContextProvider>
      <AppsContainer
        title={messages['todo.todoApp'] as string}
        sidebarContent={<TaskSideBar />}
      >
        <AppPageMeta title='Todo App' />
        {onGetMainComponent()}
      </AppsContainer>
    </TodoContextProvider>
  );
};

export default ToDo;
