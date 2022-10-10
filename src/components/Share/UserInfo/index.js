import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import {
  LoginOutlined,
  DollarOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  OrderedListOutlined, SwapOutlined,
} from '@ant-design/icons';
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function UserInfo({ isLogin = false, isAdmin = false, currentUser = {}, redirectTo = () => {}, signOut = () => {}}) {
  const handleMenuClick = (e) => {
    switch (e.key) {
      case ROUTERS.LOGOUT:
        signOut();
        break;
      default:
        redirectTo(e.key);
        break;
    }
  }

  const userMenuItems = isLogin && !isAdmin ? [
    {
      label: 'Lịch sử đơn hàng',
      key: ROUTERS.ACCOUNT_ASSETS_ORDERS_HISTORY,
      icon: <OrderedListOutlined />,
    },
    {
      label: 'Lịch sử đơn nạp',
      key: ROUTERS.ACCOUNT_ASSETS_INVOICES_HISTORY,
      icon: <SwapOutlined />,
    }
  ] : [];

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Thông tin tài khoản',
          key: ROUTERS.ACCOUNT_INFO,
          icon: <UserOutlined />,
        },
        ...userMenuItems,
        {
          label: 'Đăng xuất',
          key: ROUTERS.LOGOUT,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="user-info-wrapper">
      { !isLogin && (
        <>
          <Button icon={<UserAddOutlined />} onClick={() => redirectTo(ROUTERS.REGISTER)}>Đăng ký</Button>
          <Button type="primary" icon={<LoginOutlined />} onClick={() => redirectTo(ROUTERS.LOGIN)}>Đăng nhập</Button>
          <Button type="primary" danger icon={<DollarOutlined />} onClick={() => redirectTo(ROUTERS.PRICES)}>Bảng giá</Button>
        </>
      )}
      { isLogin && (
        <>
          <span>Xin chào: <b>{currentUser.name || 'USER'}</b></span>
          <span>Số dư: </span>
          <Button type="primary" size="small" danger>
            {currentUser.credit || '0'}đ
          </Button>
          <Button type="primary" size="small" icon={<DollarOutlined />} onClick={() => redirectTo(ROUTERS.ACCOUNT_ASSETS_INVOICES_METHODS)}>Nạp tiền</Button>
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Avatar
              style={{
                backgroundColor: '#87d068',
                cursor: 'pointer'
              }}
              src={currentUser.avatar}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </>
      )}
    </div>
  );
}
