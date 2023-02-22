import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import { STATE_LABELS } from 'components/contants';
import shirt_sku from 'images/t-shirt_sku.svg';

const transformCategory = item => {
  const convertedCategoryImages = (!!item.featureImage ? [item.featureImage] : []).map(image => ({
    url: getFullPathImage(image),
    existing: true,
  }));
  return {
    ...item,
    featureImage: getFullPathImage(item.featureImage) || shirt_sku ,
    convertedState: STATE_LABELS[item.state] || item.state,
    convertedCategoryImages
  }
}

function getCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformCategory)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createCategory(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/categories';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function getCategoriesOptions(categories) {
  return [
    { label: 'Select state', value: '' },
    ...(categories.map(category => ({ label: category.name, value: category.id })))
  ]
}

function updateCategory(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/categories/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteCategory(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/categories/' + id;
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
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesOptions,
  getUploadImageUrl,
  deleteImage,
}
