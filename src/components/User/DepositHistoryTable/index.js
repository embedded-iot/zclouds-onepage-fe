import React from 'react';

import TableGrid from 'components/Common/TableGrid';
import { OrderUserService } from 'services';
import { Button } from 'antd';
import { events } from 'utils';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default function DepositHistoryTable(props) {
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

  const reloadTable = () => {
    events.publish(RELOAD_EVENT_KEY, { searchText: 'sadasd'});
  }

  const actionButtonList = [
    <Button key={1} onClick={reloadTable}>Reload</Button>,
    <Button key={2}>ádasdad</Button>
  ]

  return (
    <TableGrid tableConfig={tableConfig}
               paginationConfig={paginationConfig}
               actionButtonList={actionButtonList}
               defaultParams={{}}
               defaultData={defaultData}
               isShowPagination={false}
               onSelectedItemsChange={onSelectedItemsChange}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
