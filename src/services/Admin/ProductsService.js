import { getAdminBaseURL } from 'services/BaseService';
import { format, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { STATE_LABELS } from 'components/contants';


const transformProduct = item => {
  return {
    ...item,
    avatar: item.featureImage || shirt_sku ,
    convertedState: STATE_LABELS[item.state] || item.state,
    convertedPrice: format.formatCurrency(item.price),
  }
}

function getProducts(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/products';
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
  const url = getAdminBaseURL() + '/products';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateProduct(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/products/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteProduct(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/products/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function getUploadProductImageUrl(productId) {
  return getAdminBaseURL() + '/products/' + productId + '/images';
}

function deleteProductImage(productId, imageId, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/products/' + productId + '/images/' + imageId;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function updateProductOptions(productId, data, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/products/' + productId + '/options';
  const config = {
    data
  };
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function buildProductOptions(productOptions) {
  return productOptions.map(option => ({
    id: option.id,
    name: option.name,
    displayOrder: option.displayOrder,
    productOptionValues: (option.productOptionValues || []).map(optionValue => ({
      id: optionValue.id,
      value: optionValue.value,
      priceAdjustment: optionValue.priceAdjustment,
      displayOrder: optionValue.displayOrder,
    }))
  }))
}

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUploadProductImageUrl,
  deleteProductImage,
  updateProductOptions,
  buildProductOptions,
}
