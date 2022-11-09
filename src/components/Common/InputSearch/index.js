import React from 'react';
import { Input } from 'antd';

import './style.scss';

export default function InputSearch({ name, value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className="input-search">
      <Input allowClear
              prefix={<span className="search-icon" />}
              placeholder={placeholder}
              value={value}
              onChange={handlerOnchange}
              {...restProps}
      />
    </div>
  )
}
