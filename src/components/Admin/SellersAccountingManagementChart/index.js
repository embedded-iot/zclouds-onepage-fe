import React, { useEffect, useRef, useState } from 'react';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import { AdminResellersService, AdminStatisticsService, SellerDashboardService } from 'services';
import { cui, events } from 'utils';
import OrdersAccountingOverviewChart from './OrdersAccountingOverviewChart';
import TableGrid from 'components/Common/TableGrid';
import OrdersAccountingStatus from 'components/Admin/SellersAccountingManagementChart/OrdersAccountingStatus';
import './style.scss';


const renderOrdersOverviewBody = ({ params = {}, dataSource = [] }) => {
  const { ordersCounts} = SellerDashboardService.transformOrdersOverviewChartData(dataSource);
  return (
    <div className="sellers-accounting__chart">
      <OrdersAccountingOverviewChart
        fromDate={!!params.fromDate ? new Date(params.fromDate) : undefined}
        toDate={!!params.toDate ? new Date(params.toDate) : undefined}
        data={ordersCounts}
      />
    </div>
  );
}

export default function SellersAccountingManagementChart({ RELOAD_EVENT_KEY = 'RELOAD_ORDERS_ACCOUNTING_OVERVIEW_CHART_TABLE_EVENT_KEY', }) {
  const [summaryData, setSummaryData] = useState({});
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  let ref = useRef({});

  const tableConfig = {
    customBodyTemplate: renderOrdersOverviewBody,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminStatisticsService.getSellersAccounting(cui.removeEmpty(restParams), successCallback, failureCallback)
    },
    successCallback: (response) => {
      setSummaryData(response)
    },
    failureCallback: (error) => {
    },
  };

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const handleFilterChange = (value, name) => {
    reloadTable( {
      [name] : value
    });
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

  useEffect(() => {
    getResellersOptions( {});
  }, []);

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <AutoCompleteInput name="sellerId"
                             value={resellersInput.value}
                             onChange={handleAutoCompleteInputChange}
                             onSelect={handleAutoCompleteInputSelect}
                             placeholder={"All Resellers"}
                             options={resellersInput.options}
                             autoFilterOptions={false}
          />
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

  return (
    <TableGrid configs={tableConfig}
               type="custom"
               headerActionsConfig={headerActionsConfig}
               secondHeader={<OrdersAccountingStatus data={summaryData} /> }
               paginationConfig={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={true}
               isAllowSelection={false}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
