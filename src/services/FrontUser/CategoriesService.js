import { getFrontUserBaseURL, getFullPathImage } from 'services/BaseService';
import { cui, format, makeGetWithConfigs } from 'utils';

import product_ex from 'images/product_ex.svg';

const transformProduct = product => {
  const featureImage = getFullPathImage(product.featureImage) || product_ex;
  const images = [featureImage, ...(product.productImages.map(image => getFullPathImage(image.fullSizePath))), ...(product.productImages.map(image => getFullPathImage(image.fullSizePath)))];
  return {
    ...product,
    key: product.id,
    sku: `${product.id}`,
    categoryId: product.categoryId,
    categoryName: product.category ? product.category.name : 'Category',
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
  const featureImage = getFullPathImage(item.category ? item.category.featureImage : '');
  return {
    ...item.category,
    avatar: featureImage,
    displayOrder: item.category ? item.category.displayOrder : 0,
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
    const categories = cui.sortBy(response.map(transformCategory), 'displayOrder');
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

function getProductsOptions(products, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select product', value: '' }] : []),
    ...(products.map(product => ({...product, label: product.name, value: product.id })))
  ]
}

export {
  getCategoriesFilter,
  getCategories,
  getProductDetail,
  getProductsOptions,
}
