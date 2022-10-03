import React from 'react';
import { Button } from 'antd';
import { LoginOutlined, DollarOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

import './style.scss';

export default function UserInfo({ isLogin = false, userInfo = {} }) {
  return (
    <div className="user-info-wrapper">
      { !isLogin && (
        <>
          <Button icon={<UserAddOutlined />}>Đăng ký</Button>
          <Button type="primary" icon={<LoginOutlined />}>Đăng nhập</Button>
          <Button type="primary" danger icon={<DollarOutlined />}>Bảng giá</Button>
        </>
      )}
      { isLogin && (
        <>
          <span>Xin chào: <b>{userInfo.name || 'USER'}</b> </span>
          <Button type="primary" icon={<LogoutOutlined />}></Button>
        </>
      )}
    </div>
  );
}
