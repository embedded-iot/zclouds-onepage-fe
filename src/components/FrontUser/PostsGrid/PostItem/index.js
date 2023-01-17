import React from 'react';

import './style.scss';

export default function PostItem(props) {
  return (
    <div className='post-item__wrapper'>
      <div className='post-item__content'>{props.content}</div>
      <div className='post-item__user-info-wrapper'>
        <div className='post-item__avatar'>
          <img src={props.avatar} alt={props.name} />
        </div>
        <div className='post-item__user-info'>
          <div className='post-item__user-name'>{props.name}</div>
          <div className='post-item__user-work'>{props.work}</div>
        </div>
      </div>
    </div>
  )
}
