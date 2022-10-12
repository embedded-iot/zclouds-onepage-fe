import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'
import { DATETIME_FORMAT, ORDER_STATUS_LABEL } from 'components/contants';

const transformOrder = (order) => {
  order.convertedCreatedDate = datetime.convert(order.createdDate, DATETIME_FORMAT);
  order.convertStatus = ORDER_STATUS_LABEL[order.state] || '-';
  order.offerName = order.offer ? order.offer.name : '-';
  order.invoiceLabel = order.invoice ? format.formatCurrency(order.invoice.credit) : '-';
  return order;
}

function getOrders(params, successCallback, failureCallback) {
  const url = getBaseURL() + '/orders';
  const config = {
    params
  }
  makeGetWithConfigs(url, config, successCallback, failureCallback, (response) => {
    const items = response.content.map(transformOrder)
    return {
      items,
      totalCount: response.totalElement,
    }
  })
}

function createOrder(data, successCallback, failureCallback) {
  const url = getBaseURL() + '/orders';
  const config = {
    data
  };
  makePostWithConfigs(url, config, successCallback, failureCallback)
}

export {
  getOrders,
  createOrder,
}
