import React from 'react';
import bannerImg from 'images/banner-img.svg';
import { Button, Col, Row } from 'antd';
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function BannerBox({ customClass, redirectTo }) {
  return (
    <div className={`home-box__wrapper ${customClass} banner-box__wrapper`}>
      <Row>
        <Col span={12} className="home-box__left-box">
          <div className='banner-box__contents'>
            <div className='home-box__title'>
              <span className="link link--text">Sell Your Custom Print</span> On Demand Products
            </div>
            <div className='home-box__description'>
              We are a printing and manufacturing system that helps you sell POD products and deliver directly to customers around the world.
            </div>
            <div className='home-box__checkbox-list'>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>300+ custom products and more are constantly being added</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Stable production and delivery time
                </div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Easy to use</div>
              </div>
            </div>
            <div className='home-box__buttons'>
              <Button type="primary" onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Sign Up Now</Button>
              <Button>Learn More</Button>
            </div>
          </div>
        </Col>
        <Col span={12} className="home-box__img-box">
          <div className='banner-box__img'>
            <img src={bannerImg} alt="banner img" />
          </div>
        </Col>
      </Row>
    </div>
  )
}
