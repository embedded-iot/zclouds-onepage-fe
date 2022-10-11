import React from 'react';
import { AutoComplete } from 'antd';

import './style.scss';

export default function AutoCompleteInput({ str, name, value, options, onChange, onSelect, placeholder, ...restProps }) {
  const filterOptions = (inputValue, option) => {
    return option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  }

  const handlerOnChange = (inputValue) => {
    onChange(inputValue, name);
  };
  const handlerOnSelect = (value, option) => {
    onChange(option.label, name);
    onSelect(option.value, name);
  };

  return (
    <AutoComplete
      className={`auto-complete-input`}
      {...restProps}
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={handlerOnChange}
      onSelect={handlerOnSelect}
      filterOption={filterOptions}
    />
  )
}
