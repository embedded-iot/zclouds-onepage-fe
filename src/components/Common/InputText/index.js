import React from 'react';
import { Input } from 'antd';

import './style.scss';

export default function InputText({ name, value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className='input-text'>
      <Input {...restProps}
             placeholder={placeholder}
             value={value}
             onChange={handlerOnchange}
      />
    </div>
  )
}
