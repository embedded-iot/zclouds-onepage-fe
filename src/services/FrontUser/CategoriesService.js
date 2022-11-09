import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';


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

const categoriesResponse = {
  items,
  totalCount: items.length
}

function getCategories(params, successCallback, failureCallback) {
  successCallback(categoriesResponse);
  return;
  // eslint-disable-next-line
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/categories';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}


const categoriesFilterResponse = [
  { label: 'All products', count: 293, value: '' },
  { label: 'Apparel', count: 12, value: 'Apparel' },
  { label: 'Gift & Accessories38', count: 21, value: 'Gift & Accessories38' },
  { label: 'Home & Decorations', count: 23, value: 'All Over Print' },
  { label: 'Canvas & Poster', count: 23, value: 'Canvas & Poster' },
  { label: 'Shoes', count: 2, value: 'Shoes' },
  { label: 'US 2D Printing', count: 23, value: 'US 2D Printing' },
]


function getCategoriesFilter(successCallback, failureCallback) {
  successCallback(categoriesFilterResponse);
  return;
  // eslint-disable-next-line
  const url = getFrontUserBaseURL() + '/categories-filters';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getCategoriesFilter,
  getCategories,
}
