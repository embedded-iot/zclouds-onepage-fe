import { getFrontUserBaseURL, getFullPathImage } from 'services/BaseService';
import { format, makeGetWithConfigs } from 'utils';

import product_ex from 'images/product_ex.svg';

const transformProduct = product => {
  const featureImage = product.featureImage || product_ex;
  const images = [featureImage, ...(product.productImages.map(image => getFullPathImage(image.fullSizePath))), ...(product.productImages.map(image => getFullPathImage(image.fullSizePath)))];
  return {
    ...product,
    key: product.id,
    sku: product.id,
    categoryId: product.categoryId,
    categoryName: product.categoryName || 'categoryName',
    productName: product.name,
    productId: product.id,
    avatar: featureImage,
    convertedPrice: format.formatCurrency(product.price),
    productOptionsLabel: product.productOptions.map(option => `${option.productOptionValues.length} ${option.name.toLowerCase()}`).join(" "),
    images,
  }
}

function getCategories(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/products';
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

const transformCategory = item => {
  return {
    categoryId: item.category.id,
    categoryName: item.category.name || 'categoryName',
    label: item.category ? item.category.name : '-',
    value: item.category ? item.category.id : '-',
    count: item.productCount || 0,
  }
}

function getCategoriesFilter(successCallback, failureCallback, isAddAll = false) {
  const url = getFrontUserBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const categories = response.map(transformCategory);
    const totalCount = categories.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0);
    const newCategories = isAddAll ? [
      { label: 'All products', count: totalCount, value: '' },
      ...categories
    ] : categories;
    return newCategories;
  });
}


function getProductDetail(productId, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/products/' + productId;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformProduct);
}

export {
  getCategoriesFilter,
  getCategories,
  getProductDetail,
}
