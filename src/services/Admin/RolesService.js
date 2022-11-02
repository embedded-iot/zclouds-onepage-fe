import { makeGetWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'

function getRoles(successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/profile';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

export {
  getRoles,
}
