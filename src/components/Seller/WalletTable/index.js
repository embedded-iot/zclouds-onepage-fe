import React, { useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerWalletService } from 'services';
import { cui, events } from 'utils';
import VerifyTopUpModal from './VerifyTopUpModal';
import WalletTotalCards from './WalletTotalCards';
import AddMoneyToWalletModal from './AddMoneyToWalletModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button } from 'antd';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-green-icon.svg';
import circleIcon from 'images/circle-chart-green-icon.svg';

import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';

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

export default function WalletsTable({ RELOAD_EVENT_KEY = 'RELOAD_RESELLER_WALLET_TABLE_EVENT_KEY', systemConfigs = [] }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openVerifyTopUp, setOpenVerifyTopUp] = useState(false);
  const [openAddMoneyToWallet, setOpenAddMoneyToWallet] = useState(false);
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
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
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
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
        align: "right",
        span: 18,
      },
      {
        type: 'searchButton',
        align: "right",
        span: 6,
        props: isMobile && {
          style: { width: '100%' }
        }
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
                         align={!isMobile && 'right'}
                         className={`wallet-table__button-list ${isMobile && 'box-card--mobile'}`}
      />
      <WalletTotalCards />
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
                 className={`wallet-table__table ${isMobile && 'wallet-table__table--mobile'}`}
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
      {
        openAddMoneyToWallet && (
          <AddMoneyToWalletModal
            open={openAddMoneyToWallet}
            systemConfigs={systemConfigs}
            onCancel={() => { setOpenAddMoneyToWallet(false); }}
          />
        )
      }
    </>
  );
}
