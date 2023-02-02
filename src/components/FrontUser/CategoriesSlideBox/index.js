import React, { useEffect, useState } from 'react';
import MultiCarouselView from 'components/Common/MultiCarouselView';
import { FrontUserCategoriesService } from 'services';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import CategorySlideItem from 'components/FrontUser/CategorySlideItem';
import './style.scss';
import { useMediaQuery } from 'react-responsive';

export default function CategoriesSlideBox({ redirectTo, successCallback }) {
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const getCategories = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      const [firstCategory, ...restCategories] = response;
      successCallback([firstCategory]);
      setCategories(restCategories);
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
      containerClass="category-slides__wrapper"
      itemClass={`category-card__item  ${isMobile && 'category-card__item--mobile'} `}
      responsive={{
        desktop: {
          items: 3,
        }
      }}
    >
      {
        categories.map((category) => <CategorySlideItem redirectTo={redirectTo} category={category} onClick={handleClick} />)
      }
    </MultiCarouselView>
  )
}
