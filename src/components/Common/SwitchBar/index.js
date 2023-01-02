import React, { useState } from 'react';

import './style.scss';

export default function SwitchBar({ items = [], value = '', name = '', onChange = () => {} }) {
  const [selectedValue, setSelectedValue] = useState(value);
  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange(value);
  }
  return (
    <div className='switch-bar__wrapper'>
      {
        items.map(item => {
          return (
            <div key={item.value} className={`switch-bar__item ${item.value === selectedValue && 'active'}`} onClick={() => handleSelect(item.value)}>{item.label}</div>
          )
        })
      }
    </div>
  );
}
