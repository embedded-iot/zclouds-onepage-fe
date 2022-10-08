import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { OrderUserService } from 'services';
import { Button } from 'antd';
import { datetime, events } from 'utils';
import OrdersHistoryFilters from './OrdersHistoryFilters';

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'datetime',
  },
  {
    title: 'Mã đơn hàng',
    dataIndex: 'orderId',
  },
  {
    title: 'Post ID',
    dataIndex: 'postID',
  },
  {
    title: 'Dịch vụ',
    dataIndex: 'serviceName',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    datetime: datetime.convert(new Date(), "DD/MM/YYYY HH:MM"),
    orderId: i,
    postID: Math.random(),
    serviceName: `Youtube like`,
    status: `Hoàn thành`,
  });
}

export default function OrdersHistoryTable({ products }) {
  const RELOAD_EVENT_KEY = 'RELOAD_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      OrderUserService.getOrders(params, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const paginationConfig = {};

  const onSelectedItemsChange = (selectedKeys) => {

  }

  const defaultData = {
    items: data,
    totalCount: 46,
  }

  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }
  // eslint-disable-next-line
  const actionButtonList = [
    <Button key={1} onClick={reloadTable}>Reload</Button>,
    <Button key={2}>ádasdad</Button>
  ]

  const onFiltersChange = filters => {
    reloadTable(filters);
  }

  return (
    <>
      <OrdersHistoryFilters products={products} onChange={onFiltersChange} />
      <TableGrid tableConfig={tableConfig}
                 paginationConfig={paginationConfig}
                 actionButtonList={{}}
                 defaultParams={{}}
                 defaultData={defaultData}
                 isShowPagination={false}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </>
  );
}
