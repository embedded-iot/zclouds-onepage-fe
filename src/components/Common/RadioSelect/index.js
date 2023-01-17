import React from 'react';
import { Radio } from 'antd';

import './style.scss';

export default function RadioSelect({ name, defaultValue, value, options, onChange, placeholder, ...restProps }) {
  const handlerOnChange = (inputValue) => {
    onChange(inputValue, name);
  };

  return (
    <Radio.Group
      className={`radio-select`}
      {...restProps}
      defaultValue={defaultValue}
      value={value}
      onChange={handlerOnChange}
      options={options}
    />
  )
}
