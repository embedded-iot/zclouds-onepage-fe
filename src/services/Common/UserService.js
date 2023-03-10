import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { getFrontUserBaseURL, getFullPathImage } from '../BaseService';

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

function forgotPassword(params, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/forgot-password';
  const config = {
    params
  };
  makeGetWithConfigs(url, config, successCallback, failureCallback)
}
function changePassword(data, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/reset-password';
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback)
}

const transformUser = item => {
  const convertedAvatarImages = (!!item.avatar ? [item.avatar] : []).map(image => ({
    url: getFullPathImage(image),
    existing: true,
  }));
  return {
    ...item,
    convertedAvatar: getFullPathImage(item.avatar),
    convertedAvatarImages
  }
}
function getUserInfo(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/users/me';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    return transformUser(response);
  })
}

function getUploadImageUrl() {
  return getFrontUserBaseURL() + '/files/images';
}

function deleteImage(path, successCallback, failureCallback) {
  const config = {
    params: {
      path
    }
  }
  const url = getFrontUserBaseURL() + '/files/images/';
  makeDeleteWithConfigs(url, config, successCallback, failureCallback);
}

export {
  login,
  register,
  getUserInfo,
  forgotPassword,
  changePassword,
  getUploadImageUrl,
  deleteImage,
  transformUser,
}
