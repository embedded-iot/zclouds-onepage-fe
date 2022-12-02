import { getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { DATETIME_FORMAT } from 'components/contants';

function connectStore(type, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + `/integrations/${type.toLowerCase()}`;
  makePostWithConfigs(url, config, successCallback, failureCallback);
}


function connectShopifyStore(type, params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + `/${type.toLowerCase()}/authorize/`;
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

function connectShopifyStoreWithData(type, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + `/${type.toLowerCase()}/exchange/`;
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function checkConnectStore(type, id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + `/integrations/${type.toLowerCase()}/${id}/check-connection`;
  makePostWithConfigs(url, {}, successCallback, failureCallback);
}

const transformOrder = item => {
  const { email = '', firstName = '', lastName = '' } = item.customer || {};
  return {
    ...item,
    sourceName: item.sourceName || item.type,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATETIME_FORMAT) : '-',
    customerFullName: `${firstName} ${lastName}`,
    customerEmail: email,
    shippingAddressCountry: item.shippingAddress && item.shippingAddress.country,
    convertedTotalLineItemsPrice: format.formatCurrency(item.totalLineItemsPrice),
  };
}

function getIntegrationOrders(type, storeId, params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + `/${type}/${storeId}`;
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(item => transformOrder({ ...item, type }))
    return {
      items: items,
      totalCount: response.totalElement || items.length,
      pageNum: response.currentPage || 1,
      totalPage: response.totalPage || 1,
    };
  });
}

function cloneOrder(type, storeId, orderId, successCallback, failureCallback) {
  const url = getSellerBaseURL() + `/${type}/${storeId}/${orderId}`;
  makePostWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  connectShopifyStore,
  connectShopifyStoreWithData,
  connectStore,
  checkConnectStore,
  getIntegrationOrders,
  cloneOrder,
}
