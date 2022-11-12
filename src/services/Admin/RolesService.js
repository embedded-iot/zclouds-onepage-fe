import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';

function getRoles(successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/roles';
  makeGetWithConfigs(url, {}, successCallback, failureCallback)
}

function createRole(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/roles';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateRole(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/roles/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteRole(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/roles/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
}
