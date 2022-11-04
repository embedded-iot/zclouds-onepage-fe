import React from 'react';

import './style.scss';

export default function PageHeader({ title, description }) {
  return (
    <div className="box-header__wrapper">
      <div className='box-header__title'>{title}</div>
      <div className='box-header__description'>{description}</div>
    </div>
  )
}
