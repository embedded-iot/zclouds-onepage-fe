import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerWalletService } from 'services';
import { events } from 'utils';
import VerifyTopUpModal from './VerifyTopUpModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button } from 'antd';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-green-icon.svg';
import circleIcon from 'images/circle-chart-green-icon.svg';

import './style.scss';

const columns = [
  {
    title: 'ID/Number',
    dataIndex: 'id',
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

export default function WalletsTable({ RELOAD_EVENT_KEY = 'RELOAD_RESELLER_WALLET_TABLE_EVENT_KEY' }) {
  const [openVerifyTopUp, setOpenVerifyTopUp] = useState(false);
  // eslint-disable-next-line
  const [openAddMoneyToWallet, setOpenAddMoneyToWallet] = useState(false);
  // eslint-disable-next-line
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerWalletService.getWalletHistory({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const verifyTopUp = () => {
    setOpenVerifyTopUp(true);
  }

  const addMoneyToWallet = () => {
    setOpenAddMoneyToWallet(true);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <div className='display-flex display-flex--center-align-items'>
            <Icon src={circleIcon} width={24} height={24}/>
            <span className="wallet-table__title">Topup history</span>
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

  const buttonList = [
    <Button type="primary" ghost onClick={verifyTopUp} icon={<Icon src={plusIcon} width={18} height={18} />} >
      Verify to up
    </Button>,
    <Button type="primary" ghost onClick={addMoneyToWallet} icon={<Icon src={plusIcon} width={18} height={18} />} >
      Top up (Add money to wallet)
    </Button>,
  ]

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
                         className="wallet-table__button-list"
      />
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openVerifyTopUp && (
          <VerifyTopUpModal
            open={openVerifyTopUp}
            onOk={reloadTable}
            onCancel={() => { setOpenVerifyTopUp(false); }}
          />
        )
      }
    </>
  );
}
