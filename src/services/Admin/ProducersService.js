import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformProducer = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.status] || item.status,
    convertedProducerMessaging: item.producerMessaging ? JSON.parse(item.producerMessaging) : [],
  }
}

function getProducers(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/producers';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProducer)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createProducer(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/producers';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateProducer(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/producers/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteProducer(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/producers/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function getProducersOptions(stores, isHasDefaultOption = true, defaultValueKey = 'id') {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select producer', value: '' }] : []),
    ...(stores.map(store => ({ label: store.producerName, value: store[defaultValueKey] })))
  ]
}

export {
  getProducers,
  createProducer,
  updateProducer,
  deleteProducer,
  getProducersOptions,
}
