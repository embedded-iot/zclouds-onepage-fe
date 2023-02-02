import React from 'react';
import bannerImg21 from 'images/banner-img-2-1.svg';
import bannerImg22 from 'images/banner-img-2-2.png';
import { Button, Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

export default function BannerBox2({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-2__wrapper`}>
      <Row>
        <Col span={isMobile ? 24 : 12} className={`home-box__left-box ${isMobile && 'padding-box--mobile'}`}>
          <div className='banner-box-2__contents'>
            <div className='home-box__header-text'>
              HOW WE WORK
            </div>
            <div className='home-box__title'>
              <span className="link link--text">Easy to create an order</span> with CS- Fulfillment
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
              <div className='banner-box-2__item-description'>Simply connect your integrated selling store with us and sync your order to the website.
                Select an order and choose products from our catalog and make designs. Check your order again to make sure about the information you provided.</div>
              <div className='banner-box-2__checkbox-item'>
                <div className='banner-box-2__item-icon banner-box-2__item-icon--third'>3</div>
                <div className='banner-box-2__item-label'>Order confirmation</div>
              </div>
              <div className='banner-box-2__item-description'>Your supporters will check your order again before taking it into production in the next day.</div>
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
        <Col span={isMobile ? 24 : 12} className={`home-box__img-box ${isMobile && 'banner-box-2__img-box--mobile'}`}>
          <div className='banner-box-2__img'>
            <div>
              <img src={bannerImg22} alt="banner img" />
            </div>
            <div>
              <img src={bannerImg21} alt="banner img" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
