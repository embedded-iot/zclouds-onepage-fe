import { makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { getFrontUserBaseURL } from '../BaseService';

function login(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/authenticate';
  const { userName:username, ...rest } = data;
  const config = {
    data: {
      ...rest,
      username,
    }
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function register(data, successCallback, failureCallback) {
  const { userName:username, phoneNumber: phone, ...rest } = data;
  const url = getFrontUserBaseURL() + '/users/register';
  const config = {
    data: {
      ...rest,
      phone,
      username,
    }
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function forgotPassword(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/forgot-password';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function changeUserInfo(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + `/users/me`;
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

function getUserInfo(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/me';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

export {
  login,
  register,
  getUserInfo,
  forgotPassword,
  changeUserInfo,
}
