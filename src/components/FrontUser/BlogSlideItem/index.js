import React from 'react';

import './style.scss';

export default function BlogSlideItem({ onClick = () => {}, ...restProps }) {
  const { image, headerTitle, title, content } = restProps;
  return (
    <div className={`blog-slide-item__wrapper ${restProps.customClass}`} onClick={() => onClick(restProps)}>
      <div className='blog-slide-item__image'>
        <img src={image} alt={title} />
      </div>
      <div className='blog-slide-item__header-title'>{headerTitle}</div>
      <div className='blog-slide-item__title'>{title}</div>
      <div className='blog-slide-item__content'>{content}</div>
    </div>
  )
}
