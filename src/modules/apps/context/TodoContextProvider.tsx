'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { useParams, usePathname } from 'next/navigation';
import {
  FolderObjType,
  LabelObjType,
  PriorityObjType,
  StaffObjType,
  StatusObjType,
  TodoObjType,
} from '@crema/types/models/apps/Todo';
import { APIDataProps } from '@crema/types/models/APIDataProps';

export const ViewMode = {
  List: 'list',
  Calendar: 'calendar',
};

export type TodoContextType = {
  labelList: LabelObjType[];
  folderList: FolderObjType[];
  priorityList: PriorityObjType[];
  staffList: StaffObjType[];
  statusList: StatusObjType[];
  taskLists: APIDataProps<TodoObjType[]>;
  loading: boolean;
  page: number;
  viewMode: string;
  folder: string;
  label: string;
};

export type TodoActionContextType = {
  setTodoData: (data: APIDataProps<TodoObjType[]>) => void;
  setQueryParams: (data: object) => void;
  onPageChange: (data: number) => void;
  reCallAPI: () => void;
  setPage: (data: number) => void;
  setViewMode: (data: string) => void;
};

const ContextState: TodoContextType = {
  labelList: [],
  folderList: [],
  priorityList: [],
  staffList: [],
  statusList: [],
  taskLists: {} as APIDataProps<TodoObjType[]>,

  loading: false,
  page: 0,
  viewMode: 'list',
  folder: '',
  label: '',
};

const TodoContext = createContext<TodoContextType>(ContextState);
const TodoActionsContext = createContext<TodoActionContextType>({
  setTodoData: (data: APIDataProps<TodoObjType[]>) => {},
  setQueryParams: (data: object) => {},
  onPageChange: (data: number) => {},
  reCallAPI: () => {},
  setPage: (data: number) => {},
  setViewMode: (data: string) => {},
});

export const useTodoContext = () => useContext(TodoContext);

export const useTodoActionsContext = () => useContext(TodoActionsContext);

type Props = {
  children: ReactNode;
};
export const TodoContextProvider = ({ children }: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { all } = params;
  let folder = '',
    label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const [viewMode, setViewMode] = useState(ViewMode.List);
  const [{ apiData: labelList }] = useGetDataApi<LabelObjType[]>('todo/labels');
  const [{ apiData: priorityList }] =
    useGetDataApi<PriorityObjType[]>('todo/priority');
  const [{ apiData: staffList }] = useGetDataApi<StaffObjType[]>('todo/staff');
  const [{ apiData: folderList }] = useGetDataApi<FolderObjType[]>(
    'todo/folders',
    [],
  );
  const [{ apiData: statusList }] = useGetDataApi<StatusObjType[]>(
    'todo/status',
    [],
  );
  const [page, setPage] = useState(0);

  const [
    { apiData: taskLists, loading },
    { setQueryParams, setData: setTodoData, reCallAPI },
  ] = useGetDataApi<APIDataProps<TodoObjType[]>>('todo', undefined, {}, false);

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    if (folder || label)
      setQueryParams({
        type: all?.[0],
        name: all?.[1],
        page: page,
      });
  }, [page, all]);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  return (
    <TodoContext.Provider
      value={{
        folder,
        label,
        labelList,
        priorityList,
        staffList,
        statusList,
        folderList,
        taskLists,
        loading,
        page,
        viewMode,
      }}
    >
      <TodoActionsContext.Provider
        value={{
          setTodoData,
          onPageChange,
          setQueryParams,
          reCallAPI,
          setPage,
          setViewMode,
        }}
      >
        {children}
      </TodoActionsContext.Provider>
    </TodoContext.Provider>
  );
};
export default TodoContextProvider;
