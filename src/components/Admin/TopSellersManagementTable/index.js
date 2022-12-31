import React, { useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminStatisticsService } from 'services';
import { cui, events } from 'utils';
import SwitchBar from 'components/Common/SwitchBar';
import './style.scss';


export default function TopSellersManagementTable() {
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_TRANSACTIONS_TABLE_EVENT_KEY';
  const [mode, setMode] = useState('topday');
  const columns = [
    {
      title: 'Seller',
      dataIndex: 'seller',
    },
    {
      title: 'Revenue',
      dataIndex: 'convertedRevenue',
    },
  ];

  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminStatisticsService.getTopSellers( cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
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

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Search by name...',
        }
      },
      {
        type: 'searchButton',
      },
    ],
  }

  const switchItems = [
    {
      label: 'Top day',
      value: 'topday',
    },
    {
      label: 'Top month',
      value: 'topmonth',
    }
  ];

  const handleModeChange = selectedMode => {
    setMode(selectedMode);
    reloadTable({
      mode
    });
  }

  return (
    <TableGrid configs={tableConfig}
               headerActionsConfig={headerActionsConfig}
               secondHeader={<SwitchBar items={switchItems} value={mode} onChange={handleModeChange}/>}
               paginationConfig={{}}
               defaultParams={{ mode }}
               defaultData={{}}
               isShowPagination={true}
               isSingleSelection={true}
               isAllowSelection={false}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
