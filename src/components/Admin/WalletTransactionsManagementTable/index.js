import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminResellersService, AdminWalletTransactionsService } from 'services';
import { cui, events } from 'utils';
import BoxCard from 'components/Share/BoxCard';
import {
  TRANSACTION_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';

import DropdownSelect from 'components/Common/DropdownSelect';

import './style.scss';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';


const columns = [

  {
    title: 'Wallet ID',
    dataIndex: 'walletId',
  },
  {
    title: 'Wallet User',
    dataIndex: 'walletUser',
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
    title: 'Approval',
    dataIndex: 'approve',
  },
];

export default function WalletTransactionsManagementTable() {
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  const [filters, setFilters] = useState({});
  let ref = useRef({});
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_WALLET_TRANSACTIONS_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminWalletTransactionsService.getWalletTransactions( cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
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

  const handleFilterChange = (value, name) => {
    const newFilters = {
      ...filters,
      ...(typeof value === 'object' ? value : { [name]: value })
    }
    setFilters(newFilters);
    reloadTable(newFilters);
  }


  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellersInput((prevState) => {
        return {
          ...prevState,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const handleAutoCompleteInputChange = (value, name) => {
    setResellersInput({
      ...resellersInput,
      value: value,
    });

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getResellersOptions({ keyword: value });
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        requiredSelection: false,
        props: {
          placeholder: 'Search by id, transaction_id, name received ...',
        }
      },
      {
        type: 'custom',
        render: (
          <AutoCompleteInput name="resellerId"
                             value={resellersInput.value}
                             onChange={handleAutoCompleteInputChange}
                             onSelect={handleAutoCompleteInputSelect}
                             placeholder={"All Resellers"}
                             options={resellersInput.options}
                             autoFilterOptions={false}
                             theme='light'
                             style={{minWidth: 210}}
          />
        ),
        align: 'right',
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
        align: 'right',
      },
    ],
  }

  useEffect(() => {
    getResellersOptions( {});
    // eslint-disable-next-line
  }, []);


  return (
    <BoxCard className="content-box__wrapper">
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isSingleSelection={true}
                 onSelectedItemsChange={() => {}}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </BoxCard>
  );
}
