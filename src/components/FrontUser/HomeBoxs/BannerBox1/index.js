import React from 'react';
import bannerImg1 from 'images/banner-img-1.svg';
import { Button, Col, Row } from 'antd';
import {  ROUTERS } from 'components/contants';

import './style.scss';

export default function BannerBox1({ customClass, redirectTo }) {
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-1__wrapper`}>
      <Row>
        <Col span={12} className="home-box__img-box">
          <div className='banner-box-1__img'>
            <img src={bannerImg1} alt="banner img" />
          </div>
        </Col>
        <Col span={12}>
          <div className='banner-box-1__contents'>
            <div className='home-box__title'>
              <span className="link link--text banner-box-1__link">PRINT ON DEMAND </span> Fulfillment Solution
            </div>
            <div className='home-box__description'>
              Imagine, you just focus on sales and marketing. Fulfill will handle the remaining stages: printing, shipping, order synchronization... All you need to do is find great designs on your own 150+ products: shirts, mugs, hoodies, masks, flags and more.
            </div>
            <div className='home-box__buttons banner-box-1__buttons'>
              <Button type="primary" onClick={() => redirectTo(ROUTERS.FRONT_USER_REGISTER)}>Sign Up Now</Button>
              <Button>Passionate</Button>
              <Button>Simple</Button>
            </div>
            <div className='home-box__description banner-box-1__description-1'>
              We care about merchants, so they can create something big and unique people love to use.
            </div>
            <div className='home-box__checkbox-list banner-box-1__checkbox-list'>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Commitment to excellence</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Clients are our partners</div>
              </div>
              <div className='home-box__checkbox-item'>
                <div className='home-box__item-icon' />
                <div className='home-box__item-label'>Fun is an absolute must</div>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>
  )
}
