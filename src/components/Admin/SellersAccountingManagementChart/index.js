import React, { useEffect, useRef, useState } from 'react';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import { AdminDashboardService, AdminResellersService, AdminStatisticsService, BaseService } from 'services';
import { cui, datetime, events } from 'utils';
import OrdersAccountingOverviewChart from './OrdersAccountingOverviewChart';
import TableGrid from 'components/Common/TableGrid';
import OrdersAccountingStatus from 'components/Admin/SellersAccountingManagementChart/OrdersAccountingStatus';
import { DATA_DATE_FORMAT, DATETIME_FORMAT } from 'components/contants';
import './style.scss';
import { downloadFile } from 'utils/requests';
import { Button, notification } from 'antd';
import Icon from 'components/Common/Icon';
import exportIcon from 'images/export_green_purple_icon.svg';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';


const renderOrdersOverviewBody = ({ params = {}, dataSource = [] }) => {
  return (
    <div className="sellers-accounting__chart">
      <OrdersAccountingOverviewChart
        fromDate={!!params.fromDate ? new Date(params.fromDate) : undefined}
        toDate={!!params.toDate ? new Date(params.toDate) : undefined}
        data={dataSource}
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
      const requestParams = cui.removeEmpty(restParams);
      ref.current.params = requestParams;
      AdminStatisticsService.getSellersAccounting(requestParams, successCallback, failureCallback)
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
                             placeholder={"All sellers"}
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
  const exportOrders = () => {
    const params = ref.current.params || {};
    AdminDashboardService.exportStatistics(params, response => {
      downloadFile(response, `dashboard-statistics_${datetime.convert(new Date(), DATETIME_FORMAT)}.xlsx`);
      notification.success({
        message: "Export dashboard statistics successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Export dashboard statistics failure!"),
      });
    })
  }
  const buttonList = [
    <Button type="primary" ghost icon={<Icon src={exportIcon} width={24} height={24} />} onClick={exportOrders}>Export statistics</Button>,
  ]

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
      <TableGrid configs={tableConfig}
                 type="custom"
                 headerActionsConfig={headerActionsConfig}
                 secondHeader={<OrdersAccountingStatus data={summaryData} /> }
                 paginationConfig={{}}
                 defaultParams={{
                   fromDate: datetime.convert(datetime.getPreviousDay(new Date(), 6), DATA_DATE_FORMAT),
                   toDate: datetime.convert(new Date(), DATA_DATE_FORMAT)
                 }}
                 defaultData={{}}
                 isShowPagination={true}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </>
  );
}
