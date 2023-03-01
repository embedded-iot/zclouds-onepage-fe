import React from 'react';

import './style.scss';

export default function BoxHeader({ title, description, align }) {
  return (
    <div className={`box-header-card__wrapper ${align}`}>
      <div className='box-header-card__title'>{title}</div>
      <div className='box-header-card__description'>{description}</div>
    </div>
  )
}
