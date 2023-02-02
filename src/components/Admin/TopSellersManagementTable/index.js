import React, { useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminStatisticsService } from 'services';
import { cui, events } from 'utils';
import SwitchBar from 'components/Common/SwitchBar';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';


export default function TopSellersManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_TRANSACTIONS_TABLE_EVENT_KEY';
  const [mode, setMode] = useState('day');
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
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, mode, ...restParams} = params || {};
      AdminStatisticsService.getTopSellers( cui.removeEmpty({ ...restParams, period: mode }), successCallback, failureCallback)
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

  const switchItems = [
    {
      label: 'Top day',
      value: 'day',
    },
    {
      label: 'Top month',
      value: 'month',
    }
  ];

  const handleModeChange = selectedMode => {
    setMode(selectedMode);
    reloadTable({
      mode: selectedMode
    });
  }

  return (
    <TableGrid configs={tableConfig}
               headerActionsConfig={{}}
               secondHeader={<SwitchBar items={switchItems} value={mode} onChange={handleModeChange}/>}
               paginationConfig={{}}
               defaultParams={{ mode }}
               defaultData={{}}
               isShowPagination={false}
               isSingleSelection={true}
               isAllowSelection={false}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
