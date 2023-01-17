import { getSellerBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATETIME_FORMAT, ROLE_LABELS, ROLE_VALUES, STATE_LABELS, STATE_VALUES } from 'components/contants';

const transformAccountStaff = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.status] || item.status,
    convertedRole: ROLE_LABELS[item.role] || item.role,
    convertedLastLogin: !!item.lastLogin ? datetime.convert(item.lastLogin, DATETIME_FORMAT) : '',
  }
}

const accountsStaffItems = [];
for (let i = 0; i < 10; i++) {
  accountsStaffItems.push(transformAccountStaff({
    id: i,
    username:  `account-staff-${i}`,
    role: ROLE_VALUES.DESIGNER,
    phone: '0985210341',
    email: 'namnguyenht1802@gmail.com',
    lastLogin: 1669993510000,
    totalOrder: 20,
    status: STATE_VALUES.ACTIVATED,
  }));
}

function getAccountsStaff(params, successCallback, failureCallback) {
  successCallback({
    items: accountsStaffItems,
    totalCount: 10,
    pageNum: 1,
    totalPage: 1,
  });
  return;
  // eslint-disable-next-line
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/accounts-staff';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformAccountStaff);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createAccountStaff(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/accounts-staff';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateAccountStaff(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/accounts-staff/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function changePassword(data, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/account/change-password';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function changeUserInfo(data, successCallback, failureCallback) {
  const url = getSellerBaseURL() + `/account`;
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

export {
  getAccountsStaff,
  createAccountStaff,
  updateAccountStaff,
  changeUserInfo,
  changePassword,
}
