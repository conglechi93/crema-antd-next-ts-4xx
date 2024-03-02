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
import type {
  ConnectionObjType,
  FolderObjType,
  LabelObjType,
  MailObjType,
} from '@crema/types/models/apps/Mail';
import { APIDataProps } from '@crema/types/models/APIDataProps';

export type MailContextType = {
  labelList: LabelObjType[];
  connectionList: ConnectionObjType[];
  folderList: FolderObjType[];
  mailList: APIDataProps<MailObjType[]>;
  loading: boolean;
  page: number;
  all: string | string[] | undefined;
  folder: string;
  label: string;
};

export type MailActionContextType = {
  setMailData: (data: APIDataProps<MailObjType[]>) => void;
  onPageChange: (data: number) => void;
};

const ContextState: MailContextType = {
  labelList: [],
  folderList: [],
  connectionList: [],
  mailList: {} as APIDataProps<MailObjType[]>,
  loading: false,
  page: 0,
  all: '',
  folder: '',
  label: '',
};

const MailContext = createContext<MailContextType>(ContextState);
const MailActionsContext = createContext<MailActionContextType>({
  setMailData: (data: APIDataProps<MailObjType[]>) => {},
  onPageChange: (data: number) => {},
});

export const useMailContext = () => useContext(MailContext);

export const useMailActionsContext = () => useContext(MailActionsContext);

type Props = {
  children: ReactNode;
};
export const MailContextProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const { all } = params;
  let folder = '',
    label = '';

  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const [{ apiData: labelList }] = useGetDataApi<LabelObjType[]>('mail/labels');
  const [{ apiData: connectionList }] =
    useGetDataApi<ConnectionObjType[]>('mail/connection');
  const [{ apiData: folderList }] =
    useGetDataApi<FolderObjType[]>('mail/folders');
  const [page, setPage] = useState(0);

  const [
    { apiData: mailList, loading },
    { setQueryParams, setData: setMailData },
  ] = useGetDataApi<APIDataProps<MailObjType[]>>(
    'mail/folders/list',
    undefined,
    {
      type: all?.[0],
      name: all?.[1],
      page: page,
    },
    false,
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    setQueryParams({
      type: all?.[0],
      name: all?.[1],
      page,
    });
  }, [page, pathname, all]);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  return (
    <MailContext.Provider
      value={{
        all,
        folder,
        label,
        labelList,
        connectionList,
        folderList,
        mailList,
        loading,
        page,
      }}
    >
      <MailActionsContext.Provider
        value={{
          setMailData,
          onPageChange,
        }}
      >
        {children}
      </MailActionsContext.Provider>
    </MailContext.Provider>
  );
};
export default MailContextProvider;
