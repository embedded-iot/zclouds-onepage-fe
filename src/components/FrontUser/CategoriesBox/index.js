import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import { ROUTERS } from 'components/contants';
// eslint-disable-next-line
import CategoryCard from 'components/FrontUser/CategoryCard';

export default function CategoriesBox({ redirectTo }) {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      console.log(response);
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
  return !!categories.length ? (
    <MultiCarouselView
      deviceType="desktop"
    >
      {
        // categories.map((category) => <CategoryCard {...category} onClick={handleClick} />)
        categories.map((category, index) => (<div key={index}>2323</div>))
      }
    </MultiCarouselView>
  ) : null;
}
