import React from 'react';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { ROLE_LABELS, ROUTERS } from 'components/contants';

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

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'My account',
          key: ROUTERS.ACCOUNT_INFO,
          icon: <UserOutlined />,
        },
        {
          label: 'Logout',
          key: ROUTERS.LOGOUT,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="user-info__wrapper">
      <Badge count={5}>
        <BellOutlined style={{ fontSize: 25 }} />
      </Badge>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow={{
          pointAtCenter: true,
        }}
      >
        <div className="user-info__avatar">
          <Avatar
            style={{
              backgroundColor: '#87d068',
              cursor: 'pointer'
            }}
            src={currentUser.avatar}
            icon={<UserOutlined />}
          />
          <div className="user-info__title">
            <span>{currentUser.username || 'User name'}</span>
            <span className="link">{ROLE_LABELS[currentUser.role] || (isAdmin ? 'Admin' : 'Seller')}</span>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
