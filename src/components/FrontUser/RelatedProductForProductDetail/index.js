import React from 'react';
import RelatedProductsBox from 'components/FrontUser/RelatedProductsBox';
import { ROUTERS } from 'components/contants';
import './style.scss';

export default function RelatedProductForProductDetail({ categoryId, categoryName, redirectTo }) {
  return (
    <div className="related-product-for-product-detail-wrapper">
      <div className='product-detail-box__title'>
        <span className='product-detail-box__title-icon' />
        <span>Maybe you like</span>
        <span className="link product-detail-box__link" onClick={() => redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${categoryId}`)}>See more</span>
      </div>
      <div className='product-detail-box__description'>
        <RelatedProductsBox
          categoryId={categoryId}
          redirectTo={redirectTo}
        />
      </div>
    </div>
  );
}
