import React from 'react';

import './style.scss';

export default function BoxCard({ children, style, className }) {
  return (
    <div className={`${className} box-card__wrapper`} style={style}>
      {
        children
      }
    </div>
  )
}
