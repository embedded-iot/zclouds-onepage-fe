import React from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import TopSellingProductItem from '../TopSellingProductItem';

import './style.scss';

export default function TopSellingProductsBox({ products, containerClass, itemClass, responsive, ...restProps }) {
  return (
    <MultiCarouselView
      {...restProps}
      containerClass={`top-selling-products-carousel__wrapper ${containerClass}`}
      itemClass={`top-selling-products-carousel__product-item ${itemClass}`}
      deviceType="desktop"
      responsive={responsive}
    >
      {
        products.map((product) => <TopSellingProductItem {...product} />)
      }
    </MultiCarouselView>
  );
}
