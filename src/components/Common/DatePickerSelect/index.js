import React from 'react';
import { DatePicker } from 'antd';
import './style.scss';
import Icon from 'components/Common/Icon';
import closeIcon from 'images/close-icon.svg';

const { RangePicker } = DatePicker;

export default function DatePickerSelect({ name, defaultValue, value, options, onChange, placeholder, isSingleSelection = false, theme, ...restProps }) {
  const handlerOnChange = (date, dateString) => {
    onChange(date, dateString, name);
  };
  const DatePickerWrapper = isSingleSelection ? DatePicker : RangePicker;
  return (
    <DatePickerWrapper
      className={`date-picker-select ${theme}`}
      onChange={handlerOnChange}
      clearIcon={<Icon src={closeIcon} width={18} height={18} />}
      value={value}
      {...restProps}
    />
  )
}
