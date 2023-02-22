import React from 'react';
import categoryImg from 'images/product_ex.svg'
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function CategorySlideItem({ redirectTo = () => {}, customClass, category = {} }) {
  const handleClick = category => {
    const { categoryName, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${categoryId}`);
  }
  const { categoryName, avatar, id } = category;
  return (
    <div className={`category-card__wrapper ${customClass}`} key={id} onClick={() => handleClick(category)}>
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
