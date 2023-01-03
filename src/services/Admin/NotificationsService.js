import { getAdminBaseURL } from 'services/BaseService';
import { datetime, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformNotification = item => {
  return {
    ...item,
    convertedCreatedDate: !!item.createdTime ? datetime.convert(item.createdTime, DATE_FORMAT) : '',
    convertedUpdatedDate: !!item.updatedTime ? datetime.convert(item.updatedTime, DATE_FORMAT) : '',
    convertedStatus: STATE_LABELS[item.status] || item.status,
  }
}


const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformNotification({
    id: i,
    title: "Title " + i,
    vnContent: "VN content " + i,
    enContent: "EN content " + i,
    status: 'ACTIVATED',
    createdTime: 100,
    updatedTime: 100,
  }))
}

function getNotifications(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 100,
  })
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/notifications';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformNotification) : []
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
  const url = getAdminBaseURL() + '/notifications';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateNotification(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/notifications/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteNotification(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/notifications/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
}
