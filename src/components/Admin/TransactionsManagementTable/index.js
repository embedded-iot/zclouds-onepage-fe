import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminTransactionsService } from 'services';
import { authentication, cui, events } from 'utils';
import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import ConfirmTransactionModal from './ConfirmTransactionModal';
import CancelTransactionModal from './CancelTransactionModal';
import BoxCard from 'components/Share/BoxCard';
import {
  PERMISSION_VALUES, RESPONSIVE_MEDIAS,
  ROUTERS,
  TRANSACTION_STATUS_LABEL_VALUE_OPTIONS, TRANSACTION_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import DropdownSelect from 'components/Common/DropdownSelect';
import checkboxIcon from 'images/checkbox-green-icon.svg';
import Icon from 'components/Common/Icon';
import StatusTag from 'components/Share/StatusTag';

import { useMediaQuery } from 'react-responsive';
import './style.scss';



const ACTION_KEYS = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  CONFIRM_TRANSACTION: "CONFIRM_TRANSACTION",
  CANCEL_TRANSACTION: "CANCEL_TRANSACTION",
}

export default function TransactionsManagementTable({ redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openCancelTransaction, setOpenCancelTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryData, setSummaryData] = useState({});
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_TRANSACTIONS_TABLE_EVENT_KEY';
  let ref = useRef({});


  const columns = [
    {
      title: 'Sender',
      dataIndex: 'infoSender',
    },
    {
      title: 'Recipient',
      dataIndex: 'infoReceiver',
    },
    {
      title: 'Type',
      dataIndex: 'convertedType',
    },
    {
      title: 'Amount',
      dataIndex: 'convertedMoney',
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },
    {
      title: 'Date',
      dataIndex: 'convertedCreatedDate',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
    },
    {
      title: 'Status',
      dataIndex: 'convertedStatus',
      render: (convertedStatus, record) => {
        return (<StatusTag value={record.status} label={convertedStatus}/>);
      }
    },
    {
      title: 'Approval',
      dataIndex: 'approve',
    },
    {
      title: 'Seller',
      dataIndex: 'resellerName',
      render: (resellerName, record) => <span className="link" onClick={() => viewWalletDetails(record.resellerId)}>{resellerName}</span>
    },
  ];

  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminTransactionsService.getTransactions( cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
      setSummaryData({})
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };




  const viewWalletDetails = (sellerId) => {
    redirectTo(ROUTERS.ADMIN_SELLER_WALLETS_MANAGEMENT + '/' + sellerId);
  }

  const reloadTable = (filters ={}) => {
    setOpenCancelTransaction(false);
    setOpenAddTransaction(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const confirmTransaction = () => {
    setIsEdit(true);
    setOpenAddTransaction(true);
  }

  const cancelTransaction = () => {
    setOpenCancelTransaction(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedTransaction = ref.current.items.find(item => item.id === keys[0]);
    setSelectedTransaction(newSelectedTransaction);
  }

  const onDropdownChange = (value, name) => {
    reloadTable({
      [name]: value
    });
  }

  const SummaryBox = (
    <div className='transactions-table__summary-box'>
      <div className='transactions-table__summary-item'>
        Total deposit amount:
        <span className='transactions-table__summary-value transactions-table__summary-value--first'>{summaryData.totalDepositAmount || 0}</span>
      </div>
      <div className='transactions-table__summary-item'>
        Total orders amount:
        <span className='transactions-table__summary-value transactions-table__summary-value--second'>{summaryData.totalOrdersAmount || 0}</span>
      </div>
      <div className='transactions-table__summary-item'>
        Balance:
        <span className='transactions-table__summary-value transactions-table__summary-value--third'>{summaryData.balance || 0}</span>
      </div>
    </div>
  )

  const FiltersBox = (
    <div className='transactions-table__filters-box'>
      <DropdownSelect
        name="type"
        options={TRANSACTION_TYPE_LABEL_VALUE_OPTIONS}
        defaultValue={''}
        onChange={onDropdownChange}
        style={{minWidth: 200}}
        theme="light"
      />
      <DropdownSelect
        name="status"
        options={TRANSACTION_STATUS_LABEL_VALUE_OPTIONS}
        defaultValue={''}
        onChange={onDropdownChange}
        style={{minWidth: 210}}
        theme="light"
      />
    </div>
  )

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.CONFIRM_TRANSACTION} icon={<Icon src={checkboxIcon} width={18} height={18} /> } type="primary" ghost onClick={confirmTransaction}>Confirm transaction</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.CANCEL_TRANSACTION} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={cancelTransaction}>Reject transaction</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, transaction_id, name received ...',
        }
      },
      {
        type: 'custom',
        render: SummaryBox,
        requiredSelection: false,
        permission: false,
      },
      {
        type: 'custom',
        render: FiltersBox,
        align: 'right',
        permission: false,
      },
      {
        type: 'custom',
        span: 12,
        render: (
          <DropdownSelect
            name="type"
            options={TRANSACTION_TYPE_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onDropdownChange}
            style={{width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? '100%' : 210}}
            theme="light"
          />
        ),
        align: 'right',
      },
      {
        type: 'custom',
        span: 12,
        render: (
          <DropdownSelect
            name="status"
            options={TRANSACTION_STATUS_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onDropdownChange}
            style={{width: isMobile ? '100%' : 'auto', maxWidth: isMobile ? '100%' : 210}}
            theme="light"
          />
        ),
        align: 'right',
      },
    ],
  }
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'}>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_TRANSACTIONS)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddTransaction && (
          <ConfirmTransactionModal
            open={openAddTransaction}
            data={isEdit ? selectedTransaction : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddTransaction(false); }}
          />
        )
      }
      {
        openCancelTransaction && (
          <CancelTransactionModal
            open={openCancelTransaction}
            data={selectedTransaction}
            onOk={reloadTable}
            onCancel={() => { setOpenCancelTransaction(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
