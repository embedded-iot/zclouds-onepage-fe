import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import CategoriesSlideBox from 'components/FrontUser/CategoriesSlideBox';
import CategorySlideItem from 'components/FrontUser/CategorySlideItem';

import './style.scss';

export default function BannerBox3({ customClass, redirectTo }) {
  const [category, setCategory] = useState({});

  const getCategoriesCallback = (categories = []) => {
    if (categories.length === 0) return;
    setCategory(categories[0])
  }
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-3__wrapper`}>
      <Row>
        <Col span={24} className="banner-box-3__center-box">
          <div className='banner-box-3__contents'>
            <div className='home-box__header-text'>
              LATEST CONTENT
            </div>
            <div className='home-box__title'>
              <span className="link link--text">Blogs</span> And News
            </div>
            <div className='home-box__description'>
              Quickly connect with your store. You can even integrate Lenful with your management system using the API.
            </div>

          </div>
        </Col>
      </Row>
    </div>
  )
}
