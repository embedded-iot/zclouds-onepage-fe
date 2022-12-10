import { getAdminBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

const transformReseller = item => {
  return {
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

function getResellersOptions(stores, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select store', value: '' }] : []),
    ...(stores.map(store => ({ label: store.name, value: store.id })))
  ]
}

export {
  getResellers,
  getResellersOptions,
}
