import { getSellerBaseURL } from 'services/BaseService';
import { makePostWithConfigs } from 'utils';

function connectStore(type, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + `/integrations/${type.toLowerCase()}`;
  makePostWithConfigs(url, config, successCallback, failureCallback);
}


function checkConnectStore(type, id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + `/integrations/${type.toLowerCase()}/${id}/check-connection`;
  makePostWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  connectStore,
  checkConnectStore,
}
