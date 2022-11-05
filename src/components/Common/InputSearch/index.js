import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './style.scss';

export default function InputSearch({ name, value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className="input-search">
      <Input allowClear
              prefix={<SearchOutlined  className="site-form-item-icon" />}
              placeholder={placeholder}
              value={value}
              onChange={handlerOnchange}
              {...restProps}
      />
    </div>
  )
}
