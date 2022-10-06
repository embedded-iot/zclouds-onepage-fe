import { makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
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

function logout(successCallback, failureCallback) {
  const url = getBaseURL() + '/user/logout';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

function forgotPassword(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/user/forgot-password';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function changePassword(userId, data, successCallback, failureCallback) {
  const url = getBaseURL() + `/user/change-password/${userId}`;
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

function changeUserInfo(userId, data, successCallback, failureCallback) {
  const url = getBaseURL() + `/user/info/${userId}`;
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

function getUserInfo(successCallback, failureCallback) {
  const url = getBaseURL() + '/user/profile';
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
