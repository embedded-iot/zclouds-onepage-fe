import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';
import { ROLE_LABELS, STATE_LABELS } from 'components/contants';

const transformUser = item => {
  return {
    ...item,
    fullName: (item.fullName || '') || `${item.firstName || ''} ${item.lastName || ''}`,
    convertedState: STATE_LABELS[item.state] || item.state,
    convertedRole: ROLE_LABELS[item.role] || item.role,
  }
}

function getUsers(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/users';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformUser)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}

function createUser(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/users';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateUser(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/users/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteUser(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/users/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function getUser(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/users/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
}
