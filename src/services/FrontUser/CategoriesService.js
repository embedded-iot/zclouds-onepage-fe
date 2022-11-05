import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

function getCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

function getCategoriesFilter(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/categories-filters';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getCategoriesFilter,
  getCategories,
}
