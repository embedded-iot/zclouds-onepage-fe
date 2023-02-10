import { getFrontUserBaseURL } from 'services/BaseService';
import { makePostWithConfigs } from 'utils';

function subscribeEmail(params, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/subscribers';
  const config = {
    params
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

export {
  subscribeEmail,
}
