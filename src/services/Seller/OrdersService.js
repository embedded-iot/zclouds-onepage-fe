import { getAdminBaseURL, getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';

const transformOrder = item => {
  return item;
}

function getOrders(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/orders';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformOrder)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createOrder(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/orders';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}
function updateOrder(orderId, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/orders/' + orderId;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function importOrders(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/orders/import';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getOrders,
  createOrder,
  updateOrder,
  importOrders,
}
