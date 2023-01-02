import { format, makeGetWithConfigs } from 'utils';
import { getAdminBaseURL } from '../BaseService';

const transformTopSellingProducts = item => {
  return {
    ...item,
    convertedCost: !!item.cost ? format.formatCurrency(item.cost) : 0,
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformTopSellingProducts({
    productName: "Prodcut " + i,
    orders: "SKU12121", 
    unitSales: 100,
    cost: 21212
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
