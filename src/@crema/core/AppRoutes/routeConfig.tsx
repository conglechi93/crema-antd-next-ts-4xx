import React from 'react';
import { HiOutlineAcademicCap, HiOutlineChartSquareBar } from 'react-icons/hi';
import {
  RiBarChart2Line,
  RiCustomerService2Line,
  RiDashboardLine,
  RiShieldUserLine,
  RiTodoLine,
} from 'react-icons/ri';
import {
  BiBookReader,
  BiCartAlt,
  BiDollar,
  BiErrorCircle,
  BiRss,
  BiTask,
} from 'react-icons/bi';
import {
  MdInvertColors,
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineDns,
  MdOutlineManageAccounts,
  MdTimeline,
} from 'react-icons/md';
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
} from 'react-icons/bs';
import { FaRegCalendarAlt, FaRegHospital, FaRegImages } from 'react-icons/fa';
import { CgAttachment, CgFeed, CgUserList } from 'react-icons/cg';
import { FiMail, FiMap, FiUsers } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { DiHtml5Multimedia } from 'react-icons/di';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import { GrUserAdmin } from 'react-icons/gr';
import { TbFileInvoice } from 'react-icons/tb';

const routesConfig = [
  {
    id: 'dashboardss',
    title: 'Application',
    messageId: 'common.edit',
    type: 'group',
    children: [
      {
        id: 'crypto',
        title: 'Crypto',
        messageId: 'sidebar.app.dashboard.crypto',
        icon: <BsCurrencyBitcoin />,
        path: '/dashboards/crypto',
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps',
    messageId: 'common.add',
    type: 'group',
    children: [
      {
        id: 'scrum-board',
        title: 'Scrum Board',
        messageId: 'sidebar.apps.scrumboard',
        icon: <MdOutlineDns />,
        path: '/apps/scrum-board',
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps',
    messageId: 'common.add',
    type: 'group',
    children: [
      {
        id: 'scrum-board',
        title: 'Scrum Board',
        messageId: 'sidebar.apps.scrumboard',
        icon: <MdOutlineDns />,
        path: '/project-management/inventory-warehouse',
      },
    ],
  },
  {
    id: 'product-management',
    title: 'Product Management',
    messageId: 'navbar.productManagement',
    type: 'group',
    children: [
      {
        id: 'inventory-warehouse',
        title: 'inventory-warehouse',
        messageId: 'common.inventoryWarehouse',
        icon: <MdOutlineDns />,
        path: '/project-management/inventory-warehouse',
      },
    ],
  },
  {
    id: 'sales-management',
    title: 'Quản lý bán hàng',
    messageId: 'navbar.salesManagement',
    type: 'collapse',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.3327 18.333H1.66602'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M16.666 18.3337V9.16699'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M3.33398 18.3337V9.16699'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M13.7725 1.66699H6.22613C5.22378 1.66699 4.72261 1.66699 4.31985 1.91591C3.9171 2.16482 3.69297 2.61309 3.24471 3.50961L3.24471 3.50961L2.15683 6.25962C1.83254 7.07938 1.53945 8.08261 2.17211 8.69655C2.47217 8.98773 2.88145 9.16699 3.33261 9.16699C4.25308 9.16699 4.99928 8.4208 4.99928 7.50033C4.99928 8.4208 5.74547 9.16699 6.66594 9.16699C7.58642 9.16699 8.33261 8.4208 8.33261 7.50033C8.33261 8.4208 9.0788 9.16699 9.99928 9.16699C10.9198 9.16699 11.6659 8.4208 11.6659 7.50033C11.6659 8.4208 12.4121 9.16699 13.3326 9.16699C14.2531 9.16699 14.9993 8.4208 14.9993 7.50033C14.9993 8.4208 15.7455 9.16699 16.6659 9.16699C17.1171 9.16699 17.5264 8.98772 17.8265 8.69653C18.4592 8.08261 18.1661 7.07938 17.8418 6.25961L16.7539 3.50961C16.3057 2.61309 16.0815 2.16482 15.6788 1.91591C15.276 1.66699 14.7748 1.66699 13.7725 1.66699Z'
          stroke='#6C6868'
          stroke-linejoin='round'
        />
        <path
          d='M7.91602 17.9163V15.4163C7.91602 14.6375 7.91602 14.2481 8.08348 13.958C8.19319 13.768 8.35099 13.6102 8.54102 13.5005C8.83108 13.333 9.2205 13.333 9.99935 13.333C10.7782 13.333 11.1676 13.333 11.4577 13.5005C11.6477 13.6102 11.8055 13.768 11.9152 13.958C12.0827 14.2481 12.0827 14.6375 12.0827 15.4163V17.9163'
          stroke='#6C6868'
          stroke-linecap='round'
        />
      </svg>
    ),
    children: [
      {
        id: 'sales-program',
        title: 'Chương trình bán hàng',
        messageId: 'common.salesProgram',
        type: 'item',
        url: '/sales-management/sales-program',
      },
      {
        id: 'transaction-management',
        title: 'Quản lý giao dịch',
        messageId: 'common.transactionManagement',
        type: 'item',
        url: '/sales-management/transaction-management',
      },
    ],
  },
  {
    id: 'customer-management',
    title: 'Quản lý khách hàng',
    messageId: 'navbar.customerManagement',
    type: 'collapse',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='9.99935' cy='4.99935' r='3.33333' stroke='#6C6868' />
        <path
          d='M15 7.50065C16.3807 7.50065 17.5 6.56791 17.5 5.41732C17.5 4.26672 16.3807 3.33398 15 3.33398'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M5 7.50065C3.61929 7.50065 2.5 6.56791 2.5 5.41732C2.5 4.26672 3.61929 3.33398 5 3.33398'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <ellipse cx='10' cy='14.1673' rx='5' ry='3.33333' stroke='#6C6868' />
        <path
          d='M16.666 15.8327C18.1279 15.5121 19.166 14.7002 19.166 13.7493C19.166 12.7985 18.1279 11.9866 16.666 11.666'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M3.33398 15.8327C1.87211 15.5121 0.833984 14.7002 0.833984 13.7493C0.833984 12.7985 1.87211 11.9866 3.33398 11.666'
          stroke='#6C6868'
          stroke-linecap='round'
        />
      </svg>
    ),
    children: [
      {
        id: 'customer-list',
        title: 'Danh sách khách hàng',
        messageId: 'common.customerList',
        type: 'item',
        url: '/customer-management/customer-list',
      },
    ],
  },
  {
    id: 'task-management',
    title: 'Quản lý công việc',
    messageId: 'navbar.taskManagement',
    type: 'collapse',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='9.99935' cy='4.99935' r='3.33333' stroke='#6C6868' />
        <path
          d='M15 7.50065C16.3807 7.50065 17.5 6.56791 17.5 5.41732C17.5 4.26672 16.3807 3.33398 15 3.33398'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M5 7.50065C3.61929 7.50065 2.5 6.56791 2.5 5.41732C2.5 4.26672 3.61929 3.33398 5 3.33398'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <ellipse cx='10' cy='14.1673' rx='5' ry='3.33333' stroke='#6C6868' />
        <path
          d='M16.666 15.8327C18.1279 15.5121 19.166 14.7002 19.166 13.7493C19.166 12.7985 18.1279 11.9866 16.666 11.666'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <path
          d='M3.33398 15.8327C1.87211 15.5121 0.833984 14.7002 0.833984 13.7493C0.833984 12.7985 1.87211 11.9866 3.33398 11.666'
          stroke='#6C6868'
          stroke-linecap='round'
        />
      </svg>
    ),
    children: [
      {
        id: 'task',
        title: 'Quản lý công việc',
        messageId: 'navbar.taskManagement',
        type: 'item',
        url: '/task-management/task',
      },
    ],
  },
  {
    id: 'category-management',
    title: 'Quản lý danh mục',
    messageId: 'navbar.catetoryManagement',
    type: 'collapse',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M2.08398 5.41634C2.08398 3.84499 2.08398 3.05932 2.57214 2.57116C3.0603 2.08301 3.84597 2.08301 5.41732 2.08301C6.98867 2.08301 7.77434 2.08301 8.2625 2.57116C8.75065 3.05932 8.75065 3.84499 8.75065 5.41634C8.75065 6.98769 8.75065 7.77336 8.2625 8.26152C7.77434 8.74967 6.98867 8.74967 5.41732 8.74967C3.84597 8.74967 3.0603 8.74967 2.57214 8.26152C2.08398 7.77336 2.08398 6.98769 2.08398 5.41634Z'
          stroke='#6C6868'
        />
        <path
          d='M11.25 14.5833C11.25 13.012 11.25 12.2263 11.7382 11.7382C12.2263 11.25 13.012 11.25 14.5833 11.25C16.1547 11.25 16.9404 11.25 17.4285 11.7382C17.9167 12.2263 17.9167 13.012 17.9167 14.5833C17.9167 16.1547 17.9167 16.9404 17.4285 17.4285C16.9404 17.9167 16.1547 17.9167 14.5833 17.9167C13.012 17.9167 12.2263 17.9167 11.7382 17.4285C11.25 16.9404 11.25 16.1547 11.25 14.5833Z'
          stroke='#6C6868'
        />
        <path
          d='M2.08398 14.5833C2.08398 13.012 2.08398 12.2263 2.57214 11.7382C3.0603 11.25 3.84597 11.25 5.41732 11.25C6.98867 11.25 7.77434 11.25 8.2625 11.7382C8.75065 12.2263 8.75065 13.012 8.75065 14.5833C8.75065 16.1547 8.75065 16.9404 8.2625 17.4285C7.77434 17.9167 6.98867 17.9167 5.41732 17.9167C3.84597 17.9167 3.0603 17.9167 2.57214 17.4285C2.08398 16.9404 2.08398 16.1547 2.08398 14.5833Z'
          stroke='#6C6868'
        />
        <path
          d='M11.25 5.41634C11.25 3.84499 11.25 3.05932 11.7382 2.57116C12.2263 2.08301 13.012 2.08301 14.5833 2.08301C16.1547 2.08301 16.9404 2.08301 17.4285 2.57116C17.9167 3.05932 17.9167 3.84499 17.9167 5.41634C17.9167 6.98769 17.9167 7.77336 17.4285 8.26152C16.9404 8.74967 16.1547 8.74967 14.5833 8.74967C13.012 8.74967 12.2263 8.74967 11.7382 8.26152C11.25 7.77336 11.25 6.98769 11.25 5.41634Z'
          stroke='#6C6868'
        />
      </svg>
    ),
    children: [
      {
        id: 'form',
        title: 'Danh sách biểu mẫu',
        messageId: 'common.formList',
        type: 'item',
        url: '/category-management/form',
      },
      {
        id: 'project',
        title: 'Danh sách dự án',
        messageId: 'common.projectList',
        type: 'item',
        url: '/category-management/project',
      },
    ],
  },
  {
    id: 'configuration-management',
    title: 'Quản lý cấu hình',
    messageId: 'navbar.configManagement',
    type: 'collapse',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.5359 3.16875C8.2265 2.16758 9.0718 1.66699 10 1.66699C10.9282 1.66699 11.7735 2.16758 13.4641 3.16875L14.0359 3.50737C15.7265 4.50855 16.5718 5.00913 17.0359 5.83366C17.5 6.65818 17.5 7.65936 17.5 9.66171V10.3389C17.5 12.3413 17.5 13.3425 17.0359 14.167C16.5718 14.9915 15.7265 15.4921 14.0359 16.4933L13.4641 16.8319C11.7735 17.8331 10.9282 18.3337 10 18.3337C9.0718 18.3337 8.2265 17.8331 6.5359 16.8319L5.9641 16.4933C4.2735 15.4921 3.4282 14.9915 2.9641 14.167C2.5 13.3425 2.5 12.3413 2.5 10.3389V9.66171C2.5 7.65936 2.5 6.65818 2.9641 5.83366C3.4282 5.00913 4.2735 4.50855 5.9641 3.50737L6.5359 3.16875Z'
          stroke='#6C6868'
        />
        <circle cx='10' cy='10' r='2.5' stroke='#6C6868' />
      </svg>
    ),
    children: [
      {
        id: 'department',
        title: 'Định nghĩa phòng ban',
        messageId: 'common.departmentDefine',
        type: 'item',
        url: '/configuration-management/department',
      },
      {
        id: 'property',
        title: 'Định nghĩa thuộc tính',
        messageId: 'common.propertyDefine',
        type: 'item',
        url: '/configuration-management/property',
      },
      {
        id: 'roles',
        title: 'Định nghĩa thuộc tính',
        messageId: 'common.rolesDefine',
        type: 'item',
        url: '/configuration-management/roles',
      },
      {
        id: 'pick-lists',
        title: 'Dữ liệu danh sách',
        messageId: 'common.pickLists',
        type: 'item',
        url: '/configuration-management/pick-lists',
      },
      {
        id: 'work-flow',
        title: 'Định nghĩa QT công việc',
        messageId: 'common.workFlowDefine',
        type: 'item',
        url: '/configuration-management/work-flow',
      },
      {
        id: 'tags',
        title: 'Định nghĩa tags',
        messageId: 'common.tagsDefine',
        type: 'item',
        url: '/configuration-management/tags',
      },
      {
        id: 'job-types',
        title: 'Định nghĩa loại công việc',
        messageId: 'common.jobTypeDefine',
        type: 'item',
        url: '/configuration-management/job-types',
      },
    ],
  },
  {
    id: 'employees-management',
    title: 'Quản lý nhân viên',
    messageId: 'navbar.employeesManagement',
    type: 'item',
    url: '/employees-management/employees',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='7.49935' cy='5.00033' r='3.33333' stroke='#6C6868' />
        <path
          d='M12.5 7.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5'
          stroke='#6C6868'
          stroke-linecap='round'
        />
        <ellipse
          cx='7.49935'
          cy='14.1663'
          rx='5.83333'
          ry='3.33333'
          stroke='#6C6868'
        />
        <path
          d='M15 11.667C16.4619 11.9876 17.5 12.7994 17.5 13.7503C17.5 14.6081 16.6552 15.3528 15.4167 15.7257'
          stroke='#6C6868'
          stroke-linecap='round'
        />
      </svg>
    ),
  },
];
export default routesConfig;
