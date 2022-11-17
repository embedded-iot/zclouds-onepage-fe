import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function RelatedProductsBox({ categoryId, redirectTo, containerClass, itemClass, responsive, ...restProps }) {
  const [products, setProducts] = useState([]);
  const getProductsByCategoryId = () => {
    FrontUserCategoriesService.getCategories({ categoryId }, response => {
      setProducts(response.items);
    })
  }

  useEffect(() => {
    getProductsByCategoryId();
    // eslint-disable-next-line
  }, []);

  const handleClick = product => {
    const { categoryName, categoryId, productName, productId } = product;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${productName}/${categoryId}/${productId}`);
  }

  return (
    <MultiCarouselView
      {...restProps}
      containerClass={`related-product-carousel__wrapper ${containerClass}`}
      itemClass={`related-product-carousel__product-item ${itemClass}`}
      deviceType="desktop"
      responsive={responsive}
    >
      {
        products.map((product) => <CategoryItem {...product} imgProps={{ style: {minHeight: 250} }} onClick={handleClick} showDes2={false}/>)
      }
    </MultiCarouselView>
  );
}
