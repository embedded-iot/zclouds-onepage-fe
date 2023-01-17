import { getAdminBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import {
  DATE_FORMAT, DATETIME_FORMAT,
} from 'components/contants';


const transformWallet = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdTime ? datetime.convert(item.createdTime, DATE_FORMAT) : '',
    convertedUpdatedDate: !!item.updatedTime ? datetime.convert(item.updatedTime, DATE_FORMAT) : '',
    convertedTotal: format.formatCurrency(item.walletTotal),
    convertedUsedAmount: format.formatCurrency(item.orderTotal),
    convertedBalance: format.formatCurrency(item.balance),
  }
}

function getWallets(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/wallets';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformWallet)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}

function topUpWithdrawWallet(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/wallets/top-up';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

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

function getWalletDetails(id, params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/wallets/' + id;
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformWalletHistory)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}


export {
  getWallets,
  topUpWithdrawWallet,
  getWalletDetails,
}
