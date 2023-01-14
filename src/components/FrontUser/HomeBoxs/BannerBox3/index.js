import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import CategoriesSlideBox from 'components/FrontUser/CategoriesSlideBox';
import CategorySlideItem from 'components/FrontUser/CategorySlideItem';
import RelatedProductsBox from 'components/FrontUser/RelatedProductsBox';

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
              WHAT WE SELL
            </div>
            <div className='home-box__title'>
              <span className="link link--text banner-box-3__link">300+ Custom Products</span> And More Are Frequently Added
            </div>
            <div className='home-box__description'>
              We are a printing and manufacturing system that helps you sell POD products and deliver directly to customers around the world.
            </div>
            <div className='home-box__checkbox-list banner-box-3__checkbox-list'>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Competitive Base Cost.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'> High standard product quality.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Automated tracking system. Minimize slow shipping of items.</div>
              </div>
            </div>
            <div className='home-box__buttons home-box__buttons--center'>
              <Button>View all our products</Button>
            </div>
            <Row gutter={[20, 0]} className="banner-box-3__first-category">
              <Col span={8}>
                <CategorySlideItem category={category} redirectTo={redirectTo}  customClass="banner-box-3__first-category-slide" />
              </Col>
              <Col span={16}>
                <RelatedProductsBox
                  containerClass="banner-box-3__related-products"
                  itemClass="banner-box-3__related-product-item"
                  redirectTo={redirectTo}
                  defaultParams={{
                    orderBy: "displayOrder",
                    orderDir: "asc",
                  }}
                  responsive={{
                    desktop: {
                      items: 3,
                    }
                  }}
                />
              </Col>
            </Row>
            <CategoriesSlideBox redirectTo={redirectTo} successCallback={getCategoriesCallback} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
