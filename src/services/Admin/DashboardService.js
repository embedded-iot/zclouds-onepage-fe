import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';


const transformTopSellingProducts = item => {
  return {
    ...item,
    name: item.owner && item.owner.username,
    avatar: getFullPathImage(item.mockupUrl) || shirt_sku,
    sku: item.design && item.design.slug,
    ordersCount: item.orderCount,
  }
}

function getTopSellingProducts(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/dashboard/top-selling-designs';
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
