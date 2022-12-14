import { BANK_TYPE_LABELS } from 'components/contants';
import { cui, makeGetWithConfigs } from 'utils';
import { getSellerBaseURL } from 'services/BaseService';

const transformBank = item => {
  return {
    ...item,
    convertedType: BANK_TYPE_LABELS[item.bankType] || item.bankType,
  }
}

const getGroupedBanks = items => {
  const groupedItems = cui.groupBy(items, item => item.bankType);
  const result = [];
  for (let [key, value] of groupedItems.entries()) {
    result.push({
      id: key,
      key: key,
      name: BANK_TYPE_LABELS[key] || key,
      children: value,
    })
  }
  return result;
}

function getBanksInfo(successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/bank';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    const items = response.map(transformBank);
    return items;
  });
}



export {
  getBanksInfo,
  getGroupedBanks,
}
