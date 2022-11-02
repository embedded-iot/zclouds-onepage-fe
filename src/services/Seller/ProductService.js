import { makeGetWithConfigs } from 'utils';
import { getBaseURL } from 'services/BaseService';

function getProducts(successCallback, failureCallback) {
  const url = getBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getProducts,
}
