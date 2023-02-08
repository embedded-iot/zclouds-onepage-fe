import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';

const transformBlogCategory = item => {
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.status] || item.status,
  }
}
function getBlogCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/blog-categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response && !!response.content ? response.content.map(transformBlogCategory) : [];
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}


function createBlogCategory(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/blog-categories';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateBlogCategory(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/blog-categories/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteBlogCategory(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/blog-categories/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
}
