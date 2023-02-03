import React from 'react';
import { Menu } from 'antd';

import './style.less';
import { matchPath } from 'react-router-dom';

export function getItem(label, key, icon, children, type, permission) {
  return {
    key,
    icon,
    children,
    label,
    type,
    permission,
  };
}

export function getAllItemsFromGroups(itemsByGroups = [], hasIcon = false) {
  let items = [];
  itemsByGroups.forEach((item) => {
    if (item.children && item.children.length) {
      item.children.forEach((sub_item) => {
        if (sub_item.children && sub_item.children.length) {
          items = [...items, ...sub_item.children]
        } else if (!sub_item.children) {
          items.push(sub_item);
        }
      });
    } else if (!item.children) {
      items.push(item);
    }
  });
  return items.map(item => hasIcon ? item : {...item, icon:  undefined});
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
