const BUTTON_ACTIONS = {
  view: 'view',
  update: 'update',
  add: 'add',
  delete: 'delete',
};
const USER_STATUS = ['inactive', 'active'];
const DATE_FORMAT = 'D MMM YY';
const DB_DATE = 'YYYY-MM-DD';
const AXIOS_ERROR_CODE = {
  ERR_NETWORK: 'ERR_NETWORK',
};
const ALL_USER_TYPE = [
  { value: 'admin', type: 'Admin' },
  { value: 'customer', type: 'Customer' }
];
export {
  BUTTON_ACTIONS,
  USER_STATUS,
  DATE_FORMAT,
  AXIOS_ERROR_CODE,
  DB_DATE,
  ALL_USER_TYPE,
};
