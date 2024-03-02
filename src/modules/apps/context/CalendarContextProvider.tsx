'use client';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { useParams, usePathname, useRouter } from 'next/navigation';

import {
  FolderObjType,
  LabelObjType,
  PriorityObjType,
  StaffObjType,
  StatusObjType,
  TodoObjType,
} from '@crema/types/models/apps/Todo';
import { APIDataProps } from '@crema/types/models/APIDataProps';

type FilterDataType = {
  status: number[];
  priority: number[];
};

export type CalendarContextType = {
  labelList: LabelObjType[];
  folderList: FolderObjType[];
  priorityList: PriorityObjType[];
  staffList: StaffObjType[];
  statusList: StatusObjType[];
  taskLists: APIDataProps<TodoObjType[]>;
  filterData: FilterDataType;
  loading: boolean;
  page: number;
};

export type CalendarActionContextType = {
  setCalenderData: (data: APIDataProps<TodoObjType[]>) => void;
  setQueryParams: (data: object) => void;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    data: number,
  ) => void;
  reCallAPI: () => void;
  setPage: (data: number) => void;
  setFilterData: (data: FilterDataType) => void;
};

const ContextState: CalendarContextType = {
  labelList: [],
  folderList: [],
  priorityList: [],
  staffList: [],
  statusList: [],
  taskLists: {} as APIDataProps<TodoObjType[]>,
  filterData: {
    status: [],
    priority: [],
  },
  loading: false,
  page: 0,
};

const CalendarContext = createContext<CalendarContextType>(ContextState);
const CalendarActionsContext = createContext<CalendarActionContextType>({
  setCalenderData: (data: APIDataProps<TodoObjType[]>) => {},
  setQueryParams: (data: object) => {},
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    data: number,
  ) => {},
  reCallAPI: () => {},
  setPage: (data: number) => {},
  setFilterData: (data: FilterDataType) => {},
});

export const useCalendarContext = () => useContext(CalendarContext);

export const useCalendarActionsContext = () =>
  useContext(CalendarActionsContext);

type Props = {
  children: ReactNode;
};

export const CalendarContextProvider = ({ children }: Props) => {
  const [filterData, setFilterData] = useState<FilterDataType>({
    status: [],
    priority: [],
  });
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { all } = params;
  let folder;
  let label;

  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const [{ apiData: labelList }] =
    useGetDataApi<LabelObjType[]>('calender/labels');
  const [{ apiData: priorityList }] =
    useGetDataApi<PriorityObjType[]>('calender/priority');
  const [{ apiData: staffList }] =
    useGetDataApi<StaffObjType[]>('calender/staff');
  const [{ apiData: folderList }] = useGetDataApi<FolderObjType[]>(
    'calender/folders',
    [],
  );
  const [{ apiData: statusList }] = useGetDataApi<StatusObjType[]>(
    'calender/status',
    [],
  );
  const [page, setPage] = useState(0);

  const [
    { apiData: taskLists, loading },
    { setQueryParams, setData: setCalenderData, reCallAPI },
  ] = useGetDataApi<APIDataProps<TodoObjType[]>>(
    'calender',
    undefined,
    {},
    false,
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    setQueryParams({
      type: all?.[0],
      name: all?.[1],
      page: page,
    });
  }, [page, all, folder, label]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number,
  ) => {
    setPage(value);
  };

  const getFilterData = (): APIDataProps<TodoObjType[]> => {
    if (taskLists?.data) {
      const data = taskLists?.data?.filter((task) => {
        let status = true;
        if (filterData.status.length > 0) {
          status = filterData.status.includes(task.status);
        }
        let priority = true;
        if (filterData.priority.length > 0) {
          priority = filterData.priority.includes(task.priority.id);
        }
        return status && priority;
      });
      return {
        data,
        count: data.length,
      };
    }
    return {} as APIDataProps<TodoObjType[]>;
  };

  return (
    <CalendarContext.Provider
      value={{
        labelList,
        priorityList,
        staffList,
        statusList,
        folderList,
        filterData,
        taskLists: getFilterData(),
        loading,
        page,
      }}
    >
      <CalendarActionsContext.Provider
        value={{
          setCalenderData,
          onPageChange,
          setQueryParams,
          reCallAPI,
          setPage,
          setFilterData,
        }}
      >
        {children}
      </CalendarActionsContext.Provider>
    </CalendarContext.Provider>
  );
};
export default CalendarContextProvider;
