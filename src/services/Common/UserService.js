import { makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
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

function logout(successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/logout';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

function forgotPassword(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/forgot-password';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function changePassword(customersId, data, successCallback, failureCallback) {
  const url = getBaseURL() + `/customers/change-password/${customersId}`;
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

function changeUserInfo(customersId, data, successCallback, failureCallback) {
  const url = getBaseURL() + `/customers/info/${customersId}`;
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

function getUserInfo(successCallback, failureCallback) {
  const url = getBaseURL() + '/customers/profile';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

export {
  login,
  register,
  getUserInfo,
  logout,
  forgotPassword,
  changePassword,
  changeUserInfo,
}
