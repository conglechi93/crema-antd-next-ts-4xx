import folderList from '@crema/fakedb/apps/todo/folderList';
import { labelList } from '@crema/fakedb/apps/todo/labelList';
import { NextRequest } from 'next/server';
import todoList from '@crema/fakedb/apps/todo/todoList';
import { TodoObjType } from '@crema/types/models/apps/Todo';

let todoData = todoList;
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
      }
      return task;
    });
    let folderTaskList: TodoObjType[] = [];
    if (type === 'folder') {
      folderTaskList = onGetTaskList(name, todoData);
    } else {
      const labelType = labelList.find((label) => label.alias === name)?.id;
      folderTaskList = todoData.filter((task) => {
        const label = task.label.find((label) => label.id === labelType);
        if (label && task.folderValue !== 126) {
          return task;
        }
        return null;
      });
    }
    const index = page * 15;
    const total = folderTaskList.length;
    const list =
      folderTaskList.length > 15
        ? folderTaskList.slice(index, index + 15)
        : folderTaskList;
    return new Response(JSON.stringify({ data: list, count: total }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
