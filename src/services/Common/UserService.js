import { makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'

function login(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/authenticate';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function register(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/register';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function forgotPassword(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/forgot-password';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function changeUserInfo(data, successCallback, failureCallback) {
  const url = getBaseURL() + `/customers/profile`;
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function getUserInfo(successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/profile';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

export {
  login,
  register,
  getUserInfo,
  forgotPassword,
  changeUserInfo,
}
