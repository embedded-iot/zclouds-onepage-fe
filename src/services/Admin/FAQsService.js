import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformFAQ = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.state] || item.state,
  }
}
function getFAQs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/faqs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response && !!response.content ? response.content.map(transformFAQ) : [];
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}


function createFAQ(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/faqs';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateFAQ(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/faqs/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteFAQ(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/faqs/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
}
