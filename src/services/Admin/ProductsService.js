import { getAdminBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { STATE_LABELS } from 'components/contants';


const transformProduct = item => {
  return {
    ...item,
    avatar: item.featureImage || shirt_sku ,
    convertedState: STATE_LABELS[item.state] || item.state,
  }
}

function getProducts(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProduct)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createProduct(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/categories';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateProduct(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/categories/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteProduct(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/categories/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
