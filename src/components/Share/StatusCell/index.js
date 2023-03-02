import React from 'react';
import { STATE_COLORS } from 'components/contants';

import './style.scss';

export default function StatusCell({ value, label, className, ...restProps }) {
  return (
    <span className={`status-cell__wrapper ${className}`}>
      <span className='status-cell__circle' style={{ background: STATE_COLORS[value]}} />
      <span className='status-cell__label'>{label}</span>
    </span>
  );
}
