import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import CategoriesSlideBox from 'components/FrontUser/CategoriesSlideBox';
import CategorySlideItem from 'components/FrontUser/CategorySlideItem';
import RelatedProductsBox from 'components/FrontUser/RelatedProductsBox';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

export default function BannerBox3({ customClass, redirectTo }) {
  const [category, setCategory] = useState({});
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);

  const getCategoriesCallback = (categories = []) => {
    if (categories.length === 0) return;
    setCategory(categories[0])
  }
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-3__wrapper`}>
      <Row>
        <Col span={24} className={`banner-box-3__center-box  ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-3__contents'>
            <div className='home-box__header-text'>
              WHAT WE SELL
            </div>
            <div className='home-box__title'>
              We have <span className="link link--text banner-box-3__link">all types of items</span> you need <br/>(Customize, Dropship, Etc..) and especially you can personalize your brand.
            </div>
            <div className='home-box__description'>
              We are a printing and manufacturing system that helps you sell POD products and deliver directly to customers around the world.
            </div>
            <div className={`home-box__checkbox-list banner-box-3__checkbox-list ${isMobile && 'banner-box-3__checkbox-list--mobile'}`}>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Competitive base cost.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Strict quality criteria.</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Seamless automated process saves you a ton of time.</div>
              </div>
            </div>
            <div className='home-box__buttons home-box__buttons--center'>
              <Button>View all our products</Button>
            </div>
            <Row gutter={isMobile ? [0, 16] : [20, 0]} className={`banner-box-3__first-category ${isMobile && 'banner-box-3__first-category--mobile' }`}>
              <Col span={isMobile ? 24 : 8}>
                <CategorySlideItem category={category} redirectTo={redirectTo} customClass={`banner-box-3__first-category-slide ${isMobile && 'banner-box-3__first-category-slide--mobile'}`} />
              </Col>
              {
                !isMobile && (
                  <Col span={16}>
                    <RelatedProductsBox
                      containerClass="banner-box-3__related-products"
                      itemClass={`banner-box-3__related-product-item ${isMobile && 'banner-box-3__related-product-item--mobile' }`}
                      redirectTo={redirectTo}
                      defaultParams={{
                        sortBy: "displayOrder",
                        sortDirection: "asc",
                      }}
                      responsive={{
                        desktop: {
                          items: 3,
                        },
                        tablet: {
                          items: 2,
                        }
                      }}
                    />
                  </Col>
                )
              }
            </Row>
            <CategoriesSlideBox redirectTo={redirectTo} successCallback={getCategoriesCallback} />
            {
              isMobile && (
                <Row>
                  <Col span={24}>
                    <RelatedProductsBox
                      containerClass="banner-box-3__related-products"
                      itemClass={`banner-box-3__related-product-item ${isMobile && 'banner-box-3__related-product-item--mobile' }`}
                      redirectTo={redirectTo}
                      defaultParams={{
                        sortBy: "displayOrder",
                        sortDirection: "asc",
                      }}
                      responsive={{
                        desktop: {
                          items: 3,
                        },
                        tablet: {
                          items: 2,
                        }
                      }}
                    />
                  </Col>
                </Row>
              )
            }

          </div>
        </Col>
      </Row>
    </div>
  )
}
