import { getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { DATETIME_FORMAT } from 'components/contants';

const transformWalletHistory = item => {
  return {
    ...item,
    convertedWalletBefore: !!item.walletBefore ? format.formatCurrency(item.walletBefore) : 0,
    convertedBalanceBefore: !!item.balanceBefore ? format.formatCurrency(item.balanceBefore) : 0,
    convertedTopUp: !!item.amount ? format.formatCurrency(item.amount) : 0,
    convertedWalletAfter: !!item.walletAfter ? format.formatCurrency(item.walletAfter) : 0,
    convertedBalanceAfter: !!item.balanceAfter ? format.formatCurrency(item.balanceAfter) : 0,
    convertedCreatedDate: !!item.date ? datetime.convert(item.date, DATETIME_FORMAT) : '',
  }
}

function getWalletHistory(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/wallet/top-ups';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformWalletHistory);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

const transformWalletTotal = item => {
  return {
    ...item,
    convertedWalletTotal: !!item.walletTotal ? format.formatCurrency(item.walletTotal) : 0,
    convertedOrdersTotal: !!item.orderTotal ? format.formatCurrency(item.orderTotal) : 0,
    convertedYourBalance: !!item.balance ? format.formatCurrency(item.balance) : 0,
  }
}

function getWalletTotal(successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/wallet';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformWalletTotal);
}

function verifyTopUp(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/wallet/top-ups';
  makePostWithConfigs(url, config, successCallback, failureCallback, transformWalletTotal);
}

function getWalletMethodsOptions(walletMethodList = []) {
  return [
    { label: 'Select type', value: '' },
    ...walletMethodList.map(item => ({
      label: item.name,
      value: item.id,
    }))
  ]
}

export {
  getWalletHistory,
  getWalletTotal,
  verifyTopUp,
  getWalletMethodsOptions,
}
