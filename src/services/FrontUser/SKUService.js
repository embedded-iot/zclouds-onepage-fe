import { getFrontUserBaseURL } from 'services/BaseService';
import { format, makeGetWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';

const transformProductSKU = productSKU => {
  return {
    ...productSKU,
    key: productSKU.id,
    productSKUName: productSKU.name,
    avatar: productSKU.featureImage || shirt_sku,
    price: format.formatCurrency(productSKU.price || 0),
  }
}

function getSKUs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/product-skus';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProductSKU)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

export {
  getSKUs,
}
