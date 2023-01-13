import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { format, makeGetWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';


const transformTopSellingProducts = item => {
  return {
    ...item,
    name: item.product.name,
    avatar: getFullPathImage(item.product.featureImage) || shirt_sku,
    sku: item.product.slug,
    ordersCount: item.orderCount,
    convertedCost: !!item.product.price ? format.formatCurrency(item.product.price) : 0,
  }
}

function getTopSellingProducts(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/dashboard/top-selling-products';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformTopSellingProducts) : []
    return {
      items: items,
    };
  })
}

function exportStatistics(params, successCallback, failureCallback) {
  const config = {
    params,
    responseType: 'blob'
  };
  const url = getAdminBaseURL() + '/dashboard/export';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getTopSellingProducts,
  exportStatistics,
}
