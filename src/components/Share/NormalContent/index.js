import React from 'react';

import './style.scss';
export default function NormalContent(props) {
  return (
    <div className="normal-contents__wrapper">
      {
        props.children
      }
    </div>
  );
}
