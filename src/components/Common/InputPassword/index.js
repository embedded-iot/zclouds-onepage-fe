import React from 'react';
import { Input } from 'antd';

import './style.scss';

export default function InputPassword({ name, value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className='input-password'>
      <Input.Password {...restProps}
                      placeholder={placeholder}
                      value={value}
                      onChange={handlerOnchange}
      />
    </div>
  )
}
