import React from 'react';
import { MdOutlineDns } from 'react-icons/md';
import { BsCurrencyBitcoin } from 'react-icons/bs';

const routesConfig = [
  // {
  //   id: 'dashboardss',
  //   title: 'Application',
  //   messageId: 'common.edit',
  //   type: 'group',
  //   children: [
  //     {
  //       id: 'crypto',
  //       title: 'Crypto',
  //       messageId: 'sidebar.app.dashboard.crypto',
  //       icon: <BsCurrencyBitcoin />,
  //       path: '/dashboards/crypto',
  //     },
  //   ],
  // },
  // {
  //   id: 'apps',
  //   title: 'Apps',
  //   messageId: 'common.add',
  //   type: 'group',
  //   children: [
  //     {
  //       id: 'scrum-board',
  //       title: 'Scrum Board',
  //       messageId: 'sidebar.apps.scrumboard',
  //       icon: <MdOutlineDns />,
  //       path: '/apps/scrum-board',
  //     },
  //   ],
  // },
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
    type: 'group',
    children: [
      {
        id: 'sales-program',
        title: 'Chương trình bán hàng',
        messageId: 'common.salesProgram',
        path: '/sales-management/sales-program',
        icon: <MdOutlineDns />,
      },
      {
        id: 'transaction-management',
        title: 'Quản lý giao dịch',
        messageId: 'common.transactionManagement',
        path: '/sales-management/transaction-management',
        icon: <MdOutlineDns />,
      },
    ],
  },
  {
    id: 'customer-management',
    title: 'Quản lý khách hàng',
    messageId: 'navbar.customerManagement',
    type: 'group',
    children: [
      {
        id: 'customer-list',
        title: 'Danh sách khách hàng',
        messageId: 'common.customerList',
        type: 'item',
        path: '/customer-management/customer-list',
        icon: <MdOutlineDns />,
      },
    ],
  },
  {
    id: 'task-management',
    title: 'Quản lý công việc',
    messageId: 'navbar.taskManagement',
    type: 'group',
    children: [
      {
        id: 'task',
        title: 'Quản lý công việc',
        messageId: 'navbar.taskManagement',
        type: 'item',
        path: '/task-management/task',
        icon: <MdOutlineDns />,
      },
    ],
  },
  {
    id: 'category-management',
    title: 'Quản lý danh mục',
    messageId: 'navbar.catetoryManagement',
    type: 'group',
    children: [
      {
        id: 'form',
        title: 'Danh sách biểu mẫu',
        messageId: 'common.formList',
        type: 'item',
        path: '/category-management/form',
        icon: <MdOutlineDns />,
      },
      {
        id: 'project',
        title: 'Danh sách dự án',
        messageId: 'common.projectList',
        type: 'item',
        path: '/category-management/project',
        icon: <MdOutlineDns />,
      },
    ],
  },
  {
    id: 'configuration-management',
    title: 'Quản lý cấu hình',
    messageId: 'navbar.configManagement',
    type: 'group',
    children: [
      {
        id: 'department',
        title: 'Định nghĩa phòng ban',
        messageId: 'common.departmentDefine',
        type: 'item',
        path: '/configuration-management/department',
        icon: <MdOutlineDns />,
      },
      {
        id: 'property',
        title: 'Định nghĩa thuộc tính',
        messageId: 'common.propertyDefine',
        type: 'item',
        path: '/configuration-management/property',
        icon: <MdOutlineDns />,
      },
      {
        id: 'roles',
        title: 'Định nghĩa thuộc tính',
        messageId: 'common.rolesDefine',
        type: 'item',
        path: '/configuration-management/roles',
        icon: <MdOutlineDns />,
      },
      {
        id: 'pick-lists',
        title: 'Dữ liệu danh sách',
        messageId: 'common.pickLists',
        type: 'item',
        path: '/configuration-management/pick-lists',
        icon: <MdOutlineDns />,
      },
      {
        id: 'work-flow',
        title: 'Định nghĩa QT công việc',
        messageId: 'common.workFlowDefine',
        type: 'item',
        path: '/configuration-management/work-flow',
        icon: <MdOutlineDns />,
      },
      {
        id: 'tags',
        title: 'Định nghĩa tags',
        messageId: 'common.tagsDefine',
        type: 'item',
        path: '/configuration-management/tags',
        icon: <MdOutlineDns />,
      },
      {
        id: 'job-types',
        title: 'Định nghĩa loại công việc',
        messageId: 'common.jobTypeDefine',
        type: 'item',
        path: '/configuration-management/job-types',
        icon: <MdOutlineDns />,
      },
    ],
  },
  {
    id: 'employees-management',
    title: 'Quản lý nhân viên',
    messageId: 'navbar.employeesManagement',
    type: 'item',
    path: '/employees-management/employees',
    icon: <MdOutlineDns />,
  },
];
export default routesConfig;
