import { getSellerBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STORE_TYPE_LABELS } from 'components/contants';

const transformStore = item => {
  return {
    ...item,
    convertedType: STORE_TYPE_LABELS[item.platform.toLowerCase()] || item.type,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATE_FORMAT) : '',
  }
}

function getStores(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/stores';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformStore);
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

function getStoresOptions(stores, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select store', value: '' }] : []),
    ...(stores.map(store => ({ label: store.name, value: store.id })))
  ]
}


export {
  getStores,
  updateStore,
  getStore,
  getStoresOptions,
}
