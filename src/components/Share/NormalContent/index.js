import React from 'react';

import './style.scss';
export default function NormalContent({ children, fullScreen }) {
  return (
    <div className={`normal-contents__wrapper ${fullScreen && 'normal-contents__wrapper--full-screen'}`}>
      {
        children
      }
    </div>
  );
}
