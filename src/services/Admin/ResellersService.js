import { getAdminBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import {
  DATE_FORMAT,
} from 'components/contants';

const transformReseller = item => {
  return {
    ...item,
    // eslint-disable-next-line
    fullName: (item.fullName || '') || (!!item.firstName || !!item.lastName ) && `${item.firstName || ''} ${ item.lastName || ''}` || item.username,
  }
}

function getResellers(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/users/list-reseller';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformReseller);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function getResellersOptions(stores, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select store', value: '' }] : []),
    ...(stores.map(store => ({ label: store.fullName, value: store.id })))
  ]
}

const transformSellerWallet = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATE_FORMAT) : '-',
    convertedUpdatedDate: !!item.updatedAt ? datetime.convert(item.updatedAt, DATE_FORMAT) : '-',
    convertedTotal: format.formatCurrency(item.total),
    convertedUsedAmount: format.formatCurrency(item.used),
    convertedBalance: format.formatCurrency(item.balance),
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformSellerWallet({
    id: i,
    createdAt: 1669993510000,
    updatedAt: 1669993510000,
    resellerName: 'NguyenCuong09',
    email: 'Abcde@gmail.com',
    phone: '0123456789',
    total: 270,
    used: 300,
    balance: 300,
  }))
}

function getSellerWallets(params, successCallback, failureCallback) {
  successCallback({
    items: items,
    totalCount: 12,
    pageNum: 1,
    totalPage: 1,
  });
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/users/list-reseller/wallets';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformSellerWallet)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}

function topUpReseller(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/users/list-reseller/top-up';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getResellers,
  getResellersOptions,
  getSellerWallets,
  topUpReseller,
}
