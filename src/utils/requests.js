import axios from 'axios';
import authentication from './authentication';

const getAuthorizationHeaders = () => {
  const accessToken = authentication.getToken();
  return {
    'Authorization': `Bearer ${accessToken}`
  }
}

function request(configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const accessToken = authentication.getToken();
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
  const requestConfigs = {
    ...configs,
    headers: {
      ...defaultHeaders,
      ...(configs.headers || {})
    }
  }
  return axios.request(requestConfigs)
    .then(response => {
      if (response.status === 204 || response.status === 205) {
        successCallback(null);
      } else {
        successCallback(transformFunc(response.data));
      }
    })
    .catch(error => {
      error.response && error.response.data ? failCallback(error.response.data) : failCallback(null);
    })
}

function makeGetWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'get',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makePostWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'post',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makePutWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'put',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

function makeDeleteWithConfigs(url, configs = {}, successCallback = () => {}, failCallback = () => {}, transformFunc = (response) => response) {
  const requestConfigs = {
    method: 'delete',
    url,
    ...configs
  }
  return request(requestConfigs, successCallback, failCallback, transformFunc);
}

export {
  makeGetWithConfigs,
  makePostWithConfigs,
  makePutWithConfigs,
  makeDeleteWithConfigs,
  getAuthorizationHeaders,
}
