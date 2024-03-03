export enum AttachmentType {
  THUMBNAIL_INVENTORY = '1', // Ảnh đại diện giỏ hàng
  IMG_INVENTORY = '2', // Ảnh mặt hàng
  INVENTORY_GROUNDS_TRANSACTION = '3', // Xác nhận đã giao dịch

  AVATAR_EMPLOYEE = '4', // ảnh đại diện nhân viên
  AVATAR_CUSTOMER = '5', // ảnh đại diện khách hàng
  FILE_CUSTOMER = '6', // File khách hàng
  FILE_PROJECT = '7', // File khách hàng
  FILE_TASK = '8', // File công việc
}

export enum SalesTransactionStatus {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết
  VIEW_TRADERS = 'VIEW_TRADERS', // Xem người đang giao dịch
  SEND_APPROVAL = 'SEND_APPROVAL', // Gửi duyệt
  PENDING_TRANSACTION = 'PENDING_TRANSACTION', // Tạm ngừng giao dịch
  CONFIRM_TRANSACTION = 'CONFIRM_TRANSACTION', // Xác nhận đã giao dịch
  RE_OPEN_TRANSACTION = 'RE_OPEN_TRANSACTION', // Mở lại giao dịch
  DELETE_INVENTORY = 'DELETE_INVENTORY', // Xóa giao dịch
  CANCEL_SEND_APPROVAL = 'CANCEL_SEND_APPROVAL', // Hủy gửi duyệt
  ADMIN_ACCEPT = 'ADMIN_ACCEPT', // Admin Duyệt
  ADMIN_INREVIEW = 'ADMIN_INREVIEW', // Admin Review
  ADMIN_REJECT = 'ADMIN_REJECT', // Admin Reject
}

export enum SalesProgramStatus {
  EDIT = 'EDIT', // Sửa chương trình
  ADD_INVENTORIES = 'ADD_INVENTORIES', // Thêm mặt hàng
  SEND_APPROVAL = 'SEND_APPROVAL', // Gửi duyệt chương trình
  DELETE = 'DELETE', // Xóa chương trình
  PENDING = 'PENDING', // Tạm ngừng chương trình
  RE_OPEN = 'RE_OPEN', // Mở lại
  CANCEL_SEND_APPROVAL = 'CANCEL_SEND_APPROVAL', // Hủy gửi duyệt
  ADMIN_ACCEPT = 'ADMIN_ACCEPT', // Admin Duyệt
  ADMIN_INREVIEW = 'ADMIN_INREVIEW', // Admin Review
  ADMIN_REJECT = 'ADMIN_REJECT', // Admin Reject
}

export enum EmployeeStatus {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết nhân sự
  EDIT = 'EDIT', // Sửa nhân sự
  UPDATE_STATUS = 'UPDATE_STATUS', //  Cập nhật trạng thái nhân sự
}

export enum CustomerAction {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết khách hàng
  EDIT = 'EDIT', // Sửa thông tin khách hàng
  ATTACH_STAFF = 'ATTACH_STAFF', // Gán nhân sự
  DOWNLOAD_INFO = 'DOWNLOAD_INFO', // Tải xuống thông tin khách hàng
  DELETE = 'DELETE', // Xóa khách hàng
  ADD_INVENTORY_INTERESTED = 'ADD_INVENTORY_INTERESTED', // Thêm mặt hàng quan tâm
  UPDATE_STATUS = 'UPDATE_STATUS', // Cập nhật trạng thái khách hàng
  ATTACH_TAGS = 'ATTACH_TAGS', // Gán Tags
}

export enum WorkAction {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết
  EDIT = 'EDIT', // Sửa thông tin
  ASSIGN = 'ASSIGN', // Phân công người phụ trách
  ADD_SUBTASKS = 'ADD_SUBTASKS', // Thêm công việc con
  DELETE = 'DELETE', // Xóa
}

export enum TagsAction {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết
  EDIT = 'EDIT', // Sửa thông tin
  DELETE = 'DELETE', // Xóa
}

export enum JobTypeAction {
  VIEW_DETAIL = 'VIEW_DETAIL', // Xem chi tiết
  EDIT = 'EDIT', // Sửa thông tin
  DELETE = 'DELETE', // Xóa
}

export enum ActionType {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
  IMPORT = 'import',
}

export const DraftStrings = {
  pickList: 'pickListDraft',
  property: 'propertyDraft',
  department: 'departmentDraft',
  inventory: 'inventoryDraft',
  inventoryWarehouse: 'inventoryWarehouseDraft',
  salesProgram: 'salesProgramDraft',
  customer: 'customerDraft',
};

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export enum PropertyType {
  TYPE_STR = 'type_str',
  TYPE_LIST = 'type_list',
  TYPE_NUM = 'type_num',
  TYPE_DATE = 'type_date',
  TYPE_PHONE = 'type_phone',
  TYPE_MONEY = 'type_money',
  TYPE_PROVINCE = 'type_province',
  TYPE_DISTRICT = 'type_district',
  TYPE_WARDS = 'type_wards',
}
