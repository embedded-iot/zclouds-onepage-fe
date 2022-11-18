import React from 'react';

import './style.scss';

export default function BoxCard({ children, className }) {
  return (
    <div className={`box-card__wrapper ${className}`}>
      {
        children
      }
    </div>
  )
}
