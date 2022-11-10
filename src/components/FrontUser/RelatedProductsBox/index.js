import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import CategoryItem from 'components/FrontUser/CategoriesGrid/CategoryItem';
import { ROUTERS } from 'components/contants';

export default function RelatedProductsBox({ categoryId, redirectTo }) {
  const [products, setProducts] = useState([]);
  const getProductsByCategoryId = () => {
    FrontUserCategoriesService.getCategories({ categoryId, pageNum: 1, pageSize: 10000 }, response => {
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
      deviceType="desktop"
    >
      {
        products.map((product) => <CategoryItem {...product} onClick={handleClick} showDes2={false}/>)
      }
    </MultiCarouselView>
  );
}
