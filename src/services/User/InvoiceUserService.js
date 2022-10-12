import { datetime, format, makeGetWithConfigs } from 'utils';
import { getBaseURL } from '../BaseService'
import { DATETIME_FORMAT, INVOICE_LABELS } from 'components/contants';

const transformInvoice = (invoice) => {
  invoice.convertedCreatedDate = datetime.convert(invoice.createdDate, DATETIME_FORMAT);
  invoice.conventedType = INVOICE_LABELS[invoice.type] || invoice.type;
  invoice.conventedCredit = `${format.formatCurrency(invoice.credit)}` ;
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
