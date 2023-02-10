import { getAdminBaseURL } from 'services/BaseService';
import { datetime, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformEmail = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdTime ? datetime.convert(item.createdTime, DATE_FORMAT) : '',
    convertedStatus: STATE_LABELS[item.status] || item.status,
  }
}
function getEmails(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/subscribers';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response && !!response.content ? response.content.map(transformEmail) : [];
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}


function createEmail(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/subscribers';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateEmail(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/subscribers/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteEmail(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/subscribers/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}


function exportEmails(params, successCallback, failureCallback) {
  const config = {
    params,
    responseType: 'blob'
  };
  const url = getAdminBaseURL() + '/subscribers/export';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getEmails,
  createEmail,
  updateEmail,
  deleteEmail,
  exportEmails,
}
