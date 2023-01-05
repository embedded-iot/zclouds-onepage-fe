import { getFrontUserBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs } from 'utils';
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
  const url = getFrontUserBaseURL() + '/system/notification';
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

export {
  getNotifications,
}
