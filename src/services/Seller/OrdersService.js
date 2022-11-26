import { getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformOrder = item => {
  const convertedMockupUrl = !!item.mockupUrl && (getFrontUserUrl() + item.mockupUrl);
  const convertedDesignUrl = !!item.designUrl && (getFrontUserUrl() + item.designUrl);
  return {
    ...item,
    convertedCreatedDate: !!item.dateOrder ? datetime.convert(item.dateOrder, DATE_FORMAT) : '',
    quantity: item.quantity || 0,
    convertedMockupUrl: convertedMockupUrl || shirt_sku,
    convertedDesignUrl: convertedDesignUrl || shirt_sku,
    convertedProductPrice: format.formatCurrency(item.productPrice || 0),
    convertedPriceTotal: format.formatCurrency(item.totalPrice || 0),
    convertedStatus: STATE_LABELS[item.status] || item.status,
    customerFullName: item.orderShipping && item.orderShipping.fullName ,
  };
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

function getOrdersStatus(successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/orders/status';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getOrders,
  getOrdersStatus,
  createOrder,
  updateOrder,
  importOrders,
}
