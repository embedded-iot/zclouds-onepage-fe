import React from 'react';
import { Menu } from 'antd';

import './style.scss';

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function Sider({ items = [], onClick = () => {}, defaultOpenKeys = [], defaultSelectedKeys = []}) {
  return (
    <Menu
      style={{
        width: 256,
      }}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      mode="inline"
      items={items}
      onClick={onClick}
    />
  );
}
