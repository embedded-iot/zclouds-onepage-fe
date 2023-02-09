import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { datetime, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';
import post from 'images/post.png';

const transformBlog = item => {
  const convertedBlogImages = (!!item.featureImage ? [item.featureImage] : []).map(image => ({
    url: getFullPathImage(image),
    existing: true,
  }));
  return {
    ...item,
    featureImage: getFullPathImage(item.featureImage) || post ,
    convertedState: STATE_LABELS[item.status] || item.status,
    convertedUpdatedDate: !!item.updatedTime ? datetime.convert(item.updatedTime, DATE_FORMAT) : '',
    convertedBlogImages
  }
}

function getBlogs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/blogs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformBlog)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createBlog(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/blogs';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateBlog(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/blogs/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteBlog(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/blogs/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function getUploadImageUrl() {
  return getAdminBaseURL() + '/files/images';
}

function deleteImage(path, successCallback, failureCallback) {
  const config = {
    params: {
      path
    }
  }
  const url = getAdminBaseURL() + '/files/images/';
  makeDeleteWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getUploadImageUrl,
  deleteImage,
}
