import { AuthUser } from '../../types/models/AuthUser';

export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export enum RoutePermittedRole {
  Admin = 'admin',
  User = 'user',
}

export const defaultUser: AuthUser = {
  uid: 'no-riven',
  displayName: 'Anh Nô Vui Tính',
  email: 'conglechi93@mgail.com',
  token: 'access-token',
  role: 'user',
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const initialUrl = '/dashboards/crypto'; // this url will open after login

export const apiTimeout = 20000;
export const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, *',
  'Accept-Language': 'vi',
  'Content-Security-Policy': 'ALLOWALL',
};

export const pageSize = {
  CART: 10,
  PROPERTY: 8,
  INVENTORY: 10,
  INVENTORY_TABLE: 10,
  PROJECT: 10,
  SALES_PROGRAMS: 10,
  SALES_TRANSACTIONS: 10,
  LOAD_MORE: 20,
  DEFAULT: 10,
};

export const dateFormat = 'DD/MM/YYYY';
export const dateTimeFormat = [
  'DD/MM/YYYY',
  'HH:mm:ss DD/MM/YYYY',
  'YYYY/MM/DD HH:mm:ss',
];
