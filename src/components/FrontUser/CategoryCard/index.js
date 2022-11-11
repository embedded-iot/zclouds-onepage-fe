import React from 'react';
import categoryImg from 'images/product_ex.svg'

import './style.scss';

export default function CategoryCard({ onClick = () => {}, ...restProps }) {
  const { name, avatar } = restProps;
  return (
    <div className='category-card__wrapper' onClick={() => onClick(restProps)}>
      <div className='category-card__contents'>
        <div className='category-card__title'>{name}</div>
        <div className='category-card__arrow-icon' />
      </div>
      <div className='category-card__img'>
        <img src={avatar || categoryImg} alt={name} />
      </div>
    </div>
  )
}
