import React from 'react';
import { Button } from 'antd';

import './style.scss';

export default function VariantsSelectList({ list, onChange }) {
  const handleSelect = index => {
    const newList = list.map((item, id) => id !== index ? item : ({ ...item, value: !item.value }))
    onChange(newList);
  }

  const selectAll = () => {
    const newList = list.map((item, id) => ({ ...item, value: true }))
    onChange(newList);
  }
  const clearAll = () => {
    const newList = list.map((item, id) => ({ ...item, value: false }))
    onChange(newList);
  }
  console.log(list);
  return (
    <div className='variant-select-list__wrapper'>
      <div className='variant-select-list__header'>
        <span className='variant-select-list__label' onClick={selectAll}>All</span>
        <span className='variant-select-list__label' onClick={clearAll}>None</span>
      </div>
      <div className='variant-select-list__list'>
        {
          list.map((item, index) => (
            <Button type={item.value ? 'primary' : 'default'} key={index} onClick={() => handleSelect(index)}>
              { item.label }
            </Button>
          ))
        }
      </div>
    </div>
  )
}
