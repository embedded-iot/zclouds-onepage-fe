import { getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';

const transformPayment = item => {
  return {
    ...item,
  }
}
function getPayments(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/gateways';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response && !!response.content ? response.content.map(transformPayment) : [];
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}


function createPayment(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/gateways';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updatePayment(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/gateways/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deletePayment(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/gateways/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
}
