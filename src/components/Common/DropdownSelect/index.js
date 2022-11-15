import React from 'react';
import { Select } from 'antd';

import './style.scss';

export default function DropdownSelect({ name, defaultValue, value, options, onChange, placeholder, ...restProps }) {
  const handlerOnChange = (inputValue) => {
    onChange(inputValue, name, options.find(option => option.value === inputValue));
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
      suffixIcon={<span className="arrow-down-left-icon" />}
    />
  )
}
