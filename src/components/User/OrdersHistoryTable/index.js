import React from 'react';
import TableGrid from 'components/Common/TableGrid';
import { OrderUserService } from 'services';
import { Button } from 'antd';
import { events } from 'utils';
import OrdersHistoryFilters from './OrdersHistoryFilters';

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'convertedCreatedDate',
  },
  {
    title: 'Liên kết (Video/Bài viết/...)',
    dataIndex: 'targetLink',
  },
  {
    title: 'ID (Video/Bài viết/...)',
    dataIndex: 'targetId',
  },
  {
    title: 'Gói cước',
    dataIndex: 'offerName',
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
  },
  {
    title: 'Hóa đơn (đ)',
    dataIndex: 'invoiceLabel',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'convertStatus',
  },
];

export default function OrdersHistoryTable({ products, productType, serviceId }) {
  const RELOAD_EVENT_KEY = 'RELOAD_ORDER_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      console.log(params);
      const { pageSize: size, pageNum: page, productType: serviceType, serviceId: categoryId, ...restParams} = params || {};
      OrderUserService.getOrders({ ...restParams, page, size, serviceType, categoryId }, successCallback, failureCallback)
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
  const defaultParams = { productType, serviceId };
  return (
    <>
      <OrdersHistoryFilters productType={productType}
                            serviceId={serviceId}
                            products={products}
                            onChange={onFiltersChange}
      />
      <TableGrid tableConfig={tableConfig}
                 paginationConfig={paginationConfig}
                 actionButtonList={{}}
                 defaultParams={defaultParams}
                 isShowPagination={false}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
    </>
  );
}
