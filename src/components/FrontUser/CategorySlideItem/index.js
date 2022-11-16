import React from 'react';
import categoryImg from 'images/product_ex.svg'

import './style.scss';

export default function CategorySlideItem({ onClick = () => {}, ...restProps }) {
  const { categoryName, avatar, id, customClass } = restProps;
  return (
    <div className={`category-card__wrapper ${customClass}`} key={id} onClick={() => onClick(restProps)}>
      <div className='category-card__contents'>
        <div className='category-card__title'>{categoryName}</div>
        <div className='category-card__arrow-icon' />
      </div>
      <div className='category-card__img'>
        <img src={avatar || categoryImg} alt={categoryName} />
      </div>
    </div>
  )
}
