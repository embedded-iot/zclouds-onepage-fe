import React from 'react';
import { Dropdown } from 'antd';

import './style.scss';

export default function DropdownMenu({ items = [], onMenuClick, children, className, ...restProps }) {
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
      overlayClassName={`dropdown-menu__wrapper ${className}`}
      { ...restProps }
    >
      { children }
    </Dropdown>
  )
}
