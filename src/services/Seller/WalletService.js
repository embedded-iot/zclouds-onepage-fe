import { getSellerBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import { DATETIME_FORMAT } from 'components/contants';

const transformWalletHistory = item => {
  return {
    ...item,
    convertedWalletBefore: !!item.walletBefore ? format.formatCurrency(item.walletBefore) : '',
    convertedBalanceBefore: !!item.balanceBefore ? format.formatCurrency(item.balanceBefore) : '',
    convertedTopUp: !!item.topUp ? format.formatCurrency(item.topUp) : '',
    convertedWalletAfter: !!item.walletAfter ? format.formatCurrency(item.walletAfter) : '',
    convertedBalanceAfter: !!item.balanceAfter ? format.formatCurrency(item.balanceAfter) : '',
    convertedCreatedDate: !!item.createdate ? datetime.convert(item.createdate, DATETIME_FORMAT) : '',
  }
}

const walletHistoryItems = [];
for (let i = 0; i < 10; i++) {
  walletHistoryItems.push(transformWalletHistory({
    id: i,
    description: 'Topup by Techcombank banking 10.10.2022',
    walletBefore: 100.2,
    balanceBefore: 100000,
    topUp: 2000,
    walletAfter: 400,
    balanceAfter: 60000,
    createdate: 1669993510000,
  }));
}

function getWalletHistory(params, successCallback, failureCallback) {
  successCallback({
    items: walletHistoryItems,
    totalCount: 10,
    pageNum: 1,
    totalPage: 1,
  });
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/wallet/wallet-history';
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
    convertedWalletTotal: !!item.walletTotal ? format.formatCurrency(item.walletTotal) : '',
    convertedOrdersTotal: !!item.ordersTotal ? format.formatCurrency(item.ordersTotal) : '',
    convertedYourBalance: !!item.yourBalance ? format.formatCurrency(item.yourBalance) : '',
  }
}

function getWalletTotal(successCallback, failureCallback) {
  successCallback(transformWalletTotal({
    walletTotal: 10,
    ordersTotal: 12131,
    yourBalance: 222222,
  }));
  const url = getSellerBaseURL() + '/wallet/wallet-total';
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
