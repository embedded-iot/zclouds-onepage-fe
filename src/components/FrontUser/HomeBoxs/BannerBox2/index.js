import React from 'react';
import bannerImg21 from 'images/banner-img-2-1.svg';
import bannerImg22 from 'images/banner-img-2-2.svg';
import { Button, Col, Row } from 'antd';

import './style.scss';

export default function BannerBox2({ customClass, redirectTo }) {
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-2__wrapper`}>
      <Row>
        <Col span={12} className="home-box__left-box">
          <div className='banner-box-2__contents'>
            <div className='home-box__header-text'>
              HOW WE WORK
            </div>
            <div className='home-box__title'>
              <span className="link link--text">Easy To Create An Order</span> With Fulfil
            </div>
            <div className='banner-box-2__checkbox-list'>
              <div className='banner-box-2__checkbox-item'>
                <div className='banner-box-2__item-icon banner-box-2__item-icon--first'>1</div>
                <div className='banner-box-2__item-label'>Registration</div>
              </div>
              <div className='banner-box-2__item-description'>Sign up for an account to activate the account.</div>
              <div className='banner-box-2__checkbox-item'>
                <div className='banner-box-2__item-icon banner-box-2__item-icon--second'>2</div>
                <div className='banner-box-2__item-label'>Place an order</div>
              </div>
              <div className='banner-box-2__item-description'>Using CSV, excel file to upload on our site or you can place a single order directly on our site.
                Check your order one more time to make sure about the information you provided.</div>
              <div className='banner-box-2__checkbox-item'>
                <div className='banner-box-2__item-icon banner-box-2__item-icon--third'>3</div>
                <div className='banner-box-2__item-label'>Order confirmation</div>
              </div>
              <div className='banner-box-2__item-description'>SOur supporters will check your order again before taking it into production in the next day.</div>
              <div className='banner-box-2__checkbox-item'>
                <div className='banner-box-2__item-icon banner-box-2__item-icon--fourth'>4</div>
                <div className='banner-box-2__item-label'>Production and shipment</div>
              </div>
              <div className='banner-box-2__item-description'>After payment confirmation, we will process your order in the next day.</div>
            </div>
            <div className='home-box__buttons'>
              <Button type="primary">Start Your Jouney From Now</Button>
            </div>
          </div>
        </Col>
        <Col span={12} className="home-box__img-box">
          <div className='banner-box-2-2__img'>
            <img src={bannerImg22} alt="banner img" />
            <img src={bannerImg21} alt="banner img" />
          </div>
        </Col>
      </Row>
    </div>
  )
}
