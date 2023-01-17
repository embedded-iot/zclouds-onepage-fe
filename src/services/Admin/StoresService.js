import { getAdminBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs, makePatchWithConfigs } from 'utils';
import { DATE_FORMAT, STATE_LABELS, STATE_VALUES, STORE_TYPE_LABELS } from 'components/contants';

const transformStore = item => {
  item.state = item.state || STATE_VALUES.ACTIVATED;
  return {
    ...item,
    convertedType: STORE_TYPE_LABELS[item.platform.toLowerCase()] || item.type,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATE_FORMAT) : '',
    convertedStatus: STATE_LABELS[item.state] || item.state,
  }
}

function getStores(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/stores';
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

function getStoresOptions(stores, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select store', value: '' }] : []),
    ...(stores.map(store => ({ label: store.name, value: store.id })))
  ]
}

function updateStoreStatus(id, params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/stores/' + id + '/state';
  makePatchWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getStores,
  getStoresOptions,
  updateStoreStatus,
}
