import { getAdminBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

const transformReseller = item => {
  return {
    ...item,
    // eslint-disable-next-line
    fullName: (item.fullName || '') || (!!item.firstName || !!item.lastName ) && `${item.firstName || ''} ${ item.lastName || ''}` || item.username,
  }
}

function getResellers(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/users/list-reseller';
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
    ...(stores.map(store => ({ label: store.fullName, value: store[defaultValueKey] })))
  ]
}

export {
  getResellers,
  getResellersOptions,
}
