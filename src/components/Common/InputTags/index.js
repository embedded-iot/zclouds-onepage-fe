import React from 'react';
import { TagsInput } from "react-tag-input-component";

import './style.less';

export default function InputTags({ name, value = [], onChange, placeholder, theme, ...restProps }) {
  const handlerOnchange = (value) => onChange(value, name);

  return (
    <div className={`input-tags ${theme}`}>
      <TagsInput
        {...restProps}
        value={value}
        onChange={handlerOnchange}
        name={name}
        placeHolder={placeholder}
      />
    </div>
  )
}
