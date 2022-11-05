import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';

function getSKUs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/skus';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getSKUs,
}
