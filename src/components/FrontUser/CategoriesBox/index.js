import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import { ROUTERS } from 'components/contants';
import CategoryCard from 'components/FrontUser/CategoryCard';

export default function CategoriesBox({ redirectTo }) {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      setCategories(response);
    })
  }

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
// eslint-disable-next-line
  const handleClick = category => {
    const { categoryName, categoryId } = category;
    redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS + `/${categoryName}/${categoryId}`);
  }
  return (
    <MultiCarouselView
      deviceType="desktop"
      responsive={{
        desktop: {
          items: 3,
        }
      }}
    >
      {
        categories.map((category) => <CategoryCard {...category} />)
      }
    </MultiCarouselView>
  )
}
