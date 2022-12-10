import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminTransactionsService } from 'services';
import { cui, events } from 'utils';
import { Button, Tag } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ConfirmTransactionModal from './ConfirmTransactionModal';
import CancelTransactionModal from './CancelTransactionModal';
import BoxCard from 'components/Share/BoxCard';
import { STATE_COLORS, TRANSACTION_STATUS_LABELS, TRANSACTION_STATUS_VALUES_LIST } from 'components/contants';

import './style.scss';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'id',
  },
  {
    title: 'Date',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Seller',
    dataIndex: 'resellerName',
  },
  {
    title: 'Type',
    dataIndex: 'convertedType',
  },
  {
    title: 'Money',
    dataIndex: 'convertedMoney',
  },
  {
    title: 'Payment method',
    dataIndex: 'paymentMethod',
  },
  {
    title: 'Status',
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<Tag className="transactions-table__status-cell" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>);
    }
  },
];

const ACTION_KEYS = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  CONFIRM_TRANSACTION: "CONFIRM_TRANSACTION",
  CANCEL_TRANSACTION: "CANCEL_TRANSACTION",
}

export default function TransactionsManagementTable() {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [opencancelTransaction, setOpencancelTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_TRANSACTIONS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminTransactionsService.getTransactions( cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpencancelTransaction(false);
    setOpenAddTransaction(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const confirmTransaction = () => {
    setIsEdit(true);
    setOpenAddTransaction(true);
  }

  const cancelTransaction = () => {
    setOpencancelTransaction(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedTransaction = ref.current.items.find(item => item.id === keys[0]);
    setSelectedTransaction(newSelectedTransaction);
  }

  // const TransactionsSummaryBox = (
  //   <div className="transactions-table__wallet-summary-box">
  //     <div className='transactions-table__wallet-summary'>Wallet total:</div>
  //     <div className="transactions-table__status-button">Tất cả (0)</div>
  //   </div>
  // );

  const TransactionsStatusBox = (
    <div className="transactions-table__status-box">
      <div className='transactions-table__status-title'>Hiển thị:</div>
      <div className="transactions-table__status-button">Tất cả (0)</div>
      {
        TRANSACTION_STATUS_VALUES_LIST.map(statusValue => (
          <div className="transactions-table__status-button" key={statusValue}>{TRANSACTION_STATUS_LABELS[statusValue]} (0)</div>
        ))
      }
    </div>
  );

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.CONFIRM_TRANSACTION} icon={<EditOutlined />} onClick={confirmTransaction}>Confirm transaction</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.CANCEL_TRANSACTION} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={cancelTransaction}>Cancel transaction</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <div></div>,
        requiredSelection: false,
      },
      {
        type: 'custom',
        render: TransactionsStatusBox,
        align: 'right',
      },
    ],
  }

  return (
    <BoxCard className="content-box__wrapper">
      <TableGrid configs={tableConfig}
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
        opencancelTransaction && (
          <CancelTransactionModal
            open={opencancelTransaction}
            data={selectedTransaction}
            onOk={reloadTable}
            onCancel={() => { setOpencancelTransaction(false); }}
          />
        )
      }
    </BoxCard>
  );
}
