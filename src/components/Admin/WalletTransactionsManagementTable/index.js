import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import {  AdminWalletsService } from 'services';
import { cui, events } from 'utils';
import BoxCard from 'components/Share/BoxCard';
import {
  RESPONSIVE_MEDIAS,
  TRANSACTION_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import DropdownSelect from 'components/Common/DropdownSelect';
import { useMediaQuery } from 'react-responsive';
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

export default function WalletTransactionsManagementTable({ sellerId }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_WALLET_TRANSACTIONS_TABLE_EVENT_KEY';
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminWalletsService.getWalletDetails(sellerId, cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
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

  const onDropdownChange = (value, name) => {
    reloadTable({
      [name]: value
    });
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, name...',
        }
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="type"
            options={TRANSACTION_TYPE_LABEL_VALUE_OPTIONS}
            defaultValue={''}
            onChange={onDropdownChange}
            style={{maxWidth: 210}}
            theme="light"
          />
        ),
      },
      {
        type: 'datePicker',
        props: {
          theme: "light",
        }
      },
      {
        type: 'searchButton',
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
                 onSelectedItemsChange={() => {}}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </BoxWrapper>
  );
}
