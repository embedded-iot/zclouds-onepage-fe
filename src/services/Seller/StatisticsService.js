import { format, makeGetWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';

const transformTopSellingProducts = item => {
  return {
    ...item,
    convertedCost: !!item.totalAmount ? format.formatCurrency(item.totalAmount) : 0,
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformTopSellingProducts({
    id: i,
    avatar: "https://fulfill.zclouds.vn/uploads/b59bf9da-8d35-4104-84f7-69525f786b00.jpg",
    name: "Product " + i,
    sku: "SKU12121",
    ordersCount: 100,
    totalAmount: 21212
  }))
}

function getTopsellingProducts(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 100,
  })
  const config = {
    params
  }
  const url = getAdminBaseURL() + '/top-selling-products';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformTopSellingProducts)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  })
}


export {
  getTopsellingProducts,
}
