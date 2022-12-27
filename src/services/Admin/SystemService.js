import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformSystem = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.configStatus] || item.configStatus,
  }
}

function getSystem(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/system';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformSystem) : []
    return {
      items: items,
    };
  });
}

function createSystem(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/system';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateSystem(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/system/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteSystem(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/system/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getSystem,
  createSystem,
  updateSystem,
  deleteSystem,
}
