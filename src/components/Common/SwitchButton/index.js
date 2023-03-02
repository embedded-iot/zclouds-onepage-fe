import React from 'react';
import { Switch } from 'antd';

import './style.scss';

export default function SwitchButton({ name = '', showLabel  = false, trueLabel = 'Enabled', falseLabel = 'Disabled', onChange = () => {}, ...restProps }) {
  const handleSelect = (value) => {
    onChange(value, name);
  }
  return (
    <div className='switch-button__wrapper'>
      <Switch {...restProps} onChange={handleSelect}/>
      {
        !!showLabel && <div className='switch-button__label'>{restProps.value ? trueLabel : falseLabel }</div>
      }
    </div>
  );
}
