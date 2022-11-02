import { getBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

function getCategories(successCallback, failureCallback) {
  const url = getBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getCategories,
}
