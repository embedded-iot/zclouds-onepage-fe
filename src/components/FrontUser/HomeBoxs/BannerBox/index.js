import React from 'react';
import bannerImg from 'images/banner-img.png';
import { Button, Col, Row } from 'antd';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import './style.scss';

export default function BannerBox({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`home-box__wrapper ${customClass} banner-box__wrapper ${isMobile && 'banner-box__wrapper--mobile'}`}>
      <Row>
        <Col span={isMobile ? 24 : 12} className={`home-box__left-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box__contents'>
            <div className='home-box__title'>
              <span className="link link--text">Selling Your Personalized</span> Products
            </div>
            <div className='home-box__description'>
              We are a Multi-platform Integration specializing in direct delivery to customers around the world. Everything you need to buy, we have it.
            </div>
            <div className='home-box__checkbox-list'>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>All types of items (Customize, Dropship)</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Production time and delivery time are extremely stable</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Update the trend of best-selling models every day</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Easy order management, transparency in production and shipping</div>
              </div>
            </div>
            <div className='home-box__buttons'>
              <Button type="primary" onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Register now</Button>
              <Button onClick={() => redirectTo(ROUTERS.FRONT_USER_ALL_PRODUCTS)}>Sample products</Button>
              <Button>Contact now</Button>
            </div>
          </div>
        </Col>
        <Col span={isMobile ? 24 : 12} className="home-box__img-box">
          <div className='banner-box__img'>
            <img src={bannerImg} alt="banner img" />
          </div>
        </Col>
      </Row>
    </div>
  )
}
