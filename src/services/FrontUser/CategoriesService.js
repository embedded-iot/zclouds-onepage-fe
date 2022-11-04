import { getBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

function getCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getBaseURL() + '/categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

function getCategoriesFilter(successCallback, failureCallback) {
  const url = getBaseURL() + '/getCategoriesFilter';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getCategoriesFilter,
  getCategories,
}
