import { format, makeGetWithConfigs, makePutWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';
import {
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
} from 'components/contants';

const transformTransaction = item => {
  const amount = item.amount.replace(new RegExp(/[,+-]/g), '');
  return {
    ...item,
    convertedCreatedDate: item.createdTime,
    convertedType: TRANSACTION_TYPE_LABELS[item.bankType] || item.bankType,
    convertedStatus: TRANSACTION_STATUS_LABELS[item.status] || item.status,
    convertedMoney: format.formatCurrency(parseInt(amount || 0)),
  }
}

function getTransactions(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/transaction';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformTransaction)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}

function confirmTransaction(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/transaction/' + id + '/confirm';
  makePutWithConfigs(url, {}, successCallback, failureCallback);
}

function cancelTransaction(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/transaction/' + id + '/cancel';
  makePutWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getTransactions,
  confirmTransaction,
  cancelTransaction,
}
