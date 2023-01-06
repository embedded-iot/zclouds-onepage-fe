import React, { useState, useEffect } from 'react';
import { FrontUserCategoriesService } from 'services';
import "./style.scss";

export default function CategoriesFilters({ className, onChange = () => {}, formatCount, showTitle = true, categoryId = '' }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const getCategoriesFilter = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      setCategories(response);
    }, () => {}, true)
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  const onSelectFilter = (value) => {
    setSelectedCategory(value);
    onChange({
      categoryId: value
    });
  }

  return (
    <div className={`categories-filters__wrapper ${className}`}>
      { showTitle && <div className='categories-filters__title'>Categories</div> }
      <div className='categories-filters__list'>
        {
          categories.map((category, index) => (
            <div className={`categories-filters__item ${ selectedCategory.toString() === category.value.toString() && 'categories-filters__item--active'}`}
                 key={index}
                 onClick={() => onSelectFilter(category.value)}
            >
              <div className='categories-filters__item-label'>{category.label}</div>
              <div className='categories-filters__item-count'>{!!formatCount ? formatCount(category.count) : category.count}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
