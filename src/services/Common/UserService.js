import { makePostWithConfigs } from 'utils'
import { getBaseURL } from '../BaseService'

function login(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/user/login';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function register(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/user/register';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

export {
  login,
  register,
}
