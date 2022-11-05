import React from 'react';
import { Dropdown, Menu } from 'antd';

import './style.scss';

export default function DropdownMenu({ items = [], onMenuClick, children, ...restProps }) {
  const handleMenuClick = (e) => {
    onMenuClick(e.key);
  }
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={items}
    />
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
      { ...restProps }
    >
      { children }
    </Dropdown>
  )
}
