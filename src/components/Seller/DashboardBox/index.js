import React, { useEffect, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerStatisticsService, SellerWalletService } from 'services';
import { cui, events } from 'utils';
import WalletTotalCards from './WalletTotalCards';
import circleIcon from 'images/circle-chart-green-icon.svg';

import './style.scss';

const columns = [
  {
    title: 'Product name',
    dataIndex: 'productName',
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
  },
  {
    title: 'Unit sales',
    dataIndex: 'unitSales',
  },
  {
    title: 'Fulfillment cost',
    dataIndex: 'convertedCost',
  },
];

export default function DashboardBox({ RELOAD_EVENT_KEY = 'RELOAD_RESELLER_WALLET_TABLE_EVENT_KEY' }) {
  const [walletTotalData, setWalletTotalData] = useState({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerStatisticsService.getTopsellingProducts(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const getWalletTotal = (params = {}) => {
    SellerWalletService.getWalletTotal(response => {
      setWalletTotalData(response);
    });
  }

  // eslint-disable-next-line
  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }


  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: "Search by product name"
        }
      },
      {
        type: 'searchButton',
      },
    ],
  }


  useEffect(() => {
    getWalletTotal();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <WalletTotalCards data={walletTotalData} />
      <br />
      <div className='display-flex display-flex--center-align-items'>
        <Icon src={circleIcon} width={24} height={24}/>
        <span className="wallet-table__title">Topup Selling Product</span>
      </div>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
                 className="wallet-table__table"
      />
    </>
  );
}
