import React from 'react';
import { AutoComplete } from 'antd';

import './style.scss';

export default function AutoCompleteInput({ name, value, options, onChange, placeholder, ...restProps }) {
  const filterOptions = (inputValue, option) => {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  }
  const handlerOnchange = (value) => onChange(value, name);

  return (
    <AutoComplete
      className="auto-complete-input"
      {...restProps}
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={handlerOnchange}
      filterOption={filterOptions}
    />
  )
}
