import { getFullPathImage, getAdminBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import {
  DATE_FORMAT,
  SHIPPING_STATUS_LABELS,
  STATE_LABELS,
} from 'components/contants';

const transformOrder = item => {
  const convertedMockupUrl = !!item.mockupUrl && getFullPathImage(item.mockupUrl);
  const convertedDesignUrl = !!item.designUrl && getFullPathImage(item.designUrl);
  return {
    ...item,
    convertedCreatedDate: !!item.dateOrder ? datetime.convert(item.dateOrder, DATE_FORMAT) : '',
    quantity: item.quantity || 0,
    mockupUrl: convertedMockupUrl || '',
    designUrl: convertedDesignUrl || '',
    convertedMockupUrl: convertedMockupUrl || shirt_sku,
    convertedDesignUrl: convertedDesignUrl || shirt_sku,
    convertedProductPrice: format.formatCurrency(item.productPrice || 0),
    convertedPriceTotal: format.formatCurrency(item.totalPrice || 0),
    convertedStatus: STATE_LABELS[item.status] || item.status,
    customerFullName: item.orderShipping && item.orderShipping.fullName ,
    convertedShippingStatus: item.orderTracking ? (SHIPPING_STATUS_LABELS[item.orderTracking.shippingStatus] || item.orderTracking.shippingStatus) : '',
    convertedCarrier: item.orderTracking ? item.orderTracking.carrier : 'No',
    convertedTrackingNum: item.orderTracking ? item.orderTracking.trackingNumber : 'No',
  };
}

function getOrders(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/orders';
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

function updateOrderStatus(orderId, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/orders/' + orderId + '/status';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateOrderTracking(orderId, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/orders/' + orderId + '/tracking';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function importOrders(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/orders/import';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function getOrdersStatus(successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/orders/status';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getOrders,
  getOrdersStatus,
  updateOrderStatus,
  updateOrderTracking,
  importOrders,
}
