import React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';

import './style.scss';

export default function InputNumber({ name, value, onChange, placeholder, theme, ...restProps }) {
  const handlerOnchange = (value) => onChange(value, name);

  return (
    <div className={`input-number ${theme}`}>
      <AntdInputNumber {...restProps}
             placeholder={placeholder}
             value={value}
             onChange={handlerOnchange}
      />
    </div>
  )
}
