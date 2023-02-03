import { getFrontUserBaseURL } from 'services/BaseService';
import { makePostWithConfigs } from 'utils';

function subscribeEmail(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/email/subscribe';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

export {
  subscribeEmail,
}
