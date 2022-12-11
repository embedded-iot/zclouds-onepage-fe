import { datetime, format, makeGetWithConfigs, makePutWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';
import {
  DATETIME_FORMAT, STATE_VALUES,
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS, TRANSACTION_TYPE_VALUES,
} from 'components/contants';

const transformTransaction = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATETIME_FORMAT) : '-',
    convertedType: TRANSACTION_TYPE_LABELS[item.type] || item.type,
    convertedStatus: TRANSACTION_STATUS_LABELS[item.status] || item.status,
    convertedMoney: format.formatCurrency(item.money),
  }
}


const items = [];
items.push(transformTransaction({
  id: 1,
  sender: <span>Nguyen Cuong<br/>05086495<br/>BIDV</span>,
  recipient: <span>Nguyen Ha An<br/>05086495264<br/>Viettin</span>,
  content: 'TK 12345',
  createdAt: 1669993510000,
  type: TRANSACTION_TYPE_VALUES.TOP_UP,
  money: 1312,
  approval: 'Admin',
  resellerName: 'resellerName',
  status: STATE_VALUES.COMPLETED,
}))
items.push(transformTransaction({
  id: 2,
  sender: <span>Nguyen Cuong<br/>05086495<br/>BIDV</span>,
  recipient: <span>Nguyen Ha An<br/>05086495264<br/>Viettin</span>,
  content: 'TK 12345',
  createdAt: 1669993510000,
  type: TRANSACTION_TYPE_VALUES.TOP_UP,
  money: 1312,
  approval: 'Admin',
  resellerName: 'resellerName',
  status: STATE_VALUES.PENDING,
}))
items.push(transformTransaction({
  id: 3,
  sender: <span>Nguyen Cuong<br/>05086495<br/>BIDV</span>,
  recipient: <span>Nguyen Ha An<br/>05086495264<br/>Viettin</span>,
  content: 'TK 12345',
  createdAt: 1669993510000,
  type: TRANSACTION_TYPE_VALUES.TOP_UP,
  money: 1312,
  approval: 'Admin',
  resellerName: 'resellerName',
  status: STATE_VALUES.CANCEL,
}))
function getTransactions(params, successCallback, failureCallback) {
  successCallback({
    items: items,
    totalCount: 12,
    pageNum: 1,
    totalPage: 1,
  });
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/transactions';
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
  const url = getAdminBaseURL() + '/transactions/' + id + '/confirm';
  makePutWithConfigs(url, {}, successCallback, failureCallback);
}

function cancelTransaction(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/transactions/' + id + '/cancel';
  makePutWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getTransactions,
  confirmTransaction,
  cancelTransaction,
}
