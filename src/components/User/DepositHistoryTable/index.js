import React from 'react';

import TableGrid from 'components/Common/TableGrid';
import { OrderUserService } from 'services';
import { Button } from 'antd';
import { datetime, events } from 'utils';

const columns = [
  {
    title: 'Thời gian',
    dataIndex: 'datetime',
  },
  {
    title: 'Phương thức',
    dataIndex: 'depositMethod',
  },
  {
    title: 'Số tiền',
    dataIndex: 'money',
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
    depositMethod: "NẠP QUA NGÂN HÀNG",
    money: `500.000 đ`,
    status: `Thành công`,
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
  // eslint-disable-next-line
  const actionButtonList = [
    <Button key={1} onClick={reloadTable}>Reload</Button>,
    <Button key={2}>ádasdad</Button>
  ]

  return (
    <TableGrid tableConfig={tableConfig}
               paginationConfig={paginationConfig}
               actionButtonList={{}}
               defaultParams={{}}
               defaultData={defaultData}
               isShowPagination={false}
               onSelectedItemsChange={onSelectedItemsChange}
               RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
    />
  );
}
