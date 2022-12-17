import React from 'react';

import './style.scss';

export default function PlainText({ type, children }) {
  return (
    <div className={`plain-text__wrapper ${type}`}>
      { children }
    </div>
  )
}
