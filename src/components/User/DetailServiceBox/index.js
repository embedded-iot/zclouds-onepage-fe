import { OrderedListOutlined, SwapOutlined } from '@ant-design/icons';
import React from 'react';
import { Tabs } from 'antd';
import ServiceOrdersHistoryTable from 'components/User/ServiceOrdersHistoryTable';
import CreateServiceOrder from 'components/User/CreateServiceOrder';

export default function DetailServiceBox(props) {
  const tabItems = [
    {
      label: (
        <span>
          <SwapOutlined />
          Tạo đơn hàng
        </span>
      ),
      key: 1,
      children: <CreateServiceOrder />,
    },
    {
      label: (
        <span>
          <OrderedListOutlined />
          Lịch sử đơn hàng
        </span>
      ),
      key: 2,
      children: <ServiceOrdersHistoryTable products={props.products}/>,
    },
  ]

  return (
    <Tabs
      defaultActiveKey={1}
      items={tabItems}
    />
  );
}
