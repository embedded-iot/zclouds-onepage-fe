import React from 'react';
import categoryImg from 'images/product_ex.svg'

import './style.scss';

export default function BlogSlideItem({ onClick = () => {}, ...restProps }) {
  const { image, }
  return (
    <div className={`blog-slide-item__wrapper ${restProps.customClass}`} onClick={() => onClick(restProps)}>
      <div className='blog-slide-item__image'>
        <img src={img} alt='' />
      </div>
      <div className='blog-slide-item__title'>{categoryName}</div>
      <div className='category-card__contents'>
        <div className='category-card__arrow-icon' />
      </div>
      <div className='category-card__img'>
        <img src={avatar || categoryImg} alt={categoryName} />
      </div>
    </div>
  )
}
