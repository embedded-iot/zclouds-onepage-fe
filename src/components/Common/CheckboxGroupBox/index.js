import React from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default function CheckboxGroupBox({ name, options = [], value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (values) => onChange(values, name);
  return (
    <CheckboxGroup options={options}
                   value={value}
                   onChange={handlerOnchange}
    />
  )
}
