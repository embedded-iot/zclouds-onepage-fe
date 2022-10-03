import React from 'react';
import { UserOutlined, ClusterOutlined, OrderedListOutlined, ProfileOutlined, SwapOutlined } from '@ant-design/icons';
import Sider, { getItem } from 'components/Share/Layout/Sider';

export default function AdminSider(props) {
  const items = [
    getItem('TÀI KHOẢN & PHÂN QUYỀN', 'facebook', undefined, [
      getItem('Quản lý tài khoản', 'fb1', <UserOutlined />),
      getItem('Quản lý quyển', 'fb2', <ClusterOutlined />),
    ]),
    getItem('ĐƠN HÀNG & SẢN PHẨM && ĐƠN NẠP', 'tiktok', undefined, [
      getItem('Quản lý đơn hàng', 'tt1', <OrderedListOutlined />),
      getItem('Quản lý sản phẩm', 'tt2', <ProfileOutlined />),
      getItem('Quản lý đơn nạp', 'tt3', <SwapOutlined />),
    ]),
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
    />
  );
}
