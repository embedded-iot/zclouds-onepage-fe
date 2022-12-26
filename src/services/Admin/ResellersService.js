import { getAdminBaseURL } from 'services/BaseService';
import { makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { STATE_LABELS, STATE_VALUES } from 'components/contants';

const transformReseller = item => {
  const state = item.state || STATE_VALUES.ACTIVATED;
  return {
    ...item,
    state,
    storeCount: item.storeCount || 0,
    convertedStatus: STATE_LABELS[state] || state,
  }
}

function getResellers(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/resellers';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformReseller);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function getResellersOptions(stores, isHasDefaultOption = true, defaultValueKey = 'id') {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select store', value: '' }] : []),
    ...(stores.map(store => ({ label: store.username, value: store[defaultValueKey] })))
  ]
}

function updateSellerStatus(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/resellers/' + id + '/state';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getResellers,
  getResellersOptions,
  updateSellerStatus,
}
