import { getAdminBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { DATETIME_FORMAT, STATE_LABELS, STATE_VALUES } from 'components/contants';

const transformReseller = item => {
  const state = item.state || STATE_VALUES.ACTIVATED;
  return {
    ...item,
    state,
    storeCount: item.storeCount || 0,
    convertedStatus: STATE_LABELS[state] || state,
    convertedLastLogin: !!item.lastLogin ? datetime.convert(item.lastLogin, DATETIME_FORMAT) : '',
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

function getResellersOptions(stores, isHasDefaultOption = true, defaultValueKey = 'id', defaultLabel = 'Select seller') {
  return [
    ...(isHasDefaultOption ? [{ label: defaultLabel, value: '' }] : []),
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
