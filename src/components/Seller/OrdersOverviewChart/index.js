import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerDashboardService } from 'services';
import { cui } from 'utils';
import Icon from 'components/Common/Icon';
import circleIcon from 'images/circle-chart-green-icon.svg';
import { Col, Row } from 'antd';
import OrdersStatusList from './OrdersStatusList';
import OrdersCountChart from './OrdersCountChart';

const renderOrdersOverviewBody = ({ params = {}, dataSource = [] }) => {
  const { ordersCounts, ordersStatus} = SellerDashboardService.transformOrdersOverviewChartData(dataSource);
  return (
    <Row gutter={[24, 24]}>
      <Col span={18}>
        <OrdersCountChart fromDate={!!params.fromDate ? new Date(params.fromDate) : undefined}
                          toDate={!!params.toDate ? new Date(params.toDate) : undefined}
                          data={ordersCounts}
        />
      </Col>
      <Col span={6}>
        <OrdersStatusList data={ordersStatus}/>
      </Col>
    </Row>
  );
}

export default function OrdersOverviewChart({ RELOAD_EVENT_KEY = 'RELOAD_ORDERS_OVERVIEW_CHART_TABLE_EVENT_KEY', systemConfigs = [] }) {
  const tableConfig = {
    customBodyTemplate: renderOrdersOverviewBody,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerDashboardService.getOrdersOverview(cui.removeEmpty({ ...restParams }), successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
    },
  };

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <div className='display-flex display-flex--center-align-items'>
            <Icon src={circleIcon}/>
            <span className="dashboard-box__title">Orders overview</span>
          </div>
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
               paginationConfig={{}}
               defaultParams={{}}
               defaultData={{}}
               isShowPagination={true}
               isAllowSelection={false}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
               className="dashboard-box__table"
    />
  );
}
