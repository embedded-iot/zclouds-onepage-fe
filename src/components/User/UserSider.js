import React from 'react';
import { LikeOutlined, VideoCameraOutlined, ShareAltOutlined } from '@ant-design/icons';
import Sider, { getItem } from 'components/Share/Layout/Sider';

export default function UserSider(props) {
  const items = [
    getItem('DỊCH VỤ FACEBOOK', 'facebook', undefined, [
      getItem('Tăng Follow Facebook', 'fb1', <ShareAltOutlined />),
      getItem('Tăng like, tim Facebook', 'fb2', <LikeOutlined />),
      getItem('Tăng view Facebook', 'fb3', <VideoCameraOutlined />),
    ]),
    getItem('TIKTOK', 'tiktok', undefined, [
      getItem('Tăng Follow Tiktok', 'tt1', <ShareAltOutlined />),
      getItem('Tăng like, tim Tiktok', 'tt2', <LikeOutlined />),
      getItem('Tăng view Tiktok', 'tt3', <VideoCameraOutlined />),
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
