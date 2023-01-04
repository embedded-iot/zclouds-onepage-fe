import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerWalletService } from 'services';
import { cui, events } from 'utils';
import Icon from 'components/Common/Icon';
import circleIcon from 'images/circle-chart-green-icon.svg';


const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'transactionId',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Wallet Before ($)',
    dataIndex: 'convertedWalletBefore',
  },
  {
    title: 'Balance Before ($)',
    dataIndex: 'convertedBalanceBefore',
  },
  {
    title: 'Top up ($)',
    dataIndex: 'convertedTopUp',
  },
  {
    title: 'Wallet After ($)',
    dataIndex: 'convertedWalletAfter',
  },
  {
    title: 'Balance After ($)',
    dataIndex: 'convertedBalanceAfter',
  },
  {
    title: 'Date',
    dataIndex: 'convertedCreatedDate',
  },
];

export default function OrdersOverviewChart({ RELOAD_EVENT_KEY = 'RELOAD_ORDERS_OVERVIEW_CHART_TABLE_EVENT_KEY', systemConfigs = [] }) {
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerWalletService.getWalletHistory(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  // eslint-disable-next-line
  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <div className='display-flex display-flex--center-align-items'>
            <Icon src={circleIcon}/>
            <span className="wallet-table__title">Orders overview</span>
          </div>
        )
      },
      {
        type: 'datePicker',
        align: "right"
      },
      {
        type: 'searchButton',
        align: "right"
      },
    ],
  }

  return (
    <>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
                 className="dashboard-box__table"
      />
    </>
  );
}
