import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminResellersService } from 'services';
import { events } from 'utils';
import Icon from 'components/Common/Icon';

import searchGreenIcon from 'images/search_green.svg';
import BoxCard from 'components/Share/BoxCard';
import DatePickerSelect from 'components/Common/DatePickerSelect';


const columns = [
  {
    title: 'Seller ID',
    dataIndex: 'id',
  },
  {
    title: 'Seller Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Stores count',
    dataIndex: 'storeCount',
  },
  {
    title: 'Total paid amount',
    dataIndex: 'totalPaid',
  },
  {
    title: 'Total unpaid amount',
    dataIndex: 'totalUnpaid',
  },
  // {
  //   title: 'Status',
  //   dataIndex: 'convertedStatus',
  //   render: (convertedStatus, record) => {
  //     return (<Tag className="sellers-management-table__status-cell" color={STATE_COLORS[record.status] || 'default'}>{convertedStatus}</Tag>);
  //   }
  // },
];

export default function SellersManagementTable({ RELOAD_EVENT_KEY = 'RELOAD_ADMIN_SELLERS_MANAGEMENT_TABLE_EVENT_KEY' }) {
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminResellersService.getResellers({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
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

  const handleDateChange = (date, dateString, name) => {
    console.log(date, dateString, name);
    reloadTable({
      [name]: dateString
    })
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Search by name...',
          theme: 'light',
        }
      },
      {
        type: 'pageNum',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'pageSize',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'custom',
        render: (
          <DatePickerSelect name="date"
                            onChange={handleDateChange}
                            theme='light'
                            isSingleSelection={true}
          />
        )
      },
      {
        type: 'searchButton',
        props: {
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        }
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
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </BoxCard>
  );
}
