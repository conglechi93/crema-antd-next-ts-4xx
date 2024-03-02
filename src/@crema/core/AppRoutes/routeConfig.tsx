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
    id: 'dashboards',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'crypto',
        title: 'Crypto',
        messageId: 'sidebar.app.dashboard.crypto',
        icon: <BsCurrencyBitcoin />,
        path: '/dashboards/crypto',
      },
      {
        id: 'crm',
        title: 'CRM',
        messageId: 'sidebar.app.dashboard.crm',
        icon: <RiCustomerService2Line />,
        path: '/dashboards/crm',
      },
      {
        id: 'analytics',
        title: 'Analytics',
        messageId: 'sidebar.app.dashboard.analytics',
        icon: <MdOutlineAnalytics />,
        path: '/dashboards/analytics',
      },
      {
        id: 'health-care',
        title: 'Health Care',
        permittedRole: RoutePermittedRole.User,
        messageId: 'sidebar.healthCare',
        icon: <FaRegHospital />,
        path: '/dashboards/health-care',
      },
      {
        id: 'e-commerce',
        title: 'E-Commerce',
        messageId: 'sidebar.app.dashboard.eCommerce',
        icon: <BsCart4 />,
        path: '/dashboards/e-commerce',
      },
      {
        id: 'academy',
        title: 'Academy',
        messageId: 'sidebar.app.dashboard.academy',
        icon: <HiOutlineAcademicCap />,
        path: '/dashboards/academy',
      },
      {
        id: 'widgets',
        title: 'Widgets',
        messageId: 'sidebar.app.widgets',
        icon: <RiDashboardLine />,
        path: '/dashboards/widgets',
      },
    ],
  },
  {
    id: 'apps',
    title: 'Apps',
    messageId: 'sidebar.apps',
    type: 'group',
    children: [
      {
        id: 'mail',
        title: 'Mail',
        messageId: 'sidebar.apps.mail',
        count: 4,
        icon: <FiMail />,
        path: '/apps/mail/folder/inbox',
      },
      {
        id: 'todo',
        title: 'ToDo',
        messageId: 'sidebar.apps.todo',
        count: 6,
        icon: <RiTodoLine />,
        color: '#48bb78',
        path: '/apps/todo/folder/all',
      },
      {
        id: 'calender',
        title: 'Calender',
        messageId: 'sidebar.apps.calender',
        icon: <BiTask />,
        path: '/apps/calender/folder/all',
      },
      {
        id: 'contact',
        title: 'Contact',
        messageId: 'sidebar.apps.contact',
        icon: <MdOutlineContactPhone />,
        path: '/apps/contact/folder/all',
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: <BsChatDots />,
        messageId: 'sidebar.apps.chat',
        path: '/apps/chat',
      },
      {
        id: 'scrum-board',
        title: 'Scrum Board',
        messageId: 'sidebar.apps.scrumboard',
        icon: <MdOutlineDns />,
        path: '/apps/scrum-board',
      },
      {
        id: 'wall',
        title: 'Wall',
        messageId: 'sidebar.apps.wall',
        icon: <CgFeed />,
        path: '/apps/wall',
      },
      {
        id: 'ecommerce',
        title: 'Ecommerce',
        messageId: 'sidebar.ecommerce',
        icon: <BiCartAlt />,
        type: 'collapse',
        children: [
          {
            id: 'products',
            title: 'Products',
            messageId: 'sidebar.ecommerce.products',
            path: '/ecommerce/products',
          },
          {
            id: 'product_detail',
            title: 'Product Detail',
            messageId: 'sidebar.ecommerce.productDetail',
            path: '/ecommerce/product_detail',
          },
          {
            id: 'orders',
            title: 'Orders',
            messageId: 'sidebar.ecommerce.orders',
            path: '/ecommerce/orders',
          },
          {
            id: 'cart',
            title: 'Cart',
            messageId: 'sidebar.ecommerce.cart',
            path: '/ecommerce/cart',
          },
          {
            id: 'checkout',
            title: 'Checkout',
            messageId: 'sidebar.ecommerce.checkout',
            path: '/ecommerce/checkout',
          },
          {
            id: 'confirmation',
            title: 'Confirmation',
            messageId: 'sidebar.ecommerce.confirmation',
            path: '/ecommerce/confirmation',
          },
          {
            id: 'invoice-1',
            title: 'Invoice 1',
            messageId: 'sidebar.ecommerce.invoice1',
            path: '/ecommerce/invoice-1',
          },
          {
            id: 'invoice-2',
            title: 'Invoice 2',
            messageId: 'sidebar.ecommerce.invoice2',
            path: '/ecommerce/invoice-2',
          },
        ],
      },
      {
        id: 'admin-ecommerce',
        title: 'Ecommerce Admin',
        messageId: 'sidebar.ecommerceAdmin',
        type: 'collapse',
        icon: <GrUserAdmin />,
        children: [
          {
            id: 'productListing',
            title: 'Product Listing',
            messageId: 'sidebar.ecommerceAdmin.productListing',
            path: '/ecommerce/product-listing',
          },
          {
            id: 'addProducts',
            title: 'Add Products',
            messageId: 'sidebar.ecommerceAdmin.addProducts',
            path: '/ecommerce/add-products',
          },
          {
            id: 'customers',
            title: 'Customers',
            messageId: 'sidebar.ecommerce.customers',
            path: '/ecommerce/customers',
          },
        ],
      },
      {
        id: 'invoice',
        title: 'Invoice',
        messageId: 'sidebar.invoice',
        type: 'collapse',
        icon: <TbFileInvoice />,
        children: [
          {
            id: 'addInvoice',
            title: 'Add Invoices',
            messageId: 'sidebar.invoice.addInvoice',
            path: '/invoice/add-invoice',
          },
          {
            id: 'invoices',
            title: 'Invoices',
            messageId: 'sidebar.invoice.home',
            path: '/invoice',
          },
          {
            id: 'clients',
            title: 'Clients',
            messageId: 'sidebar.invoice.clients',
            path: '/invoice/clients',
          },
          {
            id: 'settings',
            title: 'Settings',
            messageId: 'sidebar.invoice.settings',
            path: '/invoice/settings',
          },
        ],
      },
      {
        id: 'blog',
        title: 'Blog',
        messageId: 'sidebar.pages.extraPages.blog',
        type: 'collapse',
        icon: <BiRss />,
        children: [
          {
            id: 'bloglist',
            title: 'Blog List',
            messageId: 'sidebar.pages.extraPages.blogList',
            path: '/extra-pages/blog',
          },
          {
            id: 'blogdetail',
            title: 'Blog Detail',
            messageId: 'sidebar.pages.extraPages.blogDetail',
            path: '/extra-pages/blog/blog-details',
          },
          {
            id: 'blogcreate',
            title: 'Create Blog',
            messageId: 'sidebar.pages.extraPages.blogCreate',
            path: '/extra-pages/blog/create-blog',
          },
        ],
      },
    ],
  },
];
export default routesConfig;
