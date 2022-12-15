import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { TRANSACTION_TYPE_LABELS } from 'components/contants';

const transformBank = item => {
  return {
    ...item,
    convertedType: TRANSACTION_TYPE_LABELS[item.bankType] || item.bankType,
  }
}

function getBanks(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/bank';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformBank) : []
    return {
      items: items,
    };
  });
}

function createBank(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/bank';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateBank(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/bank/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteBank(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/bank/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getBanks,
  createBank,
  updateBank,
  deleteBank,
}
