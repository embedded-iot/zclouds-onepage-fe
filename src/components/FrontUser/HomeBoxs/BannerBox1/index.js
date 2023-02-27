import React from 'react';
import bannerImg1 from 'images/banner-img-1.svg';
import { Button, Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

import './style.scss';

export default function BannerBox1({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-1__wrapper ${isMobile && 'banner-box-1__wrapper--mobile'}`}>
      <Row>
        <Col span={isMobile ? 24 : 12} className="home-box__img-box">
          <div className='banner-box-1__img'>
            <img src={bannerImg1} alt="banner img" />
          </div>
        </Col>
        <Col span={isMobile ? 24 : 12} className={`${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-1__contents'>
            <div className='home-box__title'>
              <span className="link link--text banner-box-1__link">Solution</span> Make your personalized products
            </div>
            <div className='home-box__description'>
              Imagine, you just focus on sales and marketing. CS- Fulfillment will handle the remaining stages: printing, shipping, and order synchronization... All you need to do create is creating orders. CS-Fulfillment can help decrease fulfillment headaches as you scale your business.
            </div>
            <div className='home-box__buttons banner-box-1__buttons'>
              <Button type="primary" onClick={() => redirectTo(ROUTERS.REGISTER)}>Sign up</Button>
              <Button>Passionate</Button>
              <Button>Simple</Button>
            </div>
            <div className='home-box__description banner-box-1__description-1'>
              With a variety of sources of products, Competitive and flexible and flexible product pricing
            </div>
            <div className={`home-box__checkbox-list banner-box-1__checkbox-list ${isMobile && 'banner-box-1__checkbox-list--mobile'}`}>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Committed to quality</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Stable delivery time</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Product quality</div>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>
  )
}
