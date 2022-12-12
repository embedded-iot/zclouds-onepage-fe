import { getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { DATETIME_FORMAT } from 'components/contants';

const transformWalletHistory = item => {
  return {
    ...item,
    convertedWalletBefore: !!item.walletBefore ? format.formatCurrency(item.walletBefore) : '',
    convertedBalanceBefore: !!item.balanceBefore ? format.formatCurrency(item.balanceBefore) : '',
    convertedTopUp: !!item.amount ? format.formatCurrency(item.amount) : '',
    convertedWalletAfter: !!item.walletAfter ? format.formatCurrency(item.walletAfter) : '',
    convertedBalanceAfter: !!item.balanceAfter ? format.formatCurrency(item.balanceAfter) : '',
    convertedCreatedDate: !!item.date ? datetime.convert(item.date, DATETIME_FORMAT) : '',
  }
}

function getWalletHistory(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/wallet/top-ups';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformWalletHistory);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

const transformWalletTotal = item => {
  return {
    ...item,
    convertedWalletTotal: !!item.walletTotal ? format.formatCurrency(item.walletTotal) : 0,
    convertedOrdersTotal: !!item.orderTotal ? format.formatCurrency(item.orderTotal) : 0,
    convertedYourBalance: !!item.balance ? format.formatCurrency(item.balance) : 0,
  }
}

function getWalletTotal(successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/wallet';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformWalletTotal);
}

function verifyTopUp(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/wallet/verify-top-up';
  makePostWithConfigs(url, config, successCallback, failureCallback, transformWalletTotal);
}

function getWalletMethods(successCallback, failureCallback) {
  successCallback({
    walletMethods: [
      {
        id: 1,
        name: 'Bank of Viet Nam',
        methods: [
          (
            <div>
              Bank Name: Techcombank<br/>
              Acount Number: 19032268390022<br/>
              Acount Name: HOANG MANH CUONG<br/>
              Transfer content: LF2125TU NAMNGUYENHT1802<br/>
              Enter the exact content of the transfer
            </div>
          ),
          (
            <div>
              Bank Name: Vietcombank<br/>
              Acount Number: FULFILL<br/>
              Acount Name: HOANG MANH CUONG<br/>
              Transfer content: LF2125TU NAMNGUYENHT1802<br/>
              Enter the exact content of the transfer
            </div>
          )
        ]
      },
      {
        id: 2,
        name: 'Payoneer',
        methods: [
          (
            <div>
              Bank Name: Techcombank<br/>
              Acount Number: 19032268390022<br/>
              Acount Name: HOANG MANH CUONG<br/>
              Transfer content: LF2125TU NAMNGUYENHT1802<br/>
              Enter the exact content of the transfer
            </div>
          )
        ]
      },
      {
        id: 3,
        name: 'Pingpong',
        methods: [
          (
            <div>
              Bank Name: Vietcombank<br/>
              Acount Number: FULFILL<br/>
              Acount Name: HOANG MANH CUONG<br/>
              Transfer content: LF2125TU NAMNGUYENHT1802<br/>
              Enter the exact content of the transfer
            </div>
          )
        ]
      },
    ]
  })
  const url = getSellerBaseURL() + '/wallet/wallet-methods';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

function getWalletMethodsOptions(walletMethodList = []) {
  return [
    { label: 'Select type', value: '' },
    ...walletMethodList.map(item => ({
      label: item.name,
      value: item.id,
    }))
  ]
}

export {
  getWalletHistory,
  getWalletTotal,
  verifyTopUp,
  getWalletMethods,
  getWalletMethodsOptions,
}
