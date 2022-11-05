import React, { useState, useEffect } from 'react';
import { FrontUserCategoriesService } from 'services';
import "./style.scss";

const items = [
  { label: 'All products', count: 293, value: '' },
  { label: 'Apparel', count: 12, value: 'Apparel' },
  { label: 'Gift & Accessories38', count: 21, value: 'Gift & Accessories38' },
  { label: 'Home & Decorations', count: 23, value: 'All Over Print' },
  { label: 'Canvas & Poster', count: 23, value: 'Canvas & Poster' },
  { label: 'Shoes', count: 2, value: 'Shoes' },
  { label: 'US 2D Printing', count: 23, value: 'US 2D Printing' },
]

export default function CategoriesFilters({ onChange = () => {} }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategoriesFilter = () => {
    FrontUserCategoriesService.getCategoriesFilter(response => {
      setCategories(response);
    }, error => {
      setCategories(items);
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
              <div className='categories-filters__label'>{category.label}</div>
              <div className='categories-filters__count'>{category.count}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
