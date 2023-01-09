import { getFullPathImage, getSellerBaseURL } from 'services/BaseService';
import { cui, datetime, format, makeGetWithConfigs } from 'utils';
import { DATE_FORMAT } from 'components/contants';
import shirt_sku from 'images/t-shirt_sku.svg';

const transformOrdersOverview = item => {
  return {
    ...item,
    convertedOrderDate: datetime.convert(item.orderDate, DATE_FORMAT),
  }
}

function getOrdersOverview(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/dashboard/orders-overview';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformOrdersOverview) : []
    return {
      items: items,
    };
  });
}

function transformOrdersOverviewChartData(items = []) {
  const groupedItemsByOrderDate = cui.groupBy(items, item => item.convertedOrderDate);
  const ordersCounts = [];
  for (let [key, value] of groupedItemsByOrderDate.entries()) {
    ordersCounts.push({
      convertedOrderDate: key,
      orderCount: value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.orderCount;
      }, 0),
    })
  }
  const groupedItemsByStatus = cui.groupBy(items, item => item.status);
  const ordersStatus = [];
  for (let [key, value] of groupedItemsByStatus.entries()) {
    ordersStatus.push({
      status: key,
      orderCount: value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.orderCount;
      }, 0),
      totalAmount: value.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalAmount;
      }, 0),
    })
  }
  return {
    ordersCounts,
    ordersStatus,
  }
}

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
  const url = getSellerBaseURL() + '/dashboard/top-selling-products';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response ? response.map(transformTopSellingProducts) : []
    return {
      items: items,
    };
  })
}

export {
  getOrdersOverview,
  transformOrdersOverviewChartData,
  getTopSellingProducts,
}
