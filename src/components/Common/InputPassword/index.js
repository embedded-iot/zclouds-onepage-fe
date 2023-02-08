import React from 'react';
import { Input } from 'antd';

import './style.less';

const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.{8,}).*$/g;

export const validatePassword = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || (value.match(regexPassword)) ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please include the following in your password that contains least 1 lowercase, 1 uppercase, 1 symbols, 1 number and 8 character or more!'));
  },
});

export default function InputPassword({ name, value, onChange, placeholder, ...restProps }) {
  const handlerOnchange = (e) => onChange(e.target.value, name);

  return (
    <div className='input-password'>
      <Input.Password {...restProps}
                      placeholder={placeholder}
                      value={value}
                      onChange={handlerOnchange}
      />
    </div>
  )
}
