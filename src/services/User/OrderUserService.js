import { makeGetWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'

const transformOrder = (order) => {
  order.userName = "new";
  return order;
}

function getOrders(params, successCallback, failureCallback) {
  const url = getBaseURL() + '/orders';
  const config = {
    params
  }
  makeGetWithConfigs(url, config, successCallback, failureCallback, (response) => {
    const items = response.items.map(transformOrder)
    return {
      items,
      totalCount: response.totalCount,
    }
  })
}

export {
  getOrders,
}
