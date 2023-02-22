import React from 'react';
import { Col, Row } from 'antd';
import bannerImg from 'images/banner-img-4.png';
import bannerImgMobile from 'images/banner-img-4.svg';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';


import './style.scss';

export default function BannerBox5({ customClass, redirectTo }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className={`home-box__wrapper ${customClass} banner-box-5__wrapper`}>
      <Row>
        <Col span={24} className={`banner-box-5__center-box ${isMobile && 'padding-box--mobile'}`}>
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
              <img src={isMobile ? bannerImgMobile : bannerImg} alt='Vendor' />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
