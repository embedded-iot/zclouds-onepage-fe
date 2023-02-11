import { getFullPathImage, getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, SHIPPING_STATUS_LABELS, STATE_LABELS } from 'components/contants';
import shirt_sku from 'images/t-shirt_sku.svg';
import googleDrive from 'images/google_drive_icon.svg';

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
    convertedDesignUrl: convertedDesignUrl ? (convertedDesignUrl.startsWith('https://drive.google.com') ? googleDrive : convertedDesignUrl) : shirt_sku,
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

const transformOrderDataRow = item => {
  const convertedMockupUrl = !!item.mockupUrl && getFullPathImage(item.mockupUrl);
  const convertedDesignUrl = !!item.designUrl && getFullPathImage(item.designUrl);
  return {
    ...item,
    convertedMockupUrl: convertedMockupUrl || shirt_sku,
    convertedDesignUrl: convertedDesignUrl || shirt_sku,
  }
}

function validateOrdersData(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/orders/import-excel';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function importOrders(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/orders/import-orders';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function getOrdersStatus(successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/orders/status';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

function getOrder(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/orders/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    return transformOrder(response);
  });
}

function cloneOrder(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + `/orders/${id}/clone`;
  makePostWithConfigs(url, {}, successCallback, failureCallback);
}

function exportOrders(params, successCallback, failureCallback) {
  const config = {
    params,
    responseType: 'blob'
  };
  const url = getSellerBaseURL() + '/orders/export';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

function getOrderEvents(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/order-events/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getOrders,
  getOrdersStatus,
  createOrder,
  updateOrder,
  importOrders,
  validateOrdersData,
  transformOrderDataRow,
  exportOrders,
  getOrder,
  cloneOrder,
  getOrderEvents,
}
