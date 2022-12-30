import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformProducer = item => {
  return {
    ...item,
    convertedState: STATE_LABELS[item.state] || item.state,
  }
}


const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformProducer({
    "id": i,
    "name": "Nhà sản xuất " + i,
    "phone": "0123456789",
    "email": "abc@gmail.com",
    "address": "Số 1, ....",
    "website": "http://localhost:3000/producers-management",
    "contact": "sadasdasd",
    "idCard": "12121212",
    "state": "ACTIVATED",
  }))
}

function getProducers(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 10,
  })
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

export {
  getProducers,
  createProducer,
  updateProducer,
  deleteProducer,
}
