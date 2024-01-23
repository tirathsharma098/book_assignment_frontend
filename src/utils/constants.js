const BUTTON_ACTIONS = {
  view: 'view',
  update: 'update',
  add: 'add',
  delete: 'delete',
};
const USER_STATUS = {
  ACTIVE : 'active',
  INACTIVE: 'inactive'
}

const DATE_FORMAT = 'D MMM YY';
const DB_DATE = 'YYYY-MM-DD';
const AXIOS_ERROR_CODE = {
  ERR_NETWORK: 'ERR_NETWORK',
};
const ALL_USER_TYPE = [
  { value: 'admin', type: 'Admin' },
  { value: 'customer', type: 'Customer' }
];
const USER_TYPE = {
  SUPER_ADMIN:"super_admin",
  ADMIN : "admin",
  CUSTOMER: "customer"
}
export {
  BUTTON_ACTIONS,
  USER_STATUS,
  DATE_FORMAT,
  AXIOS_ERROR_CODE,
  DB_DATE,
  ALL_USER_TYPE,
  USER_TYPE
};
