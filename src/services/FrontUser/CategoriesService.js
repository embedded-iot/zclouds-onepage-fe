import { getFrontUserBaseURL } from 'services/BaseService';
import { format, makeGetWithConfigs } from 'utils';


import product_ex from 'images/product_ex.svg';

const items = [];

for (let i = 0; i < 35; i++) {
  items.push({
    avatar: product_ex,
    category: 'Apparel',
    name: 'Creative graphic assets',
    price: '$ 28',
    sizes: 6,
    colors: 12,
    print: 5
  })
}

const transformProduct = product => {
  return {
    ...product,
    key: product.id,
    categoryId: product.categoryId,
    categoryName: product.categoryName || 'categoryName',
    productName: product.name,
    productId: product.id,
    avatar: product.featureImage || product_ex,
    price: format.formatCurrency(product.price),
    sizes: 6, // @todo chưa rõ productOptions field
    colors: 12,
    print: 5,
    images: product.images || [product_ex, product_ex, product_ex, product_ex, product_ex],
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
    label: item.category ? item.category.name : '-',
    value: item.category ? item.category.id : '-',
    count: item.productCount || 0,
  }
}

function getCategoriesFilter(successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const categories = response.map(transformCategory);
    const totalCount = categories.reduce((previousValue, currentValue) => previousValue + currentValue.count, 0);
    return [
      { label: 'All products', count: totalCount, value: '' },
      ...categories
    ];
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
