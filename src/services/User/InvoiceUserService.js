import { datetime, makeGetWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'
import { DATETIME_FORMAT } from 'components/contants';

const INVOICE_TYPE = {
  'TOP_UP': 'Nạp tiền',
  'DEDUCT': 'Rút tiền'
}

const transformInvoice = (invoice) => {
  invoice.convertedCreatedDate = datetime.convert(invoice.createdDate, DATETIME_FORMAT);
  invoice.conventedType = INVOICE_TYPE[invoice.type] || invoice.type;
  invoice.conventedCredit = `${invoice.credit} đ` ;
  return invoice;
}

function getInvoices(params, successCallback, failureCallback) {
  const url = getBaseURL() + '/invoices';
  const config = {
    params
  }
  makeGetWithConfigs(url, config, successCallback, failureCallback, (response) => {
    const items = response.content.map(transformInvoice)
    return {
      items,
      totalCount: response.totalElement,
    }
  })
}

export {
  getInvoices,
}
