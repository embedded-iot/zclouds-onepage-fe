import { getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformOrder = item => {
  const convertedMockupUrl = !!item.mockupUrl && (getFrontUserUrl() + item.mockupUrl);
  const convertedDesignUrl = !!item.designUrl && (getFrontUserUrl() + item.designUrl);
  return {
    ...item,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATE_FORMAT) : '',
    convertedMockupUrl: convertedMockupUrl || shirt_sku,
    convertedDesignUrl: convertedDesignUrl || shirt_sku,
    convertedProductPrice: format.formatCurrency(item.productPrice),
    convertedPriceTotal: format.formatCurrency(item.productPrice * item.quantity),
    convertedStatus: STATE_LABELS[item.status] || item.status,
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

export {
  getOrders,
  createOrder,
  updateOrder,
  importOrders,
}
