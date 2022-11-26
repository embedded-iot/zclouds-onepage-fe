import React from 'react';
import { Input } from 'antd';

import './style.scss';

export default function InputText({ name, value, onChange, placeholder, theme,  ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className={`input-text ${theme}`}>
      <Input placeholder={placeholder}
             value={value}
             onChange={handlerOnchange}
             {...restProps}
      />
    </div>
  )
}
