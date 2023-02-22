import { getAdminBaseURL } from 'services/BaseService';
import { datetime, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformNotification = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdTime ? datetime.convert(item.createdTime, DATE_FORMAT) : '',
    convertedUpdatedDate: !!item.updatedTime ? datetime.convert(item.updatedTime, DATE_FORMAT) : '',
    convertedStatus: STATE_LABELS[item.configStatus] || item.configStatus,
  }
}

function getNotifications(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/notification';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.content.map(transformNotification) : []
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createNotification(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/notification';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateNotification(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/notification/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteNotification(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/notification/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
}
