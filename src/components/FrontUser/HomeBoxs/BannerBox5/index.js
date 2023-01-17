import React from 'react';
import { Col, Row } from 'antd';
import bannerImg from 'images/banner-img-4.png'


import './style.scss';

export default function BannerBox5({ customClass, redirectTo }) {

  return (
    <div className={`home-box__wrapper ${customClass} banner-box-5__wrapper`}>
      <Row>
        <Col span={24} className="banner-box-5__center-box">
          <div className='banner-box-5__contents'>
            <div className='home-box__header-text'>
              INTEGRATION OPTIONS
            </div>
            <div className='home-box__title'>
              <span className="link link--text banner-box-5__link">We Built Best Solutions</span> For Your Company
            </div>
            <div className='home-box__description'>
              Quickly connect with your store. You can even integrate Fulfill with your management system using the API.
            </div>
            <div className='banner-box-5__img'>
              <img src={bannerImg} alt='Vendor' />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
