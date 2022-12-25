import { datetime, format, makeGetWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';
import {
  DATE_FORMAT,
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
} from 'components/contants';

const transformWalletTransaction = item => {
  const amount = item.amount ? item.amount.replace(new RegExp(/[,+-]/g), '') : 0;
  return {
    ...item,
    convertedCreatedDate: !!item.createdTime ? datetime.convert(item.createdTime, DATE_FORMAT) : '',
    convertedType: TRANSACTION_TYPE_LABELS[item.transactionType] || item.transactionType,
    convertedStatus: TRANSACTION_STATUS_LABELS[item.status] || item.status,
    convertedMoney: format.formatCurrency(parseInt(amount || 0)),
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformWalletTransaction({
    "id": i,
    "walletId": "Wallet " + i,
    "walletUser": "seller",
    "createdTime": 1671446720000,
    "approve": "admin",
    "transactionType": "TOPUP",
  }))
}


function getWalletTransactions(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 10,
  })
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/wallet-transaction';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformWalletTransaction)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}

export {
  getWalletTransactions,
}
