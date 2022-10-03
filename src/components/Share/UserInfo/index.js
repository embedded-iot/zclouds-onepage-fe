import React from 'react';
import { Button } from 'antd';
import { LoginOutlined, DollarOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';

import './style.scss';

export default function UserInfo({ isLogin = false, userInfo = {}, redirectTo = () => {}}) {
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
          <span>Xin chào: <b>{userInfo.name || 'USER'}</b> </span>
          <Button type="primary" icon={<LogoutOutlined />}></Button>
        </>
      )}
    </div>
  );
}
