import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { LoginOutlined, DollarOutlined, UserAddOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import './style.scss';


export default function UserInfo({ isLogin = false, currentUser = {}, redirectTo = () => {}, signOut = () => {}}) {
  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'logout':
        signOut();
        break;
      default:
        redirectTo('/account-info');
        break;
    }
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Thông tin tài khoản',
          key: 'account-info',
          icon: <UserOutlined />,
        },
        {
          label: 'Đăng xuất',
          key: 'logout',
          icon: <LogoutOutlined />,
        }
      ]}
    />
  );

  return (
    <div className="user-info-wrapper">
      { !isLogin && (
        <>
          <Button icon={<UserAddOutlined />} onClick={() => redirectTo('/register')}>Đăng ký</Button>
          <Button type="primary" icon={<LoginOutlined />} onClick={() => redirectTo('/login')}>Đăng nhập</Button>
          <Button type="primary" danger icon={<DollarOutlined />} onClick={() => redirectTo('/prices')}>Bảng giá</Button>
        </>
      )}
      { isLogin && (
        <>
          <span>Xin chào: <b>{currentUser.name || 'USER'}</b> </span>
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
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </>
      )}
    </div>
  );
}
