import React from 'react';
import { Dropdown } from 'antd';

import './style.scss';

export default function DropdownMenu({ items = [], onMenuClick, children, ...restProps }) {
  const handleMenuClick = (e) => {
    onMenuClick(e.key);
  }
  const menu = ({
    items: items,
    onClick: handleMenuClick
  });

  return (
    <Dropdown
      menu={menu}
      placement="bottomRight"
      { ...restProps }
    >
      { children }
    </Dropdown>
  )
}
