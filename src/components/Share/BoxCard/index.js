import React from 'react';

import './style.scss';

export default function BoxCard({ children, className }) {
  return (
    <div className={`${className} box-card__wrapper`}>
      {
        children
      }
    </div>
  )
}
