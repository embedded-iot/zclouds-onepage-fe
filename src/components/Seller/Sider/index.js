import React from 'react';
import Sider, { getItem } from 'components/Common/Sider';
import { ROUTERS } from 'components/contants';

import "./style.scss";

export default function UserSider({ selectedRouters = [], redirectTo = () => {}, setGlobalStore = () => {} }) {
  const items = [
    getItem('Trang chủ', ROUTERS.ROOT),
  ];
  const defaultOpenKeys = items.map(item => item.key);

  const onClick = (e) => {
    redirectTo(e.key);
  };
  return (
    <Sider items={items}
           defaultOpenKeys={defaultOpenKeys}
           defaultSelectedKeys={selectedRouters}
           onClick={onClick}
           mode="inline"
    />
  );
}
