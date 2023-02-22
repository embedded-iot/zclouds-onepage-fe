import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerDashboardService } from 'services';
import { cui } from 'utils';
import Icon from 'components/Common/Icon';
import circleIcon from 'images/circle-chart-green-icon.svg';
import { Col, Row } from 'antd';
import OrdersStatusList from './OrdersStatusList';
import OrdersCountChart from './OrdersCountChart';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

const renderOrdersOverviewBody = ({ params = {}, dataSource = [], isMobile = false }) => {
  const { ordersCounts, ordersStatus} = SellerDashboardService.transformOrdersOverviewChartData(dataSource);
  return (
    <Row gutter={isMobile ? [0, 8] : [24, 24]}>
      <Col span={isMobile ? 24 : 18}>
        <OrdersCountChart fromDate={!!params.fromDate ? new Date(params.fromDate) : undefined}
                          toDate={!!params.toDate ? new Date(params.toDate) : undefined}
                          data={ordersCounts}
        />
      </Col>
      <Col span={isMobile ? 24 : 6}>
        <OrdersStatusList data={ordersStatus}/>
      </Col>
    </Row>
  );
}

export default function OrdersOverviewChart({ RELOAD_EVENT_KEY = 'RELOAD_ORDERS_OVERVIEW_CHART_TABLE_EVENT_KEY', systemConfigs = [] }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const tableConfig = {
    customBodyTemplate: (props) => renderOrdersOverviewBody({ ...props, isMobile }),
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
    allowRowLayout: isMobile,
    gutter: [10, 10],
    buttonList: [
      {
        type: 'custom',
        render: (
          <div className='display-flex display-flex--center-align-items'>
            <Icon src={circleIcon}/>
            <span className="dashboard-box__title">Orders overview</span>
          </div>
        ),
        span: 24,
      },
      {
        type: 'datePicker',
        align: "right",
        span: 18,
      },
      {
        type: 'searchButton',
        align: "right",
        span: 6,
        props: isMobile && {
          style: { width: '100%' }
        }
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
