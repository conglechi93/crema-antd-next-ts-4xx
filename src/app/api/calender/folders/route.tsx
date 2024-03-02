import folderList from '@crema/fakedb/apps/todo/folderList';
import todoList from '@crema/fakedb/apps/todo/todoList';
import { labelList } from '@crema/fakedb/apps/todo/labelList';
import { NextRequest } from 'next/server';
import { TodoObjType } from '@crema/types/models/apps/Todo';

const onGetTaskList = (name: string, data: TodoObjType[]) => {
  switch (name) {
    case 'all': {
      return data.filter((task) => task.folderValue !== 126);
    }

    case 'starred': {
      return data.filter((task) => task.folderValue !== 126 && task.isStarred);
    }

    case 'priority': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.priority.type === 1,
      );
    }

    case 'scheduled': {
      const folderId = folderList.find((folder) => folder.alias === name)?.id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'today': {
      const folderId = folderList.find((folder) => folder.alias === name)?.id;
      return data.filter((task) => task.folderValue === folderId);
    }

    case 'completed': {
      return data.filter(
        (task) => task.folderValue !== 126 && task.status === 3,
      );
    }

    case 'deleted': {
      return data.filter((task) => task.folderValue === 126);
    }
    default: {
      return data;
    }
  }
};

let todoData = todoList;
export const GET = async () => {
  try {
    return new Response(JSON.stringify(folderList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { taskIds, type, name, page } = reqBody;
    todoData = todoData.map((task) => {
      if (taskIds.includes(task.id)) {
        task.folderValue = 126;
        return task;
      } else {
        return task;
      }
    });
    let folderTaskList = [];
    if (type === 'folder') {
      folderTaskList = onGetTaskList(name, todoData);
    } else {
      const labelType = labelList?.find((label) => label?.alias === name)?.id;
      folderTaskList = todoData.filter((task) => {
        const label = task.label.find((label) => label.id === labelType);
        if (label && task.folderValue !== 126) {
          return task;
        } else return null;
      });
    }
    const index = page * 15;
    const count = folderTaskList.length;
    const data =
      folderTaskList.length > 15
        ? folderTaskList.slice(index, index + 15)
        : folderTaskList;
    return new Response(JSON.stringify({ data, count }), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
