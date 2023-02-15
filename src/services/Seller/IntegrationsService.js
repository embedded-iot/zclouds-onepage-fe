import { getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
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
  makeGetWithConfigs(url, config, successCallback, failureCallback, (redirectLink) => {
    if (process.env.NODE_ENV !== "production") {
      return !!redirectLink ? redirectLink.replace(getFrontUserUrl(), window.location.origin) : redirectLink;
    }
    return redirectLink;
  });
}

function connectWooCommerceStore(type, params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + `/${type.toLowerCase()}/authorize/`;
  makeGetWithConfigs(url, config, successCallback, failureCallback, (redirectLink) => {
    if (process.env.NODE_ENV !== "production") {
      return !!redirectLink ? redirectLink.replace(getFrontUserUrl(), window.location.origin) : redirectLink;
    }
    return redirectLink;
  });
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
    sourceName: item.type,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATETIME_FORMAT) : '-',
    customerFullName: `${firstName} ${lastName}`,
    customerEmail: email,
    shippingAddressCountry: item.shippingAddress && item.shippingAddress.country,
    convertedTotalLineItemsPrice: format.formatCurrency(item.totalLineItemsPrice, item.currency === 'USD' ? undefined : item.currency),
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

function cloneOrders(type, storeId, orderIds, successCallback, failureCallback) {
  const config = {
    params: {
      orderIds
    }
  }
  const url = getSellerBaseURL() + `/${type}/${storeId}/clone`;
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

export {
  connectShopifyStore,
  connectWooCommerceStore,
  connectShopifyStoreWithData,
  connectStore,
  checkConnectStore,
  getIntegrationOrders,
  cloneOrder,
  cloneOrders,
}
