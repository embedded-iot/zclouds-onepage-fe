import { datetime, format, makeGetWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';
import { DATE_FORMAT } from 'components/contants';

const transformTopSeller = item => {
  return {
    ...item,
    seller: item.seller.username,
    convertedRevenue: !!item.revenue ? format.formatCurrency(item.revenue) : 0,
  }
}

function getTopSellers(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/dashboard/top-sellers';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformTopSeller) : []
    return {
      items: items,
    };
  })
}


const transformOrdersOverview = item => {
  return {
    ...item,
    orderCount: item.orderCount || 0,
    expense: item.expense || 0,
    profit: item.profit || 0,
    revenue: item.revenue || 0,
    convertedOrderDate: datetime.convert(item.orderDate, DATE_FORMAT),
  }
}

const calcTotal = (list, key) => list.reduce((accumulator, currentValue) => {
  return accumulator + currentValue[key];
}, 0)

function getSellersAccounting(params, successCallback, failureCallback) {
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/dashboard/orders-overview';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformOrdersOverview) : []
    return {
      items,
      convertedTotalRevenue: format.formatCurrency(calcTotal(items, 'revenue')),
      convertedTotalCost: format.formatCurrency(calcTotal(items, 'expense')),
      convertedTotalProfit: format.formatCurrency(calcTotal(items, 'profit')),
      convertedTotalOrder: calcTotal(items, 'orderCount'),
    };
  })
}

export {
  getTopSellers,
  getSellersAccounting,
}
