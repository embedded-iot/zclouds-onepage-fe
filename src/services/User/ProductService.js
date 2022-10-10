import { ACTIVE_PRODUCT_TYPES } from 'components/contants';
import { makeGetWithConfigs } from 'utils';
import { getBaseURL } from 'services/BaseService';

const convertCategoriesByType = (categories) => {
  const groupByCategory = categories.filter(category => ACTIVE_PRODUCT_TYPES.includes(category.type))
    .reduce((group, product) => {
    const { type } = product;
    group[type] = group[type] ?? [];
    group[type].push(product);
    return group;
  }, {});
  return Object.keys(groupByCategory).map(type => ({
    name: `Dịch vụ ${type}`,
    type,
    services: groupByCategory[type].map(service => ({
      ...service,
      key: service.id,
      description: service.note,
    })),
  }));
}

function getProducts(successCallback, failureCallback) {
  const url = getBaseURL() + '/categories';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, (response) => {
    const products = convertCategoriesByType(response);
    return {
      data: {
        products
      }
    }
  })
}

export {
  getProducts,
}
