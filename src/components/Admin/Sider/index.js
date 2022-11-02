import React from 'react';
import { OrderedListOutlined, ProfileOutlined, SwapOutlined } from '@ant-design/icons';
import Sider, { getItem } from 'components/Common/Sider';

export default function AdminSider(props) {
  const items = [
    getItem('Quản lý đơn hàng', 'tt1', <OrderedListOutlined />),
    getItem('Quản lý sản phẩm', 'tt2', <ProfileOutlined />),
    getItem('Quản lý đơn nạp', 'tt3', <SwapOutlined />),
  ];
  const defaultOpenKeys = ['facebook', 'tiktok']
  const defaultSelectedKeys = ['fb1']

  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Sider items={items}
           defaultOpenKeys={defaultOpenKeys}
           defaultSelectedKeys={defaultSelectedKeys}
           onClick={onClick}
           mode="inline"
    />
  );
}
