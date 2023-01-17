import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { format, makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { STATE_LABELS } from 'components/contants';


const transformProduct = item => {
  const featureImage = getFullPathImage(item.featureImage) || shirt_sku;
  const convertedProductImages = (item.productImages || []).map(image => ({
    ...image,
    url: getFullPathImage(image.fullSizePath),
    existing: true,
  }));
  return {
    ...item,
    key: item.id,
    sku: item.id,
    avatar: featureImage,
    convertedProductImages: convertedProductImages,
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


function getProduct(id, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/products/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, product => {
    return transformProduct(product);
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

function deleteProducts(data, successCallback, failureCallback) {
  const config = {
    data
  }
  const url = getAdminBaseURL() + '/products/batch';
  makeDeleteWithConfigs(url, config, successCallback, failureCallback);
}

function getUploadProductImageUrl() {
  return getAdminBaseURL() + '/products/images';
}

function deleteProductImage(imageId, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/products/images/' + imageId;
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
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  getUploadProductImageUrl,
  deleteProductImage,
  updateProductOptions,
  buildProductOptions,
}
