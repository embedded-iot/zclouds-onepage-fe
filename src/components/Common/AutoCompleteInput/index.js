import React from 'react';
import { AutoComplete } from 'antd';
import Icon from 'components/Common/Icon';
import closeIcon from "images/close-icon.svg";

import './style.scss';

export default function AutoCompleteInput({ name, value, options, onChange, onSelect, placeholder, autoFilterOptions = true, ...restProps }) {
  const filterOptions = (inputValue, option) => {
    return autoFilterOptions ? option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : true;
  }

  const handlerOnChange = (inputValue) => {
    onChange(inputValue, name);
  };
  const handlerOnSelect = (value, option) => {
    onChange(option.label, name);
    onSelect(option.value, name);
  };
  const handlerClear = () => {
    onChange('', name);
    onSelect('', name);
  };

  return (
    <AutoComplete
      className={`auto-complete-input`}
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={handlerOnChange}
      onSelect={handlerOnSelect}
      filterOption={filterOptions}
      popupClassName="auto-complete-input__menu"
      allowClear
      onClear={handlerClear}
      clearIcon={<Icon src={closeIcon} width={18} height={18} />}
      {...restProps}
    />
  )
}
