import React from 'react';
import { Tabs } from 'antd';

import './style.scss';

export default function TabsBox({ defaultActiveKey, items = [], name, onChange = () => {}, ...restProps }) {
  const handleChange = (key) => {
    onChange(key, name);
  };
  return (
    <div className="tabs-box">
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={handleChange}
        items={items}
        {...restProps}
      />
    </div>
  )
}
