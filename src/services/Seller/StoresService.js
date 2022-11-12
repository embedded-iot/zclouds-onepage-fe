import { getSellerBaseURL } from 'services/BaseService';
import { makeGetWithConfigs, makePutWithConfigs } from 'utils';
import { STORE_TYPE_LABELS } from 'components/contants';

const transformStore = item => {
  return {
    ...item,
    convertedType: STORE_TYPE_LABELS[item.platform.toLowerCase()] || item.type,
  }
}

function getStores(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/stores';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformStore);
    console.log(items);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function updateStore(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/stores/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function getStore(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/stores/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getStores,
  updateStore,
  getStore,
}
