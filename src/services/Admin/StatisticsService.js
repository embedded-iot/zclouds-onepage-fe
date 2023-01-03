import { format, makeGetWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';

const transformTopSeller = item => {
  return {
    ...item,
    convertedRevenue: !!item.revenue ? format.formatCurrency(item.revenue) : 0,
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformTopSeller({
    seller: "Seller " + i,
    revenue: 100,
  }))
}

function getTopSellers(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 100,
  })
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/top-sellers';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformTopSeller)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}
function getSellersAccounting(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/sellers-accounting';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    return {
      categories: response.categories || [],
      revenueData: response.revenueData || [],
      costData: response.costData || [],
      ordersData: response.ordersData || [],
      profitData: response.profitData || [],
    };
  })
}

export {
  getTopSellers,
  getSellersAccounting,
}
