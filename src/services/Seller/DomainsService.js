import { getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformDomain = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.state] || item.state,
  }
}
function getDomains(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/domains';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response && !!response.content ? response.content.map(transformDomain) : [];
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}


function createDomain(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/domains';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateDomain(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/domains/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteDomain(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/domains/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getDomains,
  createDomain,
  updateDomain,
  deleteDomain,
}
