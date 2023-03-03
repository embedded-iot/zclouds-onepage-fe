import React from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default function CheckboxGroupBox({ name, options = [], value, onChange, placeholder, formatLabel, ...restProps }) {
  const handlerOnchange = (values) => onChange(values, name);
  const transformedOptions = options.map(item => ({
    ...item,
    label: formatLabel ? formatLabel(item) : item.label,
  }))
  return (
    <CheckboxGroup {...restProps}
                   options={transformedOptions}
                   value={value}
                   onChange={handlerOnchange}

    />
  )
}
