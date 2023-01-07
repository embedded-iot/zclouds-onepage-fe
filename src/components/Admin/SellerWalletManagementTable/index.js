import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminWalletsService } from 'services';
import { cui, events } from 'utils';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import plusIcon from 'images/plus-icon.svg';
import walletIcon from 'images/wallet_purple_icon.svg';
import Icon from 'components/Common/Icon';
import userIcon from 'images/user_black_icon-2.svg';
import editIcon from 'images/edit_black_icon.svg';
import infoIcon from 'images/info_black_icon.svg';
import TopUpTable from './TopUpTable';

import { ROLE_VALUES, ROUTERS } from 'components/contants';
import DeleteUserModal from 'components/Admin/UsersManagementTable/DeleteUserModal';
import './style.scss';



const ACTION_KEYS = {
  ADD_RESELLER: "ADD_RESELLER",
  EDIT_RESELLER: "EDIT_RESELLER",
  DETAIL_RESELLER: "DETAIL_RESELLER",
  DELETE_RESELLER: "DELETE_RESELLER",
  TOP_UP_RESELLER: "TOP_UP_RESELLER",
}

export default function SellerWalletManagementTable({ currentUser, redirectTo }) {
  const [topUpMode, setTopUpMode] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  // eslint-disable-next-line
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryData, setSummaryData] = useState({});
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_RESELLERS_WALLET_TABLE_EVENT_KEY';
  let ref = useRef({});

  const columns = [
    {
      title: 'Date',
      dataIndex: 'convertedCreatedDate',
    },
    {
      title: 'Seller',
      dataIndex: 'userName',
      render: (userName, record) => <span className="link" onClick={() => viewWalletDetails(record.resellerId)}>{userName}</span>
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
    },
    {
      title: 'Phone',
      dataIndex: 'userPhone',
    },
    {
      title: 'Total',
      dataIndex: 'convertedTotal',
    },
    {
      title: 'Used amount',
      dataIndex: 'convertedUsedAmount',
    },
    {
      title: 'Balance',
      dataIndex: 'convertedBalance',
    },
    {
      title: 'Updated Date',
      dataIndex: 'convertedUpdatedDate',
    },
  ];

  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminWalletsService.getWallets(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
      setSummaryData(response)
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addEditUser = (userId = 0) => {
    redirectTo(ROUTERS.ADMIN_USERS_MANAGEMENT + '/' + userId + '/' + (!!userId && !!selectedTransaction.user ? selectedTransaction.user.role :  ROLE_VALUES.RESELLER))
  }

  const viewWalletDetails = (sellerId) => {
    redirectTo(ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT + '/' + sellerId);
  }

  const editReseller = () => {
    addEditUser(selectedTransaction.resellerId);
  }

  const deleteReseller = () => {
    setOpenDeleteUser(true);
  }

  const addReseller = () => {
    addEditUser();
  }

  const showTopUpTable = () => {
    setTopUpMode(true);
  }


  const onSelectedItemsChange = (keys) => {
    const newSelectedTransaction = ref.current.items.find(item => item.id === keys[0]);
    setSelectedTransaction(newSelectedTransaction);
  }

  const SummaryBox = (
    <div className='seller-wallet-table__summary-box'>
      <div className='seller-wallet-table__summary-item'>
        <Icon src={userIcon} width={24} height={24} />
        <span className="seller-wallet-table__summary-title">
          Total account:
        </span>
        <span className='seller-wallet-table__summary-value'>{summaryData.totalCount || 0}</span>
      </div>
    </div>
  )

  const headerActionsConfig = {
    className: 'seller-wallet-table__table-header',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_RESELLER} icon={<Icon src={editIcon} width={18} height={18} /> } onClick={editReseller}>Edit</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_RESELLER} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteReseller}>Delete</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DETAIL_RESELLER} icon={<Icon src={infoIcon} width={24} height={24} /> } onClick={() => viewWalletDetails(selectedTransaction.resellerId)}>Details</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: SummaryBox,
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.TOP_UP_RESELLER} icon={<Icon src={walletIcon} width={24} height={24} /> } type="primary" ghost onClick={showTopUpTable}>Top up / Withdraw</Button>,
        align: 'right',
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_RESELLER} icon={<Icon src={plusIcon} width={18} height={18} /> } type="primary" onClick={addReseller}>Create new seller</Button>,
        align: 'right',
      },
    ],
  }

  return (
    <>
      <TableGrid configs={tableConfig}
                 className={`seller-wallet-table__table-wrapper ${!!topUpMode && 'hide-table'}`}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      <TopUpTable headerActionsConfig={headerActionsConfig}
                  className={`seller-wallet-table__top-up-table ${!topUpMode && 'hide-table'}`}
                  onCancel={() => setTopUpMode(false)}
                  onOk={reloadTable}
                  currentUser={currentUser}
      />
      {
        openDeleteUser && (
          <DeleteUserModal
            open={openDeleteUser}
            data={{ id: selectedTransaction.userId, username: selectedTransaction.walletUser}}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteUser(false); }}
          />
        )
      }
    </>
  );
}
