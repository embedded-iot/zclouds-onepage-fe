import React from 'react';
import { Col, Row } from 'antd';
import PostsGrid from 'components/FrontUser/PostsGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

export default function BannerBox4({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-4__wrapper`}>
      <Row>
        <Col span={24} className={`banner-box-4__center-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-4__contents'>
            <div className='home-box__header-text'>
              TESTIMONIAL
            </div>
            <div className='home-box__title'>
              <span className="link link--text banner-box-4__link">Trusted By Over</span> 10.000 Sellers
            </div>
            <div className='home-box__description'>
              Let's see what the sellers who are using our service have to say about CS-Fulfillment
            </div>
            <PostsGrid className="banner-box-4__blog-list" />
          </div>
        </Col>
      </Row>
    </div>
  )
}
