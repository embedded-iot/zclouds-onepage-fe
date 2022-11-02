import React from 'react';
import { Menu } from 'antd';

import 'components/Common/Sider/style.scss';

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function Sider({ items = [], onClick = () => {}, defaultOpenKeys = [], defaultSelectedKeys = [], ...restProps}) {
  return (
    <Menu
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
      onClick={onClick}
      {...restProps}
    />
  );
}
