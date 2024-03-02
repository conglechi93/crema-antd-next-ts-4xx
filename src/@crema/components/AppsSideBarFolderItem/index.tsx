'use client';
import React from 'react';
import NavLink from 'next/link';
import {
  FaRegCheckCircle,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaRegStar,
} from 'react-icons/fa';
import { BiArchiveIn, BiCalendarMinus, BiUser } from 'react-icons/bi';
import {
  AiOutlineDelete,
  AiOutlineSchedule,
  AiOutlineSend,
  AiOutlineStop,
} from 'react-icons/ai';
import { FiInfo, FiRefreshCw } from 'react-icons/fi';

import {
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
} from './index.styled';
import { MdOutlineCancel, MdOutlinePayment } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
const IconByName: any = {
  sent: <AiOutlineSend />,
  paid: <MdOutlinePayment />,
  declined: <AiOutlineStop />,
  cancelled: <MdOutlineCancel />,
  'check-circle': <FaRegCheckCircle />,
  envelope: <FaRegEnvelope />,
  star: <FaRegStar />,
  'calendar-minus': <BiCalendarMinus />,
  user: <BiUser />,
  clock: <AiOutlineSchedule />,
  'envelope-open': <FaRegEnvelopeOpen />,
  'trash-alt': <AiOutlineDelete />,
  'file-archive': <BiArchiveIn />,
  'question-circle': <FiInfo />,
  clone: <FiRefreshCw />,
};

type AppsSideBarFolderItemProps = {
  item: any;
  path: string;
};

const AppsSideBarFolderItem: React.FC<AppsSideBarFolderItemProps> = ({
  item,
  path,
}) => {
  const pathname = usePathname();
  return (
    <StyledListItem key={item.id}>
      <NavLink
        href={path}
        className={clsx({
          active: path === pathname,
        })}
        // activeClassName='active'
      >
        <StyledListItemIcon>{IconByName[item.icon]}</StyledListItemIcon>
        <StyledListItemText>{item.name}</StyledListItemText>
      </NavLink>
    </StyledListItem>
  );
};

export default AppsSideBarFolderItem;
