import React from 'react';
import { Input } from 'antd';
import './style.scss';

const { TextArea } = Input;

export default function InputText({ name, type, value, onChange, placeholder, theme,  ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);
  const InputComponent = type === 'TextArea' ? TextArea : Input;
  return (
    <div className={`input-text ${theme}`}>
      <InputComponent placeholder={placeholder}
                      value={value}
                      onChange={handlerOnchange}
                      {...restProps}
      />
    </div>
  )
}
