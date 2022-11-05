import React from 'react';
import { Select } from 'antd';

import './style.scss';

export default function DropdownSelect({ name, defaultValue, value, options, onChange, placeholder, ...restProps }) {
  const handlerOnChange = (inputValue) => {
    onChange(inputValue, name);
  };

  return (
    <Select
      className={`dropdown-select`}
      {...restProps}
      defaultValue={defaultValue}
      value={value}
      onChange={handlerOnChange}
      options={options}
      placeholder={placeholder}
    />
  )
}
