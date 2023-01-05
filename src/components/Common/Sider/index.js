import React from 'react';
import { Menu } from 'antd';

import 'components/Common/Sider/style.scss';
import { matchPath } from 'react-router-dom';

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export function checkRouterMatch(path, currentRouter) {
  return (path === currentRouter) || matchPath(currentRouter, {
    path,
    exact: true,
    strict: false
  });
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
