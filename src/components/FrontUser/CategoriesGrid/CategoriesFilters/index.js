import React, { useState, useEffect } from 'react';
import { FrontUserCategoriesService } from 'services';
import "./style.scss";

export default function CategoriesFilters({ onChange = () => {} }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategoriesFilter = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      setCategories(response);
    })
  }

  useEffect(() => {
    getCategoriesFilter();
  }, []);

  const onSelectFilter = (value) => {
    setSelectedCategory(value);
    onChange({
      category: value
    });
  }

  return (
    <div className="categories-filters__wrapper">
      <div className='categories-filters__title'>Categories</div>
      <div className='categories-filters__list'>
        {
          categories.map((category, index) => (
            <div className={`categories-filters__item ${ selectedCategory === category.value && 'categories-filters__item--active'}`}
                 key={index}
                 onClick={() => onSelectFilter(category.value)}
            >
              <div className='categories-filters__item-label'>{category.label}</div>
              <div className='categories-filters__item-count'>{category.count}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
