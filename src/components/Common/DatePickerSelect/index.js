import React from 'react';
import { DatePicker } from 'antd';
import './style.scss';
import Icon from 'components/Common/Icon';
import closeIcon from 'images/close-icon.svg';

const { RangePicker } = DatePicker;

export default function DatePickerSelect({ name, defaultValue, value, options, onChange, placeholder, ...restProps }) {
  const handlerOnChange = (date, dateString) => {
    onChange(date, dateString, name);
  };

  return (
    <RangePicker
      className={`date-picker-select`}
      onChange={handlerOnChange}
      clearIcon={<Icon src={closeIcon} width={18} height={18} />}
      {...restProps}
    />
  )
}
